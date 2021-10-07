import React, {useState} from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Add from '@material-ui/icons/AddBox'
import {makeStyles} from '@material-ui/core/styles'
import {create} from './api-partner.js'
import auth from './../auth/auth-helper'
import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
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
  const [type, setType] = useState(0)
  const [values, setValues] = useState({
    image: '',
    name: '',
    description: '',
    link: '',
    errors: ''
  })

  const handleType = (event, newAlignment) => {
    setType(newAlignment);
  }
  
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

    if(!values.name || !values.description, !values.link){
      alert("Fill all the text fields")
      return;
    }
    setLoading(true)


    let partnerData = new FormData()
    values.name && partnerData.append('name', values.name)
    values.link && partnerData.append('link', values.link)
    values.image && partnerData.append('image', values.image)
    type && partnerData.append('type', type)
    values.description && partnerData.append('description', values.description)

    //console.log(values)

    create( partnerData, {t: jwt.token}).then((data) => {
      if (data && data.error) {
        setValues({...values, error: data.error})
      } else {
        //console.log(data);
        setValues({...values, name: '', description: '', link: '', image: ''})
        props.addPartner(data)
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
  //console.log(values)

  return (
    <div>
      <Snackbar open={showSuccess} autoHideDuration={6000} onClose={handleCloseSuccess}>
        <Alert onClose={handleCloseSuccess} severity={"success"}>
         The partner has been added
        </Alert>
      </Snackbar>

      <Button aria-label="Add Lesson" color="primary" variant="contained" onClick={handleClickOpen}>
        <Add/> &nbsp; New Partner
      </Button>
      <Dialog open={open} onClose={handleClose} disableBackdropClick={loading} aria-labelledby="form-dialog-title">
      <div className={classes.form}>
        <DialogTitle id="form-dialog-title">Add New Partner</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            value={values.name} onChange={handleChange('name')}
          /><br/>

          <TextField
            margin="dense"
            label="Link"
            type="text"
            fullWidth
            value={values.link} onChange={handleChange('link')}
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
            value={values.description}
            onChange={handleChange('description')}
            fullWidth
            margin='normal'
            variant="outlined"
          />   

          <ToggleButtonGroup
            value={type}
            exclusive
            onChange={handleType}
            className={classes.withoutLabel}
            aria-label="text alignment"
          >
            <ToggleButton value={1} aria-label="left aligned">
              Principle Partners
            </ToggleButton>
            <ToggleButton value={2} aria-label="centered">
             Official Partners
            </ToggleButton>
            <ToggleButton value={3} aria-label="centered">
              Charity Partners
          </ToggleButton>
          </ToggleButtonGroup><br/>
          
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
