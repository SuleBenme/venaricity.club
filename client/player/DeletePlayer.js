import React, {useState} from 'react'
import PropTypes from 'prop-types'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import auth from './../auth/auth-helper'
import {remove} from './api-player.js'
import {Redirect, Link} from 'react-router-dom'

export default function DeleteUser(props) {
  const [open, setOpen] = useState(false)
  
  const jwt = auth.isAuthenticated()
  const clickButton = () => {
    setOpen(true)
  }
  const deleteAccount = () => { 
    remove({
      playerId: props.playerId
    }, {t: jwt.token}).then((data) => {
      if (data && data.error) {
        console.log(data.error)
      } else {
        setOpen(false)
        props.deletePlayer(props.playerId)
        //Function
      }
    })
  }
  const handleRequestClose = () => {
    setOpen(false)
  }
    return (<span>
      <IconButton  aria-label="Delete" onClick={clickButton} color="secondary">
        <DeleteIcon fontSize="large"/>
      </IconButton>

      <Dialog open={open} onClose={handleRequestClose}>
        <DialogTitle>{"Delete Player"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Confirm to delete this player.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRequestClose} color="primary">
            Cancel
          </Button>
          <Button onClick={deleteAccount} color="secondary" autoFocus="autoFocus">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </span>)
}

