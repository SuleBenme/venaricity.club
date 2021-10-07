import React, {useState} from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import {makeStyles} from '@material-ui/core/styles'
import {update} from './api-partner.js'
import auth from './../auth/auth-helper'
import CircularProgress from '@material-ui/core/CircularProgress';
import Edit from '@material-ui/icons/Edit'
import IconButton from '@material-ui/core/IconButton';
import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'

const useStyles = makeStyles(theme => ({
    form: {
        minWidth: 500,
        [theme.breakpoints.down("xs")]: {
          minWidth: 380,
        },
    },
    formControl: {
      marginTop: theme.spacing(3),
      minWidth: 200,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
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
    },
    uploadContainer: {
      display: 'flex',
      alignItems: 'center',
      marginTop: 10
    }
}))

export default function UpdatePartner(props) {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [values, setValues] = useState(props.partner)
  const [imagen, setImage] = useState(false)
  const [oldType, set0ldType] = useState(props.partner.type)
  const [type, setType] = useState(parseInt(props.partner.type))

  const handleType = (event, newAlignment) => {
    setType(newAlignment);
  }

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
  }
  const handleChangeImage = name => event => {
    setImage(true)
    setValues({...values, [name]: event.target.files[0] })
  }

  const clickSubmit = () => {
    const jwt = auth.isAuthenticated()
    setLoading(true)

    let partnerData = new FormData()
    values._id && partnerData.append('_id', values._id)
    values.name && partnerData.append('name', values.name)
    values.link && partnerData.append('link', values.link)
    values.image && partnerData.append('image', values.image)
    type && partnerData.append('type', type)
    values.description && partnerData.append('description', values.description)

    update( partnerData, {t: jwt.token}).then((data) => {
      if (data && data.error) {
        setValues({...values, error: data.error})
      } else {
        props.updatePartner(data, oldType)
        setImage('')
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

  return (
    <div>
       <IconButton aria-label="Edit" color="primary" onClick={handleClickOpen}>
              <Edit fontSize="large"/>
       </IconButton>

      <Dialog open={open} onClose={handleClose} disableBackdropClick={loading} aria-labelledby="form-dialog-title">
      <div className={classes.form}>
        <DialogTitle id="form-dialog-title">Update Partner</DialogTitle>
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
            onChange={handleChangeImage('image')}
            />
            <Button color="secondary" variant="contained" component="span">
              Upload Image
            </Button>
          </label>
          {values.image && <>
            <img style={{height: 50, marginLeft: 10}} src={imagen ? URL.createObjectURL(values.image) : values.image} alt={"Image"}/>
            <span className={classes.imagePath}>{values.image.name}</span> 
          </>
          }
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
            aria-label="partners"
          >
            <ToggleButton value={1} aria-label="principle partners">
              Principle Partners
            </ToggleButton>
            <ToggleButton value={2} aria-label="offical partners">
             Official Partners
            </ToggleButton>
            <ToggleButton value={3} aria-label="charity partners">
              Charity Partners
          </ToggleButton>
          </ToggleButtonGroup><br/>
          
        </DialogContent>
        
        <DialogActions>
          <Button onClick={handleClose} color="primary" variant="contained" disabled={loading}>
            Cancel
          </Button>
          <Button onClick={clickSubmit} color="secondary" variant="contained" disabled={loading}>
          {loading && <div><CircularProgress size={14} />Loading</div>}
          {!loading && 'Update'}
          </Button>
        </DialogActions>
        </div>
      </Dialog>
    </div>
  )
}
