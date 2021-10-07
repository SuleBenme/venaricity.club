import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import {makeStyles} from '@material-ui/core/styles'
import NewTournament from './NewTournament'
import DeleteTournament from './DeleteTournament'
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
}))

export default function Prueba(props) {
  const classes = useStyles()
  const [showSuccess, setShowSuccess] = useState(false)
  const [severity, setSeverity] = useState()
  const [message, setMessage] = useState()

  const addDate = (date) => {
    setMessage("The tournament has been added")
    setSeverity("success")
    setShowSuccess(true)
    props.addDate(date)
  }
  const deleteDate = (dateId) => {
    setMessage("The tournament has been deleted")
    setSeverity("warning")
    setShowSuccess(true)
    props.deleteDate(dateId)
  }
  const handleCloseSuccess = () => {
    setShowSuccess(false)
  }

  //console.log("Este es el component prueba")

  return (
    <div>    
      <Snackbar open={showSuccess} autoHideDuration={6000} onClose={handleCloseSuccess}>
        <Alert onClose={handleCloseSuccess} severity={severity}>
          {message}
      </Alert>
      </Snackbar> 

      <Dialog open={props.prueba} onClose={props.close} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Date</DialogTitle>
        <DialogContent>
        <div className={classes.form}>
            {props.date.constructor.name === 'Date' ?
            <>
            <p>{props.date.toLocaleDateString()}</p>
            <NewTournament addDate={addDate} date={props.date}/></>
             : (<>
            <p>{new Date(props.date.date).toLocaleString()} </p>
            <p>{props.date.name}</p>
            <p>{props.date.description}</p>
            <DeleteTournament deleteDate={deleteDate} tournamentId={props.date._id}/>
            </>)}
        </div>
        </DialogContent>
      
      <DialogActions>
          <Button onClick={props.close} color="primary" variant="contained">
            Cancel
          </Button>
      </DialogActions>
      </Dialog>
    </div>
  )
}