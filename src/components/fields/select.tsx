import React, { useEffect, useState, useRef } from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { FormFieldProps } from '../../utils/propsInterfaces'
import { Option } from '../../utils/interfaces'


const SelectField = ({ fieldData, emitValue, showError }: FormFieldProps) => {
  const [selectValue, setValue] = useState('')
  const selectFormControl = useRef<HTMLDivElement & typeof FormControl>(null)

  useEffect(() => {
    if (!fieldData) return
    if (selectFormControl.current !== null && fieldData.validations.length > 0) {
      const isRequired = fieldData.validations[0].type === 'required'
      isRequired && selectFormControl.current.setAttribute('required', 'true')
    }
  }, [fieldData])

  const onSelect = (event: SelectChangeEvent) => {
    emitValue && emitValue(event.target.value as string)
    setValue(event.target.value as string)
  }

  return (
    <FormControl fullWidth ref={selectFormControl} error={showError}>
      <InputLabel id="demo-simple-select-label">{fieldData.label}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selectValue}
        label={fieldData.label}
        onChange={(event: SelectChangeEvent) => onSelect(event)}
        className='form_select'
      >
        {fieldData.options && fieldData.options.map((option: Option) => {
          return (<MenuItem key={option.id} value={option.value}>{option.label}</MenuItem>)
        })
        }
      </Select>
    </FormControl>
  )

}

export default SelectField;