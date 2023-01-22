import React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import { FormDetails } from '../utils/constantsTexts'
import CloseIcon from '@mui/icons-material/Close'
import { Grid, IconButton } from '@mui/material'

interface props {
  open: boolean,
  emitConfirm: () => void,
  emitCancel: () => void
}

const AlertDialog = ({ open, emitCancel, emitConfirm }: props) => {

  return (
    <div>
      <Dialog open={open}>
        <Grid className='close_button_row'>
          <IconButton onClick={() => emitCancel()}>
            <CloseIcon />
          </IconButton>
        </Grid>
        <h3 className='warning_title'>
          {FormDetails.deleteWarningTitle}
        </h3>
        <DialogContent>
          <p className='warning_body'>
            {FormDetails.deleteWarningText}
          </p>
        </DialogContent>
        <DialogActions className='warining_buttons_wrapper'>
          <button className='secondary_button' onClick={() => emitCancel()}>
            {FormDetails.warningButtonCancel}
          </button>
          <button className='main_button' onClick={() => emitConfirm()} autoFocus>
            {FormDetails.warningButtonConfirm}
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AlertDialog