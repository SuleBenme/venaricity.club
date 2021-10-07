import React, {useState} from 'react'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import auth from './../auth/auth-helper'
import {remove} from './api-history.js'

export default function DeleteNews(props) {
  const [open, setOpen] = useState(false)
  const jwt = auth.isAuthenticated()

  const clickButton = () => {
    setOpen(true)
  }

  const deleteAccount = () => { 
    remove({
      historyId: props.historyId
    }, {t: jwt.token}).then((data) => {
      if (data && data.error) {
        console.log(data.error)
      } else {
        setOpen(false)
        props.deleteHistory(props.historyId)
      }
    })
  }

  const handleRequestClose = () => {
    setOpen(false)
  }
    return (<>
      <IconButton aria-label="Delete" onClick={clickButton} color="secondary">
        <DeleteIcon fontSize="large"/>
      </IconButton>

      <Dialog open={open} onClose={handleRequestClose}>
        <DialogTitle>{"Delete History"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Confirm to delete this history.
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
    </>)
}
