import { FormValue, Field } from "../utils/interfaces"

export const validateForm = (formValue: FormValue, formFields: Field[]): boolean => {
  if (!formValue) return false
  if (formValue.formFields.length === 0) return false
  const requiredFields = getRequiredFields(formFields)
  const validFields = validFilledFields(formValue)
  if(requiredFields && validFields.length < requiredFields.length) {
    return false
  }
  return true
}

const validFilledFields = (formValue: FormValue) => {
  if (!formValue) return []
  const valids = formValue.formFields.filter((field) => {
    if(field.fieldValue !== '') {
      return field
    }
  })
  return valids
}

const getRequiredFields = (formFields: Field[]) => {
  const required = formFields.filter((field) => {
    if(field.validations.length > 0) {
      const isRequired = field.validations.filter(validation => validation.type === 'required')
      if(isRequired) { return field }
    }
  })
  return required
}

export const showFieldErrors = (formValue: FormValue | undefined, formFields: Field[], field: Field): boolean => {
  if (!formValue) return false
  const requiredFields = getRequiredFields(formFields)
  const validFields = validFilledFields(formValue)
  const isRequired = requiredFields.find((requiredField) => requiredField.id === field.id)
  const isValid = validFields.find((validField) => validField.fieldID === field.id)
  if(isRequired && !isValid) {
    return true
  } else if (!isRequired && isValid) {
    return true
  } else {
    return false
  }
}