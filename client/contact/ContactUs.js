import React, {useState} from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import { makeStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import {contactUs} from '../user/api-user'
import Facebook from '../assets/images/facebook.svg'
import Youtube from '../assets/images/youtube.svg'
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
  wrapper: {
    maxWidth: 950,
    width: '100%',
    margin: 'auto',
    display: 'flex',
    boxSizing: 'border-box',
    alignItems: 'center',
    marginTop: theme.spacing(11),
    marginBottom: theme.spacing(4),
    [theme.breakpoints.down("750")]: {
      flexDirection: 'column'
   }
  },

  links: {
    maxWidth: '25%',
    flex: '0 0 25%',
    width: '100%',
    paddingRight: '15px',
    paddingLeft: '15px',
    boxSizing: 'border-box',
    [theme.breakpoints.down("750")]: {
      maxWidth: 'none',
      flex: 'none', 
      width: 'unset',
      marginBottom: 20,

    },
    '& div': {
      color: '#9c9cab',
      display: 'flex',
      alignItems: 'center',
      marginTop: 14,
    }
  },
  card: {
    maxWidth: '75%',
    flex: '0 0 75%',
    width: '100%',
    paddingRight: '15px',
    paddingLeft: '15px',
    //margin: 'auto',
    textAlign: 'center',
    boxSizing: 'border-box',
    [theme.breakpoints.down("750")]: {
      maxWidth: '90%',
    },
  },
  error: {
    verticalAlign: 'middle'
  },
  title: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    color: theme.palette.openTitle
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    maxWidth: 400,
    width: '100%'
    
  },
  submit: {
    margin: 'auto',
    marginBottom: theme.spacing(2)
  }
}))

export default function ContactUsPage (){
  const classes = useStyles()
  const [loading, setLoading] = useState(false)
  const [values, setValues] = useState({
    email: '',
    message: '',
    open: false,
    error: ''
  })

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
  }

  const clickSubmit = () => {
    if(!values.email ||  !values.message){
      setValues({ ...values, error: "Fill in the required text fields"})
      return;
    } 
    setLoading(true)
    const data = {
      message: values.message || undefined,
      email: values.email || undefined,
    }

    contactUs(data).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error})
      } else {
        setValues({ ...values, error: '', open: true, message: '', email: ''})
      }
      setLoading(false)
    })
  }

  const handleClose = () => {
    setValues({ ...values, open: false})
  }

    return (<div className={classes.wrapper}>
      <div className={classes.links}>
      <a href='https://www.facebook.com/VenariCity' target="_blank"><div><img style={{marginRight: 16, width: 30}} src={Facebook} />Facebook page</div></a>
      <a href='https://www.youtube.com/channel/UCaeqGRZcLoQDHi1jN55hWHA' target="_blank"> <div><img style={{marginRight: 16, width: 30}} src={Youtube} />Youtube page</div></a>
      </div>
  
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h6" className={classes.title}>
            CONTACT US
          </Typography>
          <Typography component="p">
            Please do not hesitate to get in touch with us. We always reply as soon as possible - promised!
          </Typography>
          <TextField required variant="outlined" id="name" label="Email" className={classes.textField} value={values.email} onChange={handleChange('email')} margin="normal"/><br/>
          <TextField
                id="outlined-multiline-static"
                label="Message"
                multiline
                rows={3}
                value={values.message}
                onChange={handleChange('message')}
                required
                fullWidth
                margin="normal"
                variant="outlined"
                className={classes.textField}
            />         
        {values.error && (
            <Typography component="p" color="error">
              <Icon color="error" className={classes.error}>error</Icon>
              {values.error}
            </Typography>)
          }
        </CardContent>
        <CardActions>
          <Button color="primary" variant="contained" onClick={clickSubmit} disabled={loading} className={classes.submit}>{loading ? 'Wait...' : 'Submit'}</Button>
        </CardActions>
      </Card>
      <Dialog open={values.open} disableBackdropClick={true}>
        <DialogTitle>We will answer as soon as possible</DialogTitle>
        <DialogContent>
          <DialogContentText>
           The message was sent successfully!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose} color="primary" autoFocus="autoFocus" variant="contained">
              OK
            </Button>
        </DialogActions>
      </Dialog>
    </div>)
}