import React, {useState} from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Add from '@material-ui/icons/AddBox'
import {makeStyles} from '@material-ui/core/styles'
import {create} from './api-history.js'
import auth from '../auth/auth-helper'
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles(theme => ({
  form: {
    minWidth: 500,
    [theme.breakpoints.down("xs")]: {
      minWidth: 380,
    },
  },
  input: {
    display: 'none'
  },
  filename:{
    marginLeft:'10px'
  },
  formControl: {
    minWidth: 200,
    marginTop: theme.spacing(3),
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  imagePath: {
    padding: 2,
    fontSize: 18,
  },
  uploadContainer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 10
  }
    
}))

export default function NewPartner(props) {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [values, setValues] = useState({
    image: '',
    content: '',
    name: '',
    errors: ''
  })
  
  const handleChange = name => event => {
    if(name === 'image' && event.target.files[0] === undefined){
      return;
    }
    const value = name === 'image'
      ? event.target.files[0]
      : event.target.value
    setValues({...values, [name]: value })
  }
  
  const clickSubmit = () => {
    const jwt = auth.isAuthenticated()

    if(!values.content){
      alert("Fill the description field")
      return;
    }
    setLoading(true)

    let historyData = new FormData()
    values.content && historyData.append('content', values.content)
    values.name && historyData.append('name', values.name)
    values.image && historyData.append('image', values.image)

    create( historyData, {t: jwt.token}).then((data) => {
      if (data && data.error) {
        setValues({...values, error: data.error})
      } else {
        //console.log(data);
        setValues({...values, content: '', image: ''})
        props.addHistory(data)
        setShowSuccess(true)
        setOpen(false)
      }
      setLoading(false)
    })
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setLoading(false)
  }

  const handleCloseSuccess = () => {
    setShowSuccess(false)
  }

  return (
    <div>
      <Snackbar open={showSuccess} autoHideDuration={6000} onClose={handleCloseSuccess}>
        <Alert onClose={handleCloseSuccess} severity={"success"}>
         History has been added
        </Alert>
      </Snackbar>

      <Button aria-label="Add Lesson" color="primary" variant="contained" onClick={handleClickOpen}>
        <Add/> &nbsp; New History
      </Button>
      <Dialog open={open} onClose={handleClose} disableBackdropClick={loading} aria-labelledby="form-dialog-title">
      <div className={classes.form}>
        <DialogTitle id="form-dialog-title">Add New History</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            value={values.name} onChange={handleChange('name')}
          /><br/>
         <div className={classes.uploadContainer}>
          <label htmlFor="upload-photo">
            <input
            style={{ display: 'none' }}
            id="upload-photo"
            name="upload-photo"
            type="file"
            onChange={handleChange('image')}
            />
            <Button color="secondary" variant="contained" component="span">
              Upload Image
            </Button>
          </label>
          {values.image && <img style={{height: 50, marginLeft: 10}} src={URL.createObjectURL(values.image)} alt={"Image"}/>}
          <span className={classes.imagePath}>{values.image.name}</span>

          </div>

          <TextField
            id="outlined-multiline-static"
            label="Description"
            multiline
            rows={3}
            value={values.content}
            onChange={handleChange('content')}
            fullWidth
            margin='normal'
            variant="outlined"
          />   
        </DialogContent>

        {/*
          {values.errors.map(error => (
          <Alert key={error} severity="error">{error}
          </Alert>  
          ))}
          */}

        <DialogActions>
          <Button onClick={handleClose} color="primary" variant="contained" disabled={loading}>
            Cancel
          </Button>
          <Button onClick={clickSubmit} color="secondary" variant="contained" disabled={loading}>
          {loading ? 'Loading' : 'Add'}
          </Button>
        </DialogActions>
        </div>
      </Dialog>
    </div>
  )
}
