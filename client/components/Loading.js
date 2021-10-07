import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles({ 
    loading: {
        position: 'absolute',
        top: '50%',  
        left: '50%', 
        transform: 'translate(-50%, -50%)'
    }
})

export default function Loading() {
    const classes = useStyles()
    return (<div className={classes.loading}> <CircularProgress size={50} /> </div>)
}