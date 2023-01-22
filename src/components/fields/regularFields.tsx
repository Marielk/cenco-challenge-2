import React, { useEffect, useRef, useState } from 'react'
import { Field, FieldValue } from '../../utils/interfaces'
import FormField from '../formField'

interface Props {
  formFields: Field[],
  saveFieldData: (field: FieldValue) => void,
  submitedClicked: boolean,
  fieldsWithErrors: Field[]
}

const RegularFields = (props: Props) => {
  const {formFields, saveFieldData, submitedClicked, fieldsWithErrors} = props
  return (
    <React.Fragment>
      {formFields.map((field: Field) => {
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

export default RegularFields