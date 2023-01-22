import { Form, Field, FieldValue, FormType } from "./interfaces";

interface FormBodyProps {
  form: FormType,
  emitSubmit: () => void,
  backToSelect: () => void
}

interface FormFieldProps {
  fieldData: Field,
  emitValue?: (value: string) => void,
  emitFieldValue?: (fieldValue: FieldValue) => void,
  showError: boolean
}

interface FormSelectionProps {
  forms: FormType[],
  emitFormSelected: (form: FormType) => void,
  emitBackToDashboard: () => void
}

export type {
  FormBodyProps,
  FormFieldProps,
  FormSelectionProps
}