import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MultiInputDateTimeRangeField } from '@mui/x-date-pickers-pro/MultiInputDateTimeRangeField';
import { SingleInputDateTimeRangeField } from '@mui/x-date-pickers-pro/SingleInputDateTimeRangeField';

export default function BasicDateTimeRangeField() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
        components={[
          'MultiInputDateTimeRangeField',
          'SingleInputDateTimeRangeField',
        ]}
      >
        <MultiInputDateTimeRangeField
          slotProps={{
            textField: ({ position }) => ({
              label: position === 'start' ? 'Check-in' : 'Check-out',
            }),
          }}
        />
        <SingleInputDateTimeRangeField label="Check-in - Check-out" />
      </DemoContainer>
    </LocalizationProvider>
  );
}
