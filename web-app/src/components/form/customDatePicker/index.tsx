import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

type CustomDatePickerProps = { 
  onChange?: (date: Dayjs | null) => void;
  value?: Dayjs | string | null;
  label?: string;
  name?: string;
  [key: string]: unknown;
};

export default function CustomDatePicker({onChange, value, label, name, ...props} : CustomDatePickerProps) {
    let localValue = null;
    if (typeof value === 'string') {
      localValue = dayjs(value);
    }else if (dayjs.isDayjs(value)) {
      localValue = dayjs(value);
    }
    return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          name={name}
          label={label}
          value={localValue}
          onChange={(newValue) => onChange && onChange(newValue)}
          slotProps={{ textField: { size: 'small', fullWidth: true, ...props } }}
          {...props}
        />
    </LocalizationProvider>
  );
}  