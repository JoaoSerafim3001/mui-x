import React, { useEffect, useMemo, useRef, useState } from 'react';
import { DataContainer, ColumnsContainer, Window, GridRoot } from './components/styled-wrappers';
import { ColumnsHeader, NoRowMessage, Viewport, AutoSizerWrapper, RenderContext, LoadingOverlay } from './components';
import { useColumns, useVirtualRows, useLogger, useSelection, useApi, useRows, useLoggerFactory } from './hooks';
import { Columns, DEFAULT_GRID_OPTIONS, ElementSize, GridOptions, RowsProp, GridApi } from './models';
import { debounce, mergeOptions } from './utils';
import { useSorting } from './hooks/root/useSorting';
import { useKeyboard } from './hooks/root/useKeyboard';
import { ApiContext } from './components/api-context';
import { DATA_CONTAINER_CSS_CLASS } from './constants/cssClassesConstants';
import { useColumnResize } from './hooks/features/useColumnResize';
import { OptionsContext } from './components/options-context';

export type GridApiRef = React.MutableRefObject<GridApi | null | undefined>;
export type GridOptionsProp = Partial<GridOptions>;

export interface GridProps {
  rows: RowsProp;
  columns: Columns;
  options?: GridOptionsProp;
  apiRef?: GridApiRef;
  loading?: boolean;
}

export const Grid: React.FC<GridProps> = React.memo(({ rows, columns, options, apiRef, loading }) => {
  useLoggerFactory(options?.logger, options?.logLevel);
  const logger = useLogger('Grid');
  const gridRootRef = useRef<HTMLDivElement>(null);
  const columnsHeaderRef = useRef<HTMLDivElement>(null);
  const columnsContainerRef = useRef<HTMLDivElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const renderingZoneRef = useRef<HTMLDivElement>(null);
  const internalApiRef = useRef<GridApi | null | undefined>();

  const [internalOptions, setOptions] = useState<GridOptions>(mergeOptions(DEFAULT_GRID_OPTIONS, options));

  if (!apiRef) {
    apiRef = internalApiRef;
  }
  const initialised = useApi(gridRootRef, windowRef, internalOptions, apiRef);
  const internalColumns = useColumns(internalOptions, columns, apiRef);
  const internalRows = useRows(internalOptions, rows, initialised, apiRef);
  useKeyboard(initialised, apiRef);
  useSelection(internalOptions, rows, initialised, apiRef);
  useSorting(internalOptions, rows, columns, apiRef);

  const [renderCtx, resizeGrid] = useVirtualRows(
    columnsHeaderRef,
    windowRef,
    renderingZoneRef,
    internalColumns,
    internalRows,
    internalOptions,
    apiRef,
  );

  const onResizeColumn = useColumnResize(columnsHeaderRef, apiRef, internalOptions.headerHeight);

  useEffect(() => {
    setOptions(mergeOptions(DEFAULT_GRID_OPTIONS, options));
  }, [options]);

  const onResize = debounce((size: ElementSize) => {
    logger.info('resized...', size);
    resizeGrid();
  }, 100) as any;

  useEffect(() => {
    logger.info('canceling resize...');
    return () => onResize.cancel();
  }, []);

  logger.info(
    `Rendering, page: ${renderCtx?.page}, col: ${renderCtx?.firstColIdx}-${renderCtx?.lastColIdx}, row: ${renderCtx?.firstRowIdx}-${renderCtx?.lastRowIdx}`,
  );

  const loadingComponent = useMemo(
    () => (internalOptions.loadingOverlayComponent ? internalOptions.loadingOverlayComponent : <LoadingOverlay />),
    [options],
  );
  const noRowsComponent = useMemo(
    () => (internalOptions.noRowsOverlayComponent ? internalOptions.noRowsOverlayComponent : <NoRowMessage />),
    [options],
  );

  return (
    <AutoSizerWrapper onResize={onResize}>
      {size => (
        <GridRoot
          ref={gridRootRef}
          options={internalOptions}
          style={{ width: size.width, height: size.height }}
          role={'grid'}
          aria-colcount={internalColumns.visible.length}
          aria-rowcount={internalRows.length + 1}
          tabIndex={0}
          aria-label={'Grid'}
          aria-multiselectable={internalOptions.enableMultipleSelection}
        >
          <ApiContext.Provider value={apiRef}>
            <OptionsContext.Provider value={internalOptions}>
              <ColumnsContainer ref={columnsContainerRef}>
                <ColumnsHeader
                  ref={columnsHeaderRef}
                  columns={internalColumns.visible || []}
                  hasScrollX={!!renderCtx?.hasScrollX}
                  headerHeight={internalOptions.headerHeight}
                  onResizeColumn={onResizeColumn}
                  renderCtx={renderCtx}
                />
              </ColumnsContainer>
              {!loading && internalRows.length === 0 && noRowsComponent}
              {loading && loadingComponent}
              <Window ref={windowRef}>
                <DataContainer
                  ref={gridRef}
                  className={DATA_CONTAINER_CSS_CLASS}
                  style={{
                    minHeight: renderCtx?.dataContainerSizes?.height,
                    minWidth: renderCtx?.dataContainerSizes?.width,
                  }}
                >
                  {renderCtx != null && (
                    <RenderContext.Provider value={renderCtx}>
                      <Viewport
                        ref={renderingZoneRef}
                        options={internalOptions}
                        rows={internalRows}
                        visibleColumns={internalColumns.visible}
                      />
                    </RenderContext.Provider>
                  )}
                </DataContainer>
              </Window>
            </OptionsContext.Provider>
          </ApiContext.Provider>
        </GridRoot>
      )}
    </AutoSizerWrapper>
  );
});

Grid.displayName = 'Grid';
