import React, {useState, useEffect, useDebugValue} from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import {makeStyles} from '@material-ui/core/styles'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import config from './../../config/config'
import CheckoutForm from './CheckoutForm';
import auth from './../auth/auth-helper'
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(config.stripe_test_api_key);

const useStyles = makeStyles(theme => ({
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
    register: {
        marginRight: '1rem',
        fontSize: '12px',
        color: '#fff',
        textTransform: 'uppercase',
        fontWeight: '700',
        letterSpacing: '0.09em',
        backgroundColor: '#FF7324',
        borderColor: '#FF7324',
        borderRadius: '2px',
    },
    error: {
      verticalAlign: 'middle'
    },
}))

export default function NewTournament(props) {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [error, setError] = useState()
  const [values, setValues] = useState({
    email: props.user.email,
    teamName: '',
  })

  const handleChange = name => event => {
    const value = name === 'image'
      ? event.target.files[0]
      : event.target.value
    setValues({...values, [name]: value })
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
  
  const closePayment = (success) => {
    if(success) {
      setShowSuccess(true)
      setOpen(false)
    }
  }
  const showError = (message) => {
    setError(message)
  } 
  console.log("New Payment Component: "+ props.user)

  return (
    <div>
      <Button variant="contained" className={classes.register} onClick={handleClickOpen} >
                Register
      </Button>

      <Snackbar open={showSuccess} autoHideDuration={6000} onClose={handleCloseSuccess}>
        <Alert onClose={handleCloseSuccess} severity="success">
          The payment has been confirmed
        </Alert>
      </Snackbar>


      <Dialog fullWidth={true} maxWidth = {'md'}  open={open} onClose={handleClose} disableBackdropClick={loading} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Make Payment</DialogTitle>
        <DialogContent>
        
            <TextField
            label="Email"
            type="text"
            fullWidth
            value={values.email} onChange={handleChange('email')}
          />
          
          <TextField
            label="Team Name"
            type="text"
            fullWidth
            value={values.teamName} onChange={handleChange('teamName')}
          />

          <Elements stripe={stripePromise}>
              <CheckoutForm tournamentId={props.tournamentId} 
              values={values} 
              userId={props.user._id} 
              closePayment={closePayment}
              showError={showError}
              />
          </Elements>

          {
            error && (<Typography component="p" color="error">
              <Icon color="error" className={classes.error}>error</Icon>
              {error}</Typography>)
          }
          
        </DialogContent>
      {/*
      <DialogActions>
          <Button onClick={handleClose} color="primary" variant="contained" disabled={loading}>
            Cancel
          </Button>
        
          <Button onClick={clickSubmit} color="secondary" variant="contained" disabled={loading}>
          {loading && <div><CircularProgress size={14} />Loading</div>}
          {!loading && 'Add'}
          </Button>
        
      </DialogActions>
      */}
      </Dialog>
    </div>
  )
}