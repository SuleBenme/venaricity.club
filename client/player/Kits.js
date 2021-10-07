import React, { useState, useEffect } from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Add from '@material-ui/icons/AddBox'

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        '& div': {
            width: 50,
            margin: 10,
            textAlign: 'center',
            //lineHeight: '75px',
            fontSize: '20px'
        }
    },
}))

export default function Kits(props){
    const classes = useStyles()
    const [open, setOpen] = useState(false)

    const handleClickOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }

    return(
    <div>
      <Button aria-label="See Kits" color="primary" variant="contained" onClick={handleClickOpen}>
        Kits
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <div className={classes.form}>
        <DialogTitle id="form-dialog-title">Kits</DialogTitle>
        <DialogContent>

        <div className={classes.container}>
            {props.players.map((number) => {
                return(<div key={number.kit} style={number.found && {backgroundColor: '#4f74ff', color: 'white'}}>{number.found ? number.kit : number}</div>)
            })}
        </div>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="primary" variant="contained">
            Cancel
          </Button>
        </DialogActions>
        </div>
      </Dialog>
    </div>
    )
}