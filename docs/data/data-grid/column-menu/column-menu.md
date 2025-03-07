# Data Grid - Column menu

<p class="description">Customize your columns menu.</p>

## Column menu

Each column header comes with a column menu with quickly accessible Data Grid features like column visibility, sorting, filtering, and others.

It can be accessed by clicking on the 3-dots icon that appears on hover on a header cell or when focusing on a column header and pressing <kbd><kbd class="key">Ctrl</kbd>+<kbd class="key">Enter</kbd></kbd> (or <kbd><kbd class="key">⌘ Command</kbd>+<kbd class="key">Enter</kbd></kbd> on macOS).

{{"demo": "ColumnMenuGrid.js", "bg": "inline"}}

## Customize column menu items

You can customize the column menu items by passing the `components` and `componentsProps` props to the `<GridColumnMenu />` component:

- `components` - use this prop to override default column menu components or add new components.
- `componentsProps` - use this prop to override or pass [`displayOrder`](/x/react-data-grid/column-menu/#reordering-menu-items) for column menu items. You can also use this to pass extra props to custom column menu components.

:::warning
The `components` prop uses pascal case (`ColumnMenuFilterItem`), while `componentsProps` uses camel case (`columnMenuFilterItem`).
:::

### Adding a menu item

To add a new menu item, create a new item slot and pass it to the `components` prop. In the example below, the new slot is called `ColumnMenuUserItem` but you can choose any name and it'll be added to the menu automatically.
You can also set the `displayOrder` (default `100`) or pass new props to the components using `componentsProps` prop.

```tsx
function CustomColumnMenu(props: GridColumnMenuProps) {
  return (
    <GridColumnMenu
      {...props}
      components={{
        // Add new item
        ColumnMenuUserItem: CustomUserItem,
      }}
      componentsProps={{
        columnMenuUserItem: {
          // set `displayOrder` for the new item
          displayOrder: 15,
          // Additional props
          myCustomValue: 'Do custom action',
          myCustomHandler: () => alert('Custom handler fired'),
        },
      }}
    />
  );
}
```

{{"demo": "AddNewColumnMenuGrid.js", "bg": "inline"}}

### Overriding default menu items

Use the `components` prop to override default menu items.
Check [this table](/x/react-data-grid/column-menu/#default-column-menu-items) to know the overridable slot name for each menu item.

```tsx
function CustomColumnMenu(props: GridColumnMenuProps) {
  return (
    <GridColumnMenu
      {...props}
      components={{
        // Override `ColumnMenuFilterItem` component
        ColumnMenuFilterItem: CustomFilterItem,
      }}
    />
  );
}
```

{{"demo": "OverrideColumnMenuGrid.js", "bg": "inline"}}

### Hiding a menu item

To hide a menu item, you can set its respective slot in `components` to `null`.
Check [this table](/x/react-data-grid/column-menu/#default-column-menu-items) to know the slot name for each menu item.

```tsx
function CustomColumnMenu(props: GridColumnMenuProps) {
  return (
    <GridColumnMenu
      {...props}
      components={{
        // Hide `ColumnMenuColumnsItem`
        ColumnMenuColumnsItem: null,
      }}
    />
  );
}
```

{{"demo": "HideColumnMenuGrid.js", "bg": "inline"}}

### Reordering menu items

Every item is assigned a `displayOrder` based on which it is shown before or after other items. It works in ascending order; the smaller the number is, the earlier it is displayed on the list. For new items default value for `displayOrder` is **100**.

You can override `displayOrder` for the default or new items in `componentsProps`.

Check [this table](/x/react-data-grid/column-menu/#default-column-menu-items) to see default `displayOrder` for each menu item.

```tsx
function CustomColumnMenu(props: GridColumnMenuProps) {
  return (
    <GridColumnMenu
      {...props}
      componentsProps={{
        // Swap positions of filter and sort items
        columnMenuFilterItem: {
          displayOrder: 0, // Previously `10`
        },
        columnMenuSortItem: {
          displayOrder: 10, // Previously `0`
        },
      }}
    />
  );
}
```

{{"demo": "ReorderColumnMenuGrid.js", "bg": "inline"}}

### Default column menu items

As a reference, here are the column menu `components` along with the default item components and `displayOrder`.

{{"demo": "ColumnMenuGridReferences.js", "bg": "inline", "hideToolbar": true}}

## Custom menu component

You can also customize and replace the column menu by [passing a fully custom component](/x/react-data-grid/components/#overriding-components) to the `ColumnMenu` slot of the Data Grid. If you want to add some of the default menu items to your custom component, you can import and re-use them.

{{"demo": "CustomColumnMenuGrid.js", "bg": "inline"}}

:::info
<strong>Tip</strong>: The `ColumnMenu` component and its components slots receive the `colDef` prop corresponding to the current column; you can use this to conditionally render some items or change some logic.
:::

## Disable column menu

By default, each column header has the column menu enabled. To disable the column menu, set the prop `disableColumnMenu={true}`.

{{"demo": "DisabledColumnMenuGrid.js", "bg": "inline"}}

## Column menu with Pro/Premium features [<span class="plan-pro"></span>](/x/introduction/licensing/#pro-plan)[<span class="plan-premium"></span>](/x/introduction/licensing/#premium-plan)

In the following demo, in addition to Data Grid MIT features, you can see commercial features like [grouping](/x/react-data-grid/row-grouping/), and [aggregation](/x/react-data-grid/aggregation/) in action. Try tweaking the values from respective column menu items.

{{"demo": "ColumnMenuGridPremium.js", "bg": "inline"}}

## API

- [DataGrid](/x/api/data-grid/data-grid/)
- [DataGridPro](/x/api/data-grid/data-grid-pro/)
- [DataGridPremium](/x/api/data-grid/data-grid-premium/)
