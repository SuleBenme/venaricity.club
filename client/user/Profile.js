import React, { useState, useEffect } from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction' 
import ListItemText from '@material-ui/core/ListItemText' 
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Edit from '@material-ui/icons/Edit'
import Divider from '@material-ui/core/Divider'
import DeleteUser from './DeleteUser'
import auth from './../auth/auth-helper'
import {read} from './api-user.js'
import {Redirect, Link} from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  root: 
  theme.mixins.gutters({
    maxWidth: 600,
    width: '100%',
    margin: 'auto',
    padding: theme.spacing(3),
    marginTop: theme.spacing(10)
  }),
  title: {
    margin: `${theme.spacing(2)}px ${theme.spacing(1)}px 0`,
    color: theme.palette.protectedTitle,
    fontSize: '1em'
  },
  bigAvatar: {
    width: 60,
    height: 60,
    margin: 10
  }
}))

export default function Profile({ match }) {
  const classes = useStyles()
  const [values, setValues] = useState({
    user: {},
    redirectToSignin: false,
  })
  const jwt = auth.isAuthenticated()

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
  
    read({
      userId: match.params.userId
    }, {t: jwt.token}, signal).then((data) => {
      if (data && data.error) {
        setValues({...values, redirectToSignin: true})
      } else {
        setValues({...values, user: data})
      }
    })
    return function cleanup(){
      abortController.abort()
    }

  }, [match.params.userId])

    if (values.redirectToSignin) {
      return <Redirect to='/signin'/>
    }
    console.log(values)
    return (
      <Paper className={classes.root} elevation={4}>
        <Typography variant="h6" className={classes.title}>
          Profile
        </Typography>
        <List dense>
          {Object.keys(values.user).length !== 0 && <>
          <ListItem>
            <ListItemAvatar>
              <Avatar src={values.user.photo}  className={classes.bigAvatar}/>
            </ListItemAvatar>
            <ListItemText primary={values.user.name} secondary={values.user.email}/> {
             auth.isAuthenticated().user && auth.isAuthenticated().user._id == values.user._id
             && (<ListItemSecondaryAction>
                  <Link to={"/user/edit/" + values.user._id}>
                    <IconButton aria-label="Edit" color="primary">
                      <Edit/>
                    </IconButton>
                  </Link>
                  <DeleteUser userId={values.user._id}/>
                </ListItemSecondaryAction>)
            }
          </ListItem>
          <Divider/>
          <ListItem>
            <ListItemText primary={values.user.about} secondary={"Joined: " + (
              new Date(values.user.created)).toDateString()}/>
          </ListItem>
        </>}
        </List>
      </Paper>
    )
}


