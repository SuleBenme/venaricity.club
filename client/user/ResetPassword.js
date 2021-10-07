import React, {useState} from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/core/styles'
import {resetPassword} from './../auth/api-auth.js'
import {Redirect} from 'react-router-dom'

const useStyles = makeStyles(theme => ({
    card: {
      maxWidth: 600,
      margin: 'auto',
      textAlign: 'center',
      marginTop: theme.spacing(12),
      paddingBottom: theme.spacing(2)
    },
    error: {
      verticalAlign: 'middle'
    },
    title: {
      marginTop: theme.spacing(2),
      color: theme.palette.openTitle
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 300
    },
    submit: {
      margin: 'auto',
      marginBottom: theme.spacing(2)
    }
  }))
  
  export default function ResetPassword({match, location}) {
    const classes = useStyles()
    const [loading, setLoading] = useState(false)
    const [values, setValues] = useState({
        newPassword: '',
        error: '',
        redirectToReferrer: false
    })
  
    const handleChange = name => event => {
      setValues({ ...values, [name]: event.target.value })
    }
  
    const clickSubmit = () => {
      setLoading(true)
    
      resetPassword({
        newPassword: values.newPassword || undefined,
        resetPasswordLink: match.params.resetPasswordLink})
        .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error})
        } else {
          setValues({ ...values, error: '', redirectToReferrer: true})
        }
      })
    }

    const {from} = location.state || {
        from: {
          pathname: '/signin'
        }
    }
    const {redirectToReferrer} = values
    if (redirectToReferrer) {
        return (<Redirect to={from}/>)
    }
  
      return (<div>
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="h6" className={classes.title}>
              Reset Password
            </Typography>
            <TextField id="email" type="password" label="Password" className={classes.textField} value={values.newPassword} onChange={handleChange('newPassword')} margin="normal"/><br/>
            <br/> {
              values.error && (<Typography component="p" color="error">
                <Icon color="error" className={classes.error}>error</Icon>
                {values.error}</Typography>)
            }
          </CardContent>
          <CardActions>
            <Button color="primary" variant="contained" onClick={clickSubmit} className={classes.submit} disabled={loading}>
            {loading && <div><CircularProgress size={16} />Loading</div>}
            {!loading && 'Submit'}
            </Button>
          </CardActions>
        </Card>
        </div>
    )
}