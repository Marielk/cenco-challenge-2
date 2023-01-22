
import React, { useEffect, useState } from 'react'
import { Grid } from '@mui/material'
import { FormValue } from '../utils/interfaces'
import {Dashboard as DashboardText} from '../utils/constantsTexts'
import '../style/dashboardStyles.css'
import FormsList from '../components/formsList';
import EmptyDashboard from '../components/emptyDashboard'
import { useNavigate } from 'react-router-dom'
import { paths } from '../utils/constants'

const Dashboard = () => {
  const [savedForms, setSavedForms] = useState<FormValue[]>([])
  const navigate = useNavigate()

  const goToForms = () => {
    navigate(paths.forms)
  }

  useEffect(() => {
    const localForms = localStorage.getItem('forms')
    if (localForms !== null) {
      const parsed = JSON.parse(localForms)
      setSavedForms(parsed)
    }
  }, [])

  return (
    <Grid container columnSpacing={12} mt={1} className='page_container'>
      <Grid item className='page_title_wrapper'>
        <h1 className='main_title'>{DashboardText.title}</h1>
        <h3 className='subtitle'>{DashboardText.subtitle}</h3>
        {'length' in savedForms && savedForms.length !== 0 && 
          <button className='main_button create_button_data' onClick={() => goToForms()}>
            {DashboardText.createButton}
          </button>
        }
      </Grid>
      <span className='divider'></span>
      <Grid item>
        {savedForms.length === 0 ? (<EmptyDashboard />) : (<FormsList forms={savedForms}/>)}
      </Grid>
    </Grid>
  );
}

export default Dashboard;