import { Grid } from '@mui/material'
import React from 'react'
import { formFieldsType } from '../../utils/constants'
import { Field, FieldValue } from '../../utils/interfaces'
import FormField from '../formField'

interface Props {
  formFields: Field[],
  saveFieldData: (field: FieldValue) => void,
  submitedClicked: boolean,
  fieldsWithErrors: Field[]
}

const DatePickersRow = (props: Props) => {
  const {formFields, saveFieldData, submitedClicked, fieldsWithErrors} = props
  const regularFields = formFields.filter((field) => field.type !== formFieldsType[3])
  const datePickers = formFields.filter((field) => field.type === formFieldsType[3])

  return (
    <React.Fragment>
      <Grid className='datepicker_row'>
        {datePickers.map((field: Field) => {
          return (
            <React.Fragment key={field.id}>
              <FormField
                fieldData={field}
                emitFieldValue={(fieldValue) => { saveFieldData(fieldValue) }}
                showError={submitedClicked && fieldsWithErrors.includes(field)}
              />
            </React.Fragment>)
        })}
      </Grid>
      {regularFields.map((field: Field) => {
        return (
          <React.Fragment key={field.id}>
            <FormField
              fieldData={field}
              emitFieldValue={(fieldValue) => { saveFieldData(fieldValue) }}
              showError={submitedClicked && fieldsWithErrors.includes(field)}
            />
          </React.Fragment>)
      })}
    </React.Fragment>
  )
}

export default DatePickersRow;