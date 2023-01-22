import React, { useEffect, useState } from 'react'
import { FormFieldProps } from '../utils/propsInterfaces'
import { formFieldsType } from '../utils/constants'
import Select from './fields/select'
import InputField from './fields/input'
import TextareaField from './fields/textarea'
import DatePickerField from './fields/datePicker'
import UploadFileField from './fields/uploadFile'
import { Forms } from '../utils/constantsTexts'

const FormField = ({fieldData, emitFieldValue, showError}: FormFieldProps) => {
  const [fieldType, setFieldType] = useState('')
  const props = {
    fieldData: fieldData,
    emitValue: (value: string) => emitFormFieldValue(value),
    showError: showError
  }

  useEffect(() => {
    fieldData && setFieldType(fieldData.type)
  }, [fieldData])

  const emitFormFieldValue = (value: string) => {
    let label = ''
    if(fieldType === formFieldsType[4]) {
      label = Forms.uploadedTitle
    } else {
      label = fieldData.label
    }
    const fieldInfo = {
      fieldID: fieldData.id,
      fieldLabel: label,
      fieldValue: value
    }
    emitFieldValue && emitFieldValue(fieldInfo)
  }

  { switch(fieldType) {
    case formFieldsType[0]: return (<Select {...props}/>)
    case formFieldsType[1]: return (<InputField  {...props}/>)
    case formFieldsType[2]: return (<TextareaField {...props}/>)
    case formFieldsType[3]: return (<DatePickerField  {...props}/>)
    case formFieldsType[4]: return (<UploadFileField {...props}/>)
    default: return (<p>default</p>)
  }}
}

export default FormField;