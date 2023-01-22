import React, { useEffect, useState, useRef } from 'react'
import TextField from '@mui/material/TextField';
import { FormFieldProps } from '../../utils/propsInterfaces'

const TextareaField = ({ fieldData, emitValue, showError }: FormFieldProps) => {
  const [inputValue, setValue] = useState('')
  const [characteres, setCharacteres] = useState(0)
  const [maxCharacteres, setMaxCharacteres] = useState(0)
  const commentBox = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!fieldData) return
    setRequired()
    setMaxLength()
  }, [fieldData])

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
    maxCharacteres !== 0 && updateCounter()
    emitValue && emitValue(event.target.value)
  }

  const setRequired = () => {
    if (commentBox.current !== null && fieldData.validations.length > 0) {
      const isRequired = fieldData.validations[0].type === 'required'
      isRequired && commentBox.current.setAttribute('required', 'true')
    }
  }

  const setMaxLength = () => {
    if (fieldData.validations.length > 1 && fieldData.validations[1].type === 'maxLength') {
      const maxLength = fieldData.validations[1].value
      maxLength && setMaxCharacteres(maxLength)
    }
  }

  const updateCounter = () => {
    if(commentBox.current === null) return
    const value = commentBox.current.value
    const comment = value ? value : ''
    if (value && comment.length >= maxCharacteres) {
      const cutComment = comment.slice(0, maxCharacteres)
      commentBox.current.value = cutComment
      setCharacteres(cutComment.length)
    } else {
      setCharacteres(comment.length)
    }
  }

  return (
    <React.Fragment>
      <TextField
        fullWidth={true}
        inputRef={commentBox}
        multiline={true}
        label={fieldData.label}
        defaultValue={fieldData.value}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => onInputChange(event)}
        className={showError ? 'form_textarea error' : 'form_textarea'}
        error={showError}
      />
      {maxCharacteres !== 0 && 
        <span className='form_textarea_counter'>
          {characteres}/{maxCharacteres}
        </span>
      }
    </React.Fragment>
  )

}

export default TextareaField;