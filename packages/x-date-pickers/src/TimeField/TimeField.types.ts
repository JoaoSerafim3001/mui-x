import * as React from 'react';
import { SlotComponentProps } from '@mui/base/utils';
import TextField from '@mui/material/TextField';
import { UseFieldInternalProps } from '../internals/hooks/useField';
import { TimeValidationError } from '../internals/hooks/validation/useTimeValidation';
import { DefaultizedProps, MakeOptional } from '../internals/models/helpers';
import { BaseTimeValidationProps, TimeValidationProps } from '../internals/hooks/validation/models';
import { FieldsTextFieldProps, UncapitalizeObjectKeys } from '../internals';

export interface UseTimeFieldParams<TDate, TChildProps extends {}> {
  props: UseTimeFieldComponentProps<TDate, TChildProps>;
  inputRef?: React.Ref<HTMLInputElement>;
}

export interface UseTimeFieldProps<TDate>
  extends MakeOptional<UseFieldInternalProps<TDate | null, TimeValidationError>, 'format'>,
    TimeValidationProps<TDate>,
    BaseTimeValidationProps {
  /**
   * 12h/24h view for hour selection clock.
   * @default `utils.is12HourCycleInCurrentLocale()`
   */
  ampm?: boolean;
}

export type UseTimeFieldDefaultizedProps<TDate> = DefaultizedProps<
  UseTimeFieldProps<TDate>,
  keyof BaseTimeValidationProps | 'format'
>;

export type UseTimeFieldComponentProps<TDate, TChildProps extends {}> = Omit<
  TChildProps,
  keyof UseTimeFieldProps<TDate>
> &
  UseTimeFieldProps<TDate>;

export interface TimeFieldProps<TDate>
  extends UseTimeFieldComponentProps<TDate, FieldsTextFieldProps> {
  /**
   * Overridable components.
   * @default {}
   * @deprecated Please use `slots`.
   */
  components?: TimeFieldSlotsComponent;
  /**
   * The props used for each component slot.
   * @default {}
   * @deprecated Please use `slotProps`.
   */
  componentsProps?: TimeFieldSlotsComponentsProps<TDate>;
  /**
   * Overridable component slots.
   * @default {}
   */
  slots?: UncapitalizeObjectKeys<TimeFieldSlotsComponent>;
  /**
   * The props used for each component slot.
   * @default {}
   */
  slotProps?: TimeFieldSlotsComponentsProps<TDate>;
}

export type TimeFieldOwnerState<TDate> = TimeFieldProps<TDate>;

export interface TimeFieldSlotsComponent {
  /**
   * Form control with an input to render the value.
   * Receives the same props as `@mui/material/TextField`.
   * @default TextField from '@mui/material'
   */
  TextField?: React.ElementType;
}

export interface TimeFieldSlotsComponentsProps<TDate> {
  textField?: SlotComponentProps<typeof TextField, {}, TimeFieldOwnerState<TDate>>;
}
