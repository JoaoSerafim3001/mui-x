import { PickersLocaleText } from './utils/pickersLocaleTextApi';
import { getPickersLocalization } from './utils/getPickersLocalization';

const ptBRPickers: Partial<PickersLocaleText<any>> = {
  // Calendar navigation
  previousMonth: 'Mês anterior',
  nextMonth: 'Próximo mês',

  // View navigation
  openPreviousView: 'Abrir próxima seleção',
  openNextView: 'Abrir seleção anterior',
  calendarViewSwitchingButtonAriaLabel: (view) =>
    view === 'year'
      ? 'Seleção de ano está aberta, alternando para seleção de calendário'
      : 'Seleção de calendários está aberta, alternando para seleção de ano',

  // DateRange placeholders
  start: 'Início',
  end: 'Fim',

  // Action bar
  cancelButtonLabel: 'Cancelar',
  clearButtonLabel: 'Limpar',
  okButtonLabel: 'OK',
  todayButtonLabel: 'Hoje',

  // Toolbar titles
  datePickerToolbarTitle: 'Selecione a data',
  dateTimePickerToolbarTitle: 'Selecione data e hora',
  timePickerToolbarTitle: 'Selecione a hora',
  dateRangePickerToolbarTitle: 'Selecione o intervalo entre datas',

  // Clock labels
  clockLabelText: (view, time, adapter) =>
    `Selecione ${view}. ${
      time === null
        ? 'Hora não selecionada'
        : `Selecionado a hora ${adapter.format(time, 'fullTime')}`
    }`,
  hoursClockNumberText: (hours) => `${hours} horas`,
  minutesClockNumberText: (minutes) => `${minutes} minutos`,
  secondsClockNumberText: (seconds) => `${seconds} segundos`,

  // Calendar labels
  // calendarWeekNumberHeaderLabel: 'Week number',
  // calendarWeekNumberHeaderText: '#',
  // calendarWeekNumberAriaLabelText: weekNumber => `Week ${weekNumber}`,
  // calendarWeekNumberText: weekNumber => `${weekNumber}`,

  // Open picker labels
  openDatePickerDialogue: (value, utils) =>
    value !== null && utils.isValid(value)
      ? `Escolha uma data, data selecionada ${utils.format(value, 'fullDate')}`
      : 'Escolha uma data',
  openTimePickerDialogue: (value, utils) =>
    value !== null && utils.isValid(value)
      ? `Escolha uma hora, hora selecionada ${utils.format(value, 'fullTime')}`
      : 'Escolha uma hora',

  // Table labels
  timeTableLabel: 'escolha uma hora',
  dateTableLabel: 'escolha uma data',

  // Field section placeholders
  // fieldYearPlaceholder: params => 'Y'.repeat(params.digitAmount),
  // fieldMonthPlaceholder: params => params.contentType === 'letter' ? 'MMMM' : 'MM',
  // fieldDayPlaceholder: () => 'DD',
  // fieldWeekDayPlaceholder: params => params.contentType === 'letter' ? 'EEEE' : 'EE',
  // fieldHoursPlaceholder: () => 'hh',
  // fieldMinutesPlaceholder: () => 'mm',
  // fieldSecondsPlaceholder: () => 'ss',
  // fieldMeridiemPlaceholder: () => 'aa',
};

export const ptBR = getPickersLocalization(ptBRPickers);
