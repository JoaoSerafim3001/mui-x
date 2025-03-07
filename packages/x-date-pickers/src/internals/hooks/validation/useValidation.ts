import * as React from 'react';
import { useLocalizationContext } from '../useUtils';
import { MuiPickersAdapterContextValue } from '../../../LocalizationProvider/LocalizationProvider';

export interface ValidationCommonProps<TError, TValue> {
  /**
   * Callback that fired when input value or new `value` prop validation returns **new** validation error (or value is valid after error).
   * In case of validation error detected `reason` prop return non-null value and `TextField` must be displayed in `error` state.
   * This can be used to render appropriate form error.
   *
   * [Read the guide](https://next.material-ui-pickers.dev/guides/forms) about form integration and error displaying.
   *
   * @template TError The validation error type. Will be either `string` or a `null`. Can be in `[start, end]` format in case of range value.
   * @template TValue The value type. Will be either the same type as `value` or `null`. Can be in `[start, end]` format in case of range value.
   * @param {TError} reason The reason why the current value is not valid.
   * @param {TValue} value The invalid value.
   */
  onError?: (reason: TError, value: TValue) => void;
  value: TValue;
}

export type ValidationProps<TError, TValue, TValidationProps extends {}> = ValidationCommonProps<
  TError,
  TValue
> &
  TValidationProps;

export type InferError<TProps> = TProps extends Pick<ValidationCommonProps<any, any>, 'onError'>
  ? Parameters<Exclude<TProps['onError'], undefined>>[0]
  : never;

export type Validator<TValue, TDate, TError, TValidationProps> = (params: {
  adapter: MuiPickersAdapterContextValue<TDate>;
  value: TValue;
  props: Omit<TValidationProps, 'value' | 'onError'>;
}) => TError;

export function useValidation<TValue, TDate, TError, TValidationProps extends {}>(
  props: ValidationProps<TError, TValue, TValidationProps>,
  validate: Validator<TValue, TDate, TError, TValidationProps>,
  isSameError: (a: TError, b: TError | null) => boolean,
  defaultErrorState: TError,
): TError {
  const { value, onError } = props;
  const adapter = useLocalizationContext<TDate>();
  const previousValidationErrorRef = React.useRef<TError | null>(defaultErrorState);

  const validationError = validate({ adapter, value, props });

  React.useEffect(() => {
    if (onError && !isSameError(validationError, previousValidationErrorRef.current)) {
      onError(validationError, value);
    }

    previousValidationErrorRef.current = validationError;
  }, [isSameError, onError, previousValidationErrorRef, validationError, value]);

  return validationError;
}
