interface FormType {
  formType: number,
  formTitle: string,
  formUrl: string,
  formDescription: string
}

interface Form {
  form: Field[]
}

interface Field {
  id: number,
  type: string,
  name: string,
  label: string,
  value: string,
  validations: Validation[]
  options?: Option[],
}

interface Option {
  id: number,
  value: string,
  label: string
}

interface Validation {
  type: string,
  value?: number
}

interface FormValue {
  formID: number,
  formName: string,
  formFields: FieldValue[]
}

interface FieldValue {
  fieldID: number,
  fieldValue: string,
  fieldLabel: string
}

export type {
  Form,
  Field,
  Option,
  FormValue,
  FieldValue,
  FormType
}