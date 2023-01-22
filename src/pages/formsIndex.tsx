
import React, { useState } from 'react'
import { Grid } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { FormType } from '../utils/interfaces'
import { FormsTypes, paths } from '../utils/constants'
import FormBody from '../components/formBody'
import FormSelection from '../components/formSelection'
import '../style/formsStyles.css'

const Forms = () => {
  const [showSelectForm, setShowSelectForm] = useState(true)
  const [selectedForm, setSelectedForm] = useState<FormType>()
  const navigate = useNavigate()

  const selectForm = (form: FormType) => {
    setSelectedForm(form)
    setShowSelectForm(false)
  }

  return (
    <Grid container columnSpacing={12} mt={1} className='page_container'>
      {showSelectForm &&
        <FormSelection
          forms={FormsTypes}
          emitFormSelected={(form: FormType) => selectForm(form)}
          emitBackToDashboard={() => navigate(paths.index)}
        />
      }
      {!showSelectForm && selectedForm && 
        <FormBody
          form={selectedForm}
          emitSubmit={() => console.log('form A submited')}
          backToSelect={() => setShowSelectForm(true)}
        />
      }
    </Grid>
  );
}

export default Forms;