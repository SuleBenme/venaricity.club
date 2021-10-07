import React, {useEffect, useState} from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import {verifyEmail} from './../auth/api-auth.js'
import {Link} from 'react-router-dom'
import Alert from '@material-ui/lab/Alert';
import Typography from '@material-ui/core/Typography'
import {makeStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Icon from '@material-ui/core/Icon'

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 600,
    width: '100%',
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(2)
  },
  error: {
    verticalAlign: 'middle',
    marginBottom: 10,
  },
  title: {
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle
  },
  loadingCircular: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
}))

export default function ResetPassword({match, location}) {
  const classes = useStyles()
  const [loading, setLoading] = useState(true)
  const [values, setValues] = useState({
      error: '',
      redirectToReferrer: false
  })

  useEffect( () => {
      const abortController = new AbortController()
      const signal = abortController.signal

      verifyEmail({verifyEmailLink: match.params.verifyEmailLink}, signal)
          .then((data) => {
          if (data.error) {
            setValues({ ...values, error: data.error})
          } else {
            setValues({ ...values, error: '', redirectToReferrer: true})
          }
          setLoading(false)
      })
      return function cleanup(){
          abortController.abort()
      }
  },[])


  console.log("Render")

    return (<div>
      {!loading ? <>
          <Card className={classes.card}>
          <CardContent>
            <Typography variant="h6" className={classes.title}>
             Email verification
            </Typography>
          </CardContent>
          {values.redirectToReferrer && <Alert severity="success">Your email is verified — <Link to="/signin">Please log in here!</Link></Alert>}
          {values.error && (
          <Typography component="p" color="error">
            <Icon color="error" className={classes.error}>error</Icon>
            {values.error}
          </Typography>)
          }
          </Card>
      </>
      : 
      (<div className={classes.loadingCircular}>
        <CircularProgress size={64}/>
      </div>)}

      </div>
  )
}