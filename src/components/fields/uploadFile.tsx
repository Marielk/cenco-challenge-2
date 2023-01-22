import React, { useEffect, useState, useRef } from 'react'
import BackupIcon from '@mui/icons-material/Backup'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { FormFieldProps } from '../../utils/propsInterfaces'
import { FileDrop } from 'react-file-drop'
import { FileService } from '../../services/fileService'
import { Forms } from '../../utils/constantsTexts'
import '../../style/uploadStyles.css'
import { Card, CardActionArea, CardActions, CardContent } from '@mui/material'

const UploadFileField = ({ fieldData, emitValue, showError }: FormFieldProps) => {
  const [inputValue, setValue] = useState('')
  const [fileLoaded, setFileLoaded] = useState(false)
  const [fileToUpload, setFileToUpload] = useState<File>()
  const [showErrorFileType, setShowErrorFile] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const fileService = new FileService()

  useEffect(() => {
    if (!fieldData) return
    setRequired()
  }, [fieldData])

  useEffect(() => {
    emitValue && emitValue(inputValue)
  }, [inputValue])

  const onFileUploadedDrag = (event: React.DragEvent<HTMLDivElement>, files: FileList | null) => {
    event.preventDefault()
    if(files && files[0].type === 'text/csv') {
      processFile(files)
    } else {
      onFileTypeError()
    }
  }
  const onFileUploadedClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if(files && files[0].type === 'text/csv') {
      processFile(files)
    } else {
      onFileTypeError()
    }
  }

  const onFileTypeError = () => {
    const container = document.getElementById('upload_container')
    setTimeout(() => {
      setShowErrorFile(false)
      container && container.classList.remove('error')
    }, 3000)
    container && container.classList.add('error')
    setShowErrorFile(true)
  }

  const processFile = (files: FileList) => {
    setFileToUpload(files[0])
    fileService.encodeFileBase64(files[0])
      .then((fileString: string) => {
        const fileInfo = {
          fileName: files[0].name, 
          fileEncoded: fileString
        }
        fileString && setValue(JSON.stringify(fileInfo))
        setFileLoaded(true)
        return fileString
      })
  }

  const setRequired = () => {
    if (fileInputRef.current !== null && fieldData.validations.length > 0) {
      const isRequired = fieldData.validations[0].type === 'required'
      isRequired && fileInputRef.current.setAttribute('required', 'true')
    }
  }

  const onTargetClick = () => {
    fileInputRef.current && fileInputRef.current.click()
  }

  const removeFile = () => {
    setFileLoaded(false)
    setValue('')
  }

  return (
    <React.Fragment>
      {fileLoaded ? (
        <div>
          <Card>
            <CardContent className='file_uploaded_content'>
              <span className='file_uploaded_text'>
               <label>{Forms.uploadedTitle}</label>
                {fileToUpload && <p>{fileToUpload.name}</p>}
              </span>
              <CardActions>
                <button className='secondary_button' onClick={() => removeFile()}>
                  <DeleteForeverIcon />
                  {Forms.removeFile}
                </button>
              </CardActions>
            </CardContent>
          </Card>
        </div>) 
        :
        (<div id='upload_container' className={showError ? 'upload_container error': 'upload_container'}>
          {showErrorFileType ? (
            <label className='error_msg'>
              <ErrorOutlineIcon />
              {Forms.errorFileType}
            </label>
          ) : 
          (<React.Fragment>
            <label htmlFor='upload-file'>
                <BackupIcon/>
                <button>{Forms.uploadFile}</button>
                <p>{Forms.uploadFileText}</p>
              </label>
              <input
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => onFileUploadedClick(event)}
                ref={fileInputRef}
                type="file"
                className="hidden"
                id='upload-file'
              />
              <FileDrop
                onTargetClick={onTargetClick}
                onDrop={(files, event) => onFileUploadedDrag(event, files)}
              >
              </FileDrop>
          </React.Fragment>)}
        </div>)
      }
    </React.Fragment >
  )

}

export default UploadFileField;