import React, { useEffect, useRef, useState } from 'react'
import { Grid, FormGroup } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArticleIcon from '@mui/icons-material/Article'
import { FormBodyProps } from '../utils/propsInterfaces';
import { Field, FormValue, FieldValue } from '../utils/interfaces';
import { DataService } from '../services/dataService'
import { backButton, Forms } from '../utils/constantsTexts';
import { showFieldErrors, validateForm } from '../services/validateForm';
import { formFieldsType } from '../utils/constants';
import RegularFields from './fields/regularFields';
import DatePickersRow from './fields/datePickerRow';
import { paths } from '../utils/constants';
import { useNavigate } from 'react-router-dom';

const FormBody = (props: FormBodyProps) => {
  const { form, backToSelect } = props
  const [formFields, setFormFields] = useState<Field[]>([])
  const [formValue, setFormValue] = useState<FormValue>()
  const [fieldsWithErrors, setFieldsErrors] = useState<Field[]>([])
  const [submitedClicked, setSubmitedClicked] = useState(false)
  const [hasMultipleDatePicker, setMultipleDatePicker] = useState(false)
  const formGroup = useRef<HTMLFormElement>(null)
  const title = form.formTitle
  const dataService = new DataService()
  const navigate = useNavigate()
  const propsToPass = {
    formFields,
    saveFieldData: (fieldValue: FieldValue) => saveFieldData(fieldValue),
    submitedClicked,
    fieldsWithErrors
  }

  useEffect(() => {
    form && getFormData()
  }, [form])

  const getFormData = async () => {
    const data = await dataService.getFormData(form.formUrl)
    data && setFormFields(data.form)
    const initialFormData = {
      formID: Math.floor(Math.random() * 100),
      formName: title,
      formFields: []
    }
    setFormValue(initialFormData)
    checkForDatePickers(data.form)
  }

  const saveFieldData = (fieldValue: FieldValue) => {
    if (!formValue) return
    if (formValue.formFields.length > 0) {
      checkForPreSavedField(fieldValue)
    } else {
      setFieldToState(fieldValue)
    }
    const errors = checkErrors()
    setFieldsErrors(errors)
  }

  const checkForPreSavedField = (fieldValue: FieldValue) => {
    if (!formValue) return
    const preSaved = formValue.formFields.find((field) => {
      return field.fieldID === fieldValue.fieldID
    })
    if (preSaved) {
      preSaved.fieldValue = fieldValue.fieldValue
    } else {
      setFieldToState(fieldValue)
    }
  }

  const setFieldToState = (fieldValue: FieldValue) => {
    if (!formValue) return
    formValue.formFields = formValue.formFields.concat(fieldValue)
  }

  const submitForm = () => {
    if (!formValue) return
    setSubmitedClicked(true)
    const isValid = validateForm(formValue, formFields)
    if (isValid) {
      saveForm()
      navigate(paths.index)
    } else {
      const errors = checkErrors()
      setFieldsErrors(errors)
    }
  }
  
  const saveForm = () => {
    const savedForms = localStorage.getItem('forms')
    if (savedForms === null) {
      dataService.updateLocalStorage('forms', JSON.stringify([formValue]))
    } else {
      let newValue = ''
      const parsed = JSON.parse(savedForms)
      if(parsed.length === 0) {
        newValue = JSON.stringify([parsed, formValue])
      } else {
        newValue = JSON.stringify(parsed.concat(formValue)) 
      }
      dataService.updateLocalStorage('forms', newValue)
    }

  }

  const checkErrors = () => {
    const fieldWithError = formFields.filter((field) => {
      const hasError = showFieldErrors(formValue, formFields, field)
      if (hasError) {
        return field
      }
    })
    return fieldWithError
  }

  const checkForDatePickers = (formFields: Field[]) => {
    const datePickers = formFields.filter((field) => field.type === formFieldsType[3])
    if (datePickers.length > 1) {
      setMultipleDatePicker(true)
    }
  }

  return (
    <React.Fragment>
      <Grid item className='page_title_wrapper'>
        <h1 className='main_title'>{Forms.createFormTitle}</h1>
        <h3 className='subtitle'>{Forms.createFormSubtitle}</h3>
      </Grid>
      <span className='divider'></span>
      <Grid item className='section_title_wrapper'>
        <FormGroup ref={formGroup}>
          <p className='section_title'>
            <ArticleIcon />
            {title}
          </p>
          <Grid item>
            {!hasMultipleDatePicker && <RegularFields {...propsToPass}/>}
            {hasMultipleDatePicker && <DatePickersRow {...propsToPass}/>}
          </Grid>
          <Grid className='form_action_wrapper'>
            <button className='back_button' onClick={() => backToSelect()}>
              <ArrowBackIcon />
              {backButton}
            </button>
            <button type='submit' className='main_button' onClick={() => submitForm()}>
              {Forms.submitButton}
            </button>
          </Grid>
        </FormGroup>
      </Grid>
    </React.Fragment>
  );
}

export default FormBody;