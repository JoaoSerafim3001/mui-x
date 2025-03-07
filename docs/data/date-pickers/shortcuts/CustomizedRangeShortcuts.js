import * as React from 'react';
import PropTypes from 'prop-types';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Chip from '@mui/material/Chip';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StaticDateRangePicker } from '@mui/x-date-pickers-pro/StaticDateRangePicker';

import { Divider, Box } from '@mui/material';

const shortcutsItems = [
  {
    label: 'This Week',
    getValue: () => {
      const today = dayjs();
      return [today.startOf('week'), today.endOf('week')];
    },
  },
  {
    label: 'Last Week',
    getValue: () => {
      const today = dayjs();
      const prevWeek = today.subtract(7, 'day');
      return [prevWeek.startOf('week'), prevWeek.endOf('week')];
    },
  },
  {
    label: 'Last 7 Days',
    getValue: () => {
      const today = dayjs();
      return [today.subtract(7, 'day'), today];
    },
  },
  {
    label: 'Current Month',
    getValue: () => {
      const today = dayjs();
      return [today.startOf('month'), today.endOf('month')];
    },
  },
  {
    label: 'Next Month',
    getValue: () => {
      const today = dayjs();
      const startOfNextMonth = today.endOf('month').add(1, 'day');
      return [startOfNextMonth, startOfNextMonth.endOf('month')];
    },
  },
  { label: 'Reset', getValue: () => [null, null] },
];

function CustomRangeShortcuts(props) {
  const { items, onChange, isValid } = props;

  if (items == null || items.length === 0) {
    return null;
  }

  const resolvedItems = items.map((item) => {
    const newValue = item.getValue({ isValid });

    return {
      label: item.label,
      onClick: () => {
        onChange(newValue);
      },
      disabled: !isValid(newValue),
    };
  });

  return (
    <Box
      sx={{
        gridRow: 1,
        gridColumn: 2,
      }}
    >
      <List
        dense
        sx={(theme) => ({
          display: 'flex',
          px: theme.spacing(4),
          '& .MuiListItem-root': {
            pt: 0,
            pl: 0,
            pr: theme.spacing(1),
          },
        })}
      >
        {resolvedItems.map((item) => {
          return (
            <ListItem key={item.label}>
              <Chip {...item} />
            </ListItem>
          );
        })}
      </List>
      <Divider />
    </Box>
  );
}

CustomRangeShortcuts.propTypes = {
  isValid: PropTypes.func.isRequired,
  /**
   * Ordered array of shortcuts to display.
   * If empty, does not display the shortcuts.
   * @default `[]`
   */
  items: PropTypes.arrayOf(
    PropTypes.shape({
      getValue: PropTypes.func.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ),
  onChange: PropTypes.func.isRequired,
};

export default function CustomizedRangeShortcuts() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StaticDateRangePicker
        slots={{
          shortcuts: CustomRangeShortcuts,
        }}
        slotProps={{
          shortcuts: {
            items: shortcutsItems,
          },
          toolbar: {
            hidden: true,
          },
          actionBar: {
            hidden: true,
          },
        }}
        calendars={2}
      />
    </LocalizationProvider>
  );
}
