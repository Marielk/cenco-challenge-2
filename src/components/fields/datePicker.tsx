import React, { useEffect, useState, useRef } from 'react'
import { FormFieldProps } from '../../utils/propsInterfaces'
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/es-mx';
import { FormControl, Grid } from '@mui/material';

const locale = 'es-mx' as const;

const DatePickerField = ({ fieldData, emitValue, showError }: FormFieldProps) => {
  const startDate = dayjs().format('YYYY-MM-DD');
  const [datePickerValue, setValue] = useState(startDate)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!fieldData) return
    setRequired()
  }, [fieldData])

  const onInputChange = (value: Date | null) => {
    if (value === null) return
    const formatedDate = dayjs(value).format('YYYY-MM-DD')
    value !== null && setValue(formatedDate)
    emitValue && emitValue(dayjs(formatedDate).format('DD/MM/YYYY'))
  }

  const setRequired = () => {
    if (inputRef.current !== null && fieldData.validations.length > 0) {
      const isRequired = fieldData.validations[0].type === 'required'
      isRequired && inputRef.current.setAttribute('required', 'true')
    }
  }

  return (
    <Grid>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
        <DesktopDatePicker
          inputRef={inputRef}
          label={fieldData.label}
          inputFormat='DD/MM/YYYY'
          value={datePickerValue}
          onChange={(date: Date | null) => onInputChange(date)}
          renderInput={(params) => <TextField {...params} error={showError}/>}
          className='form_datepicker'
          onError={(reason) => console.log(reason)}
        />
      </LocalizationProvider>
    </Grid>
  )

}

export default DatePickerField;