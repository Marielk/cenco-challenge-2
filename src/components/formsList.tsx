import React from 'react'
import { Grid, Card, CardContent } from '@mui/material'
import { Dashboard } from '../utils/constantsTexts'
import { useNavigate } from 'react-router-dom';
import ArticleIcon from '@mui/icons-material/Article'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { FormValue } from '../utils/interfaces'
import { paths } from '../utils/constants';

interface Props {
  forms: FormValue[]
}

const FormsList = ({ forms }: Props) => {
  const navigate = useNavigate()
  const gotToFormDetail = (id: number) => {
    navigate(paths.formDetails + '/' + id)
  }

  return (
    <Grid item className='section_title_wrapper'>
      <p className='section_title'>
        <ArticleIcon />
        {Dashboard.sectionTitle}
      </p>
      <Grid className='form_selection_cards_wrapper list_wrapper '>
        {forms && 
          (forms.map((form) => {
            return (
              <Card
                key={form.formID}
                sx={{ maxWidth: 345 }}
                className='form_selection_card forms_list_card'
                onClick={() => gotToFormDetail(form.formID)}
              >
                <CardContent>
                  <p className='card_title'>
                    {form.formName}
                  </p>
                </CardContent>
                <ChevronRightIcon />
              </Card>
            )}))
          // })) :
          // (<Card
          //   key={forms.formID}
          //   sx={{ maxWidth: 345 }}
          //   className='form_selection_card forms_list_card'
          //   onClick={() => gotToFormDetail(forms.formID)}
          // >
          //   <CardContent>
          //     <p className='card_title'>
          //       {forms.formName}
          //     </p>
          //   </CardContent>
          //   <ChevronRightIcon />
          // </Card>)
        }
      </Grid>
    </Grid>
  )
}

export default FormsList