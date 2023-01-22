import React, { useEffect, useState, useRef } from 'react'
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { FormFieldProps } from '../../utils/propsInterfaces'

const InputField = ({ fieldData, emitValue, showError }: FormFieldProps) => {
  const [inputValue, setValue] = useState('')
  const inputRef = useRef<HTMLInputElement & typeof FormControl>(null)

  useEffect(() => {
    if (!fieldData) return
    if (inputRef.current !== null && fieldData.validations.length > 0) {
      const isRequired = fieldData.validations[0].type === 'required'
      isRequired && inputRef.current.setAttribute('required', 'true')
    }
  }, [fieldData])

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
    emitValue && emitValue(event.target.value)
  }

  return (
    <TextField
      ref={inputRef}
      id="outlined-required"
      label={fieldData.label}
      defaultValue={fieldData.value}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => onInputChange(event)}
      className='form_select'
      error={showError}
    />
  )

}

export default InputField;