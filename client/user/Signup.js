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
import {create, validateHuman} from './api-user.js'
import {Link} from 'react-router-dom'
import ReCAPTCHA from "react-google-recaptcha";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';

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
    verticalAlign: 'middle'
  },
  title: {
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300,
    '&::input': {
      '-ms-reveal': {
        display: 'none'
      }
    }
  },
  submit: {
    margin: 'auto',
    marginBottom: theme.spacing(1)
  },
  captchat: {
    marginTop: theme.spacing(2),
      '& div': {
        display: 'flex',
        placeContent: 'center',
    }
  }
}))

export default function Signup (){
  const classes = useStyles()
  const [isHuman, setIsHuman] = useState(false)
  const [loading, setLoading] = useState(false)
  const [values, setValues] = useState({
    name: '',
    password: '',
    confirmPassword: '',
    email: '',
    open: false,
    showPassword: false,
    showConfirmPassword: false,
    error: ''
  })

  const onChange = (value) => {
    setLoading(true)
    console.log("Captcha value:", value);
    validateHuman({key:value}).then((data) => {
      if (data.error) {
        console.log(data.error)
        setIsHuman(false)
      } else {
        //console.log(data)
        setIsHuman(data.message)
      }
      setLoading(false)
    })
  }
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleClickConfirmShowPassword = () => {
    setValues({ ...values, showConfirmPassword: !values.showConfirmPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
  }

  const clickSubmit = () => {
    if(values.password !== values.confirmPassword){
      setValues({ ...values, error: "The passwords don't match"})
      return;
    }

    if(!isHuman){
      console.log("Confirm that you aren't a bot")
      setValues({ ...values, error: "Confirm that you aren't a bot"})
      return;
    }
    setLoading(true)

    const user = {
      name: values.name || undefined,
      email: values.email || undefined,
      password: values.password || undefined
    }
    create(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error})
      } else {
        setValues({ ...values, error: '', open: true, name: '', password: '', confirmPassword: '', email: '' })
      }
      setLoading(false)
    })
  }

  console.log(isHuman)

    return (<>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h6" className={classes.title}>
            Sign Up
          </Typography>
          <TextField id="name" label="Name" className={classes.textField} value={values.name} onChange={handleChange('name')} margin="dense"/><br/>
          <TextField id="email" type="email" label="Email" className={classes.textField} value={values.email} onChange={handleChange('email')} margin="dense"/><br/>
          <FormControl margin="dense" className={classes.textField}>
            <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
            <Input
              id="standard-adornment-confirmPassword"
              type={values.showPassword ? 'text' : 'password'}
              value={values.password}
              onChange={handleChange('password')}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>

          <FormControl margin="dense" className={classes.textField}>
            <InputLabel htmlFor="standard-adornment-password">Confirm password</InputLabel>
            <Input
              id="standard-adornment-password"
              type={values.showConfirmPassword ? 'text' : 'password'}
              value={values.confirmPassword}
              onChange={handleChange('confirmPassword')}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickConfirmShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {values.showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              
            />
          </FormControl>
          <ReCAPTCHA
          className={classes.captchat}
          sitekey="6Ld5zCQaAAAAAFJFqndyTUQkE6BMN7ZItKGp4DLd"
          onChange={onChange}
          />
          <br/> {
            values.error && (<Typography component="p" color="error">
              <Icon color="error" className={classes.error}>error</Icon>
              {values.error}</Typography>)
          }
        </CardContent>
        <CardActions>
          <Button color="primary" variant="contained" onClick={clickSubmit} disabled={loading} className={classes.submit}>{loading ? 'Wait...' : 'Submit'}</Button>
        </CardActions>
      </Card>
      <Dialog open={values.open} disableBackdropClick={true}>
        <DialogTitle>New Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            New account successfully created.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Link to="/signin">
           <Button color="primary" autoFocus="autoFocus" variant="contained">  
           Log in
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </>)
}