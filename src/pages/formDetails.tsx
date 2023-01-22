
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Grid, Card, CardContent } from '@mui/material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import ArticleIcon from '@mui/icons-material/Article'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import DownloadIcon from '@mui/icons-material/Download'
import { FormValue } from '../utils/interfaces'
import { backButton, FormDetails, Forms } from '../utils/constantsTexts'
import { paths } from '../utils/constants'
import '../style/formDetailStyle.css'
import { FileService } from '../services/fileService'
import AlertDialog from '../components/deleteWarning'

interface props {
  fileData: string
}

const FormDetail = () => {
  const { id } = useParams()
  const [form, setForm] = useState<FormValue>()
  const [showWarningModal, setStateOpenModal] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const formSaved = getForm()
    formSaved && setForm(formSaved)
  }, [])

  const goBackToDashboard = () => {
    navigate(paths.index)
  }

  const getForm = (): FormValue | undefined => {
    const localForms = localStorage.getItem('forms')
    if (localForms === null) return
    const parsed = JSON.parse(localForms)
    if (parsed.length > 1) {
      const foundForm = parsed.find((form: FormValue) => form.formID === Number(id))
      return foundForm
    } else {
      return parsed[0]
    }
  }

  const deleteForm = () => {
    const localForms = localStorage.getItem('forms')
    if(localForms !== null) {
      const parsed = JSON.parse(localForms)
      const currentForm = parsed.find((form: FormValue) => form.formID === Number(id))
      const index = parsed.indexOf(currentForm)
      if (parsed.length >= 2) {
        parsed.splice(index, 1)
        localStorage.setItem('forms', JSON.stringify(parsed))
      } else {
        localStorage.removeItem('forms')
      }
      setStateOpenModal(false)
      goBackToDashboard()
    }
  }

  const FileUploaded = ({ fileData }: props) => {
    const fileService = new FileService()
    const parsed = JSON.parse(fileData)

    const downloadFile = () => {
      fileService.downloadFileBase64(parsed.fileEncoded)
    }

    return (
      <span className='file_p'>
        <p className='file_name'>{parsed.fileName}</p>
        <button className='secondary_button' onClick={() => downloadFile()}>
          <DownloadIcon />
          {Forms.downloadFile}
        </button>
      </span>
    )
  }

  return (
    <Grid container columnSpacing={12} mt={1} className='page_container'>
      {form &&
        <React.Fragment>
          <Grid item className='page_title_wrapper'>
            <h1 className='main_title'>{form.formName}</h1>
          </Grid>
          <span className='divider'></span>
          <Grid className='action_buttons'>
            <button className='secondary_button delete_button' onClick={() => setStateOpenModal(true)}>
              <DeleteForeverIcon />
              {FormDetails.deleteButton}
            </button>
          </Grid>
          <Grid className='form_detail_wrapper'>
            <Card className='form_detail_card'>
              <CardContent>
                <p className='section_title'>
                  <ArticleIcon />
                  {FormDetails.sectionTitle}
                </p>
                <Grid item>
                  {form.formFields.map((field) => {
                    return (
                      <div key={field.fieldID}>
                        <label>{field.fieldLabel}</label>
                        {field.fieldLabel === Forms.uploadedTitle ? (
                          <FileUploaded fileData={field.fieldValue} />
                        ) : (
                          <p className='file_name'>{field.fieldValue}</p>
                        )}
                      </div>
                    )
                  })}
                </Grid>
              </CardContent>
            </Card>
            <Grid className='back_button_grid'>
              <button className='back_button' onClick={() => goBackToDashboard()}>
                <ArrowBackIcon />
                {backButton}
              </button>
            </Grid>
          </Grid>
          <AlertDialog
            open={showWarningModal}
            emitCancel={() => setStateOpenModal(false)}
            emitConfirm={() => deleteForm()}
          />
        </React.Fragment>
      }
    </Grid>
  );
}

export default FormDetail;