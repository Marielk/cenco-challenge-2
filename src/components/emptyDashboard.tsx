import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material'
import ContentPasteOffIcon from '@mui/icons-material/ContentPasteOff'
import { Dashboard as DashboardText } from '../utils/constantsTexts'
import { paths } from '../utils/constants';

const EmptyDashboard = () => {
  const navigate = useNavigate()

  const goToForms = () => {
    navigate(paths.forms)
  }
  
  return (
    <Grid className='empty_state_container'>
      <ContentPasteOffIcon />
      <p>{DashboardText.emptyState}</p>
      <button className='main_button' onClick={() => goToForms()}>
        {DashboardText.createButton}
      </button>
    </Grid>
  )
}

export default EmptyDashboard