import * as React from 'react';
import de from 'date-fns/locale/de';
import enGB from 'date-fns/locale/en-GB';
import zhCN from 'date-fns/locale/zh-CN';
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateField } from '@mui/x-date-pickers/DateField';
import { TimeField } from '@mui/x-date-pickers/TimeField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const locales = { 'en-us': undefined, 'en-gb': enGB, 'zh-cn': zhCN, de };

type LocaleKey = keyof typeof locales;

export default function LocalizationDateFns() {
  const [locale, setLocale] = React.useState<LocaleKey>('en-us');

  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      adapterLocale={locales[locale]}
    >
      <Stack spacing={3} sx={{ width: 300 }}>
        <ToggleButtonGroup
          value={locale}
          exclusive
          fullWidth
          onChange={(event, newLocale) => setLocale(newLocale)}
        >
          {Object.keys(locales).map((localeItem) => (
            <ToggleButton key={localeItem} value={localeItem}>
              {localeItem}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
        <DateField label="Date" defaultValue={new Date('2022-04-17')} />
        <TimeField label="Time" defaultValue={new Date('2022-04-17T18:30')} />
      </Stack>
    </LocalizationProvider>
  );
}
