
import React from 'react'
import { Grid } from '@mui/material'
import { backButton, Forms } from '../utils/constantsTexts'
import ArticleIcon from '@mui/icons-material/Article'
import { FormSelectionProps } from '../utils/propsInterfaces'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { FormType } from '../utils/interfaces'

const FormSelection = (props: FormSelectionProps) => {
  const { forms, emitFormSelected, emitBackToDashboard } = props

  const onFormClicked = (form: FormType) => {
    emitFormSelected(form)
  }

  return (
    <Grid width={'100%'}>
      <Grid item className='page_title_wrapper'>
        <h1 className='main_title'>{Forms.title}</h1>
        <h3 className='subtitle'>{Forms.subtitle}</h3>
      </Grid>
      <span className='divider'></span>
      <Grid item className='section_title_wrapper'>
        <p className='section_title'>
          <ArticleIcon />
          {Forms.sectionTitle}
        </p>
        <Grid className='form_selection_cards_wrapper'>
          {forms.map((form) => {
            return (
              <Card
                key={form.formType}
                sx={{ maxWidth: 345 }}
                className='form_selection_card'
                onClick={() => onFormClicked(form)}
              >
                <CardContent>
                  <p className='card_title'>
                    {form.formTitle}
                  </p>
                  <Typography variant="body2">
                    {form.formDescription}
                  </Typography>
                </CardContent>
              </Card>
            )
          })}
        </Grid>
        <Grid>
          <button className='back_button' onClick={() => emitBackToDashboard()}>
            <ArrowBackIcon />
            {backButton}
          </button>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default FormSelection;