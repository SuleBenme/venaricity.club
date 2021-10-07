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
import {forgotPassword} from './../auth/api-auth.js'
import Alert from '@material-ui/lab/Alert';

export default function ForgotPassword() {
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

    const classes = useStyles()
    const [loading, setLoading] = useState(false)
    const [values, setValues] = useState({
        email: '',
        success: false,
        error: '',
    })
    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
    }
    const clickSubmit = () => {
      if(!values.email){
        setValues({ ...values, error: "Fill in the email field"})
        return;
      } 
      setLoading(true)

      forgotPassword({
        email: values.email || undefined
      })
        .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error})
        } else {
          setValues({ ...values, error: '', email: '', success: true})
        }
        setLoading(false)
      })
      }
    
    return (<div>
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="h6" className={classes.title}>
              Forget Password
            </Typography>
            <TextField id="email" type="email" label="Email" className={classes.textField} value={values.email} onChange={handleChange('email')} margin="normal"/><br/>
            <br/> {
              values.error && (<Typography component="p" color="error">
                <Icon color="error" className={classes.error}>error</Icon>
                {values.error}</Typography>)
            }
            {values.success && (<Alert severity="success">The reset link was sent to your email address. Please make sure to check your email spam/trash folder</Alert>)}

          </CardContent>
          <CardActions>
            <Button color="primary" variant="contained" onClick={clickSubmit} className={classes.submit} disabled={loading}>
            {values.success ? 'Resend' : <>
            {loading && <div><CircularProgress size={16} />Loading</div>}
            {!loading && 'Send'}
            </>         
            }
            </Button>
          </CardActions>
        </Card>
        </div>
    )

}
