import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import 'date-fns';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Add from '@material-ui/icons/AddBox'
import {makeStyles} from '@material-ui/core/styles'
import auth from './../auth/auth-helper'
import CircularProgress from '@material-ui/core/CircularProgress';
import {create} from './api-tournament'
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider, KeyboardTimePicker} from '@material-ui/pickers';

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
    withoutLabel: {
      marginTop: theme.spacing(3),
    },
    reponsiveImage: {
      marginTop: theme.spacing(3),
      width: '100%',
      maxWidth: '400px',
      height: 'auto',
      display: 'block'
    },
    textField: {
      marginTop: theme.spacing(2)
    },
}))

export default function NewTournament(props) {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date(props.date));
  const [values, setValues] = useState({
    name: '',
    description: '',
  })

  const handleChange = name => event => {
    const value = name === 'image'
      ? event.target.files[0]
      : event.target.value
    setValues({...values, [name]: value })
  }

  const handleDateChange = (date) => {
    setSelectedDate(date)
  }
  //console.log(selectedDate)

  const clickSubmit = () => {
    const jwt = auth.isAuthenticated()
    setLoading(true)

    const tournament = {
        name: values.name || undefined,
        description: values.description || undefined,
        date: selectedDate.toUTCString() || undefined
    }
    create(tournament, {t: jwt.token}).then((data) => {
        if (data && data.error) {
            console.log(data.error)
        } else {
          console.log(data)
          setLoading(false)
          setOpen(false)
          props.addDate(data)
        }
    })
    
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setLoading(false)
  }
 // console.log("NewTournament Componente: "+ open)

  return (
    <div>
      <Button aria-label="Add Lesson" color="primary" variant="contained" onClick={handleClickOpen}>
        <Add/> &nbsp; New Tournament
      </Button>
      <Dialog open={open} onClose={handleClose} disableBackdropClick={loading} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Add Tournament</DialogTitle>
        <DialogContent>
        <div className={classes.form}>
            <TextField
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            value={values.name} onChange={handleChange('name')}
          /><br/>

          <TextField
            id="outlined-multiline-static"
            label="Description"
            multiline
            rows={3}
            onChange={handleChange('description')}
            fullWidth
            variant="outlined"
            className={classes.textField}
            /><br/>
        
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardTimePicker
            margin="normal"
            id="time-picker"
            label="Time picker"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change time',
            }}
          />
        </MuiPickersUtilsProvider>

        </div>
        </DialogContent>
      
      <DialogActions>
          <Button onClick={handleClose} color="primary" variant="contained" disabled={loading}>
            Cancel
          </Button>
          <Button onClick={clickSubmit} color="secondary" variant="contained" disabled={loading}>
          {loading && <div><CircularProgress size={14} />Loading</div>}
          {!loading && 'Add'}
          </Button>
      </DialogActions>
      </Dialog>
    </div>
  )
}