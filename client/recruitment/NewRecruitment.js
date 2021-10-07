import React, { useState, useEffect } from 'react'
import {makeStyles} from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment'
import TextField from '@material-ui/core/TextField'
import AddIcon from '@material-ui/icons/Add'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import {apply} from '../user/api-user.js'
import Chip from '@material-ui/core/Chip';
import Icon from '@material-ui/core/Icon'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { wrap } from 'lodash'
import { Divider } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  wrapperContainer: {
    marginTop: theme.spacing(8),
  },
  paper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: '#fff',
      margin: 'auto',
      padding: 20,
      maxWidth: 700,
      //marginTop: theme.spacing(3),
  },
  header: {
    fontSize: '2.5rem',
    fontWeight: 700,
    fontStyle: 'normal',
    letterSpacing: '.3px',
    textTransform: 'uppercase',
    margin: '15px 0',
    textAlign: 'center',
    color: '#3861fb',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    maxWidth: 550,
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  root:{
    margin: 0,
    padding: '0px 20px 20px 20px',
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap'
    }
  },
  list: {
    textAlign: 'left',
    color: '#9c9c9c',
    fontSize: '20px',
  },
  chip: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0,
  },
  error: {
    verticalAlign: 'middle'
  },
  imagePath: {
    padding: 2,
    fontSize: 18,
  },
  uploadContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  info: {
    textAlign: 'center',
    letterSpacing: '1px',
    fontSize: '1.1rem',
    width: 800,
    paddingRight: 40,
    [theme.breakpoints.down('sm')]: {
      padding: 0,
      width: '100%',
    }
  }
}))
export default function Recruitment() {
    const classes = useStyles()
    const [loading, setLoading] = useState(false)
    const [mic, setMic] = useState('yes')
    const [image, setImage] = useState('')
    const [values, setValues] = useState({
        location: '',
        image: '',
        otherPostion: '',
        foundUs: '',
        psn: '',
        primaryPosition: '',
        reasons: '',
        open: false,
        error: ''
    })

    const clickSubmit = () => {
      if(!values.psn || !values.primaryPosition){
        setValues({ ...values, error: "Fill in the required text fields"})
        return;
      } 

      setLoading(true)

      let data = new FormData()
      mic && data.append('mic', mic)
      values.location && data.append('location', values.location)
      values.foundUs && data.append('foundUs', values.foundUs)
      values.psn && data.append('psn', values.psn)
      values.primaryPosition && data.append('primaryPosition', values.primaryPosition)
      values.otherPostion && data.append('otherPostion', values.otherPostion)
      values.reasons && data.append('reasons', values.reasons)
      values.mic && data.append('mic', values.mic)
      values.image && data.append('image', values.image)

      //console.log(data)

      apply(data).then((data) => {
        if (data.error) {
          //console.log(data.error)
          //setValues({ ...values, error: data.error})
        } else {
          setValues({ ...values, error: '', open: true, image: '', primaryPosition: '', otherPostion: [], foundUs: '', psn: '', reasons: '', location: '' })
          setImage('')
        }
        setLoading(false)
      })
    }
  
    const handleChangeImage = () => event => {
      //console.log(event.target.files[0])
      //Save file
      setValues({ ...values, image: event.target.files[0] })
      //Create an image to show
      setImage(URL.createObjectURL(event.target.files[0]))
    }  

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
    }

    const handleClose = () => {
      setValues({ ...values, open: false})
    }

    const handleChangeMic= (event) => {
      setMic(event.target.value);
    }

   // console.log(values)
    
      return (
      <div className={classes.wrapperContainer}>
       <h3 className={classes.header}>Venari City FC is recruiting!</h3>
       <div className={classes.root}>
         <div className={classes.info}>
           <p>
           First and foremost we at Venari City are a community of like-minded individuals
            with a balanced culture of winning and having a good time. This means that we
            prioritize a fitting personality over skill level. You can be a great player, but if you
            don’t fit the culture of the team you may not be accepted. We value versatility in
            positions and play style, we are willing to work with players who may not have the
            required skill level as long as they fit in, follow instruction, and have the right
            attitude. We accept players of all ages, nations and languages, although we mostly
            communicate in English. Having a microphone is not mandatory, but can increase
            your chances of being welcomed into our club greatly.
           </p>
           <p>
           Your application is your first impression, and at Venari City the value of a good first
           cannot be overstated. So tell us a little bit about yourself, but please touch on the following;
           </p>
           <div style={{textAlign: 'left', width: '100%'}}>
           <ul style={{margin: '0 auto', width: 'max-content'}}>
             <li>The type of player you are</li>
             <li>Your three main positions</li>
             <li>What you’re looking for in a team</li>
           </ul>
           </div>
           <h4>Loyalty to the club is mandatory</h4>
           <p>Club Hoppers need not apply</p>
           <p>If you leave the club to play with our competitors, you will not be welcomed 
             back no matter how well your trial has gone. We do have exceptions to this as we 
             allow our players to leave in order to play league matches (VPG, PGS, etc) as well as to play 
             with your friends. This is not endorsed and frequent leaving of the club could affect your standing 
             with managers
           </p>
          <p>If your application is successful, you will begin a trial period with the club, where you will play mainly 
            in your most comfortable positions. The trial period could range anywhere from five to twenty-five games 
            depending on your skill level and potential. On rare occasions this trial period could be cut short if 
            enough managers believe they have seen enough. You may be told via direct message or in the party chat if 
            your trial has been successful. Do not take rejection personally as a good attitude leaves the option of a 
            re-trial open in the future.
          </p> 

         </div>
       <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AssignmentIndIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Trial request
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
            label="PSN ID"
            type="text"
            variant="outlined"
            required
            fullWidth
            autoFocus
            value={values.psn} onChange={handleChange('psn')}
          />
          </Grid>

          <Grid item xs={12} sm={6}>
          <TextField
             label="Timezone Location"
             type="text"
             variant="outlined"
             fullWidth
             autoFocus
             value={values.location} onChange={handleChange('location')}
          />
          </Grid>

          <Grid item xs={12} sm={6}>
          <TextField
            label="Primary Position"
            type="text"
            variant="outlined"
            required
            fullWidth
            autoFocus
            value={values.primaryPosition} onChange={handleChange('primaryPosition')}
          />
           </Grid>

          <Grid item xs={12} sm={6}>
          <TextField
             label="Other Positions"
             type="text"
             variant="outlined"
             fullWidth
             autoFocus
             value={values.otherPostion} onChange={handleChange('otherPostion')}
          />
          </Grid>

           <Grid item xs={12}>
             <div className={classes.uploadContainer}>
              <label htmlFor="upload-photo">
                  <input
                  style={{ display: 'none' }}
                  id="upload-photo"
                  name="upload-photo"
                  type="file"
                  onChange={handleChangeImage()}
                  />
                  <Button  color="secondary" variant="contained" component="span">
                    Upload Pro Stats (OPTIONAL)
                  </Button>
                </label>
                {image && <img style={{height: 50, marginLeft: 10}} src={image} alt={"Image"}/>}
                <span className={classes.imagePath}>{values.image && values.image.name}</span><br/>
                
            </div>
           </Grid>


           <Grid item xs={12}>
           <FormControl component="fieldset">
              <FormLabel component="legend">Are you able to talk via mic?</FormLabel>
              <RadioGroup  row aria-label="Mic" name="Mic1" value={mic} onChange={handleChangeMic}>
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
            </Grid>

           <Grid item xs={12}>
          <TextField
            label="How Did You Hear About Us?"
            type="text"
            variant="outlined"
            fullWidth
            autoFocus
            value={values.foundUs} onChange={handleChange('foundUs')}
          />
           </Grid>

           <Grid item xs={12}>
           <TextField
                id="outlined-multiline-static"
                label="Why Do You Want to Join Our Team?"
                multiline
                rows={3}
                value={values.reasons}
                onChange={handleChange('reasons')}
                fullWidth
                variant="outlined"
            />     
         </Grid>

         {values.error && (
            <Typography component="p" color="error">
              <Icon color="error" className={classes.error}>error</Icon>
              {values.error}
            </Typography>)
          }

          <Button className={classes.submit} onClick={clickSubmit} fullWidth variant="contained" color="primary" disabled={loading}>
          {loading && <div><CircularProgress size={14} />Loading</div>}
          {!loading && 'Submit'}
          </Button>
          </Grid>   
        </form>
        </div>
  
    <Dialog open={values.open} disableBackdropClick={true}>
        <DialogTitle>We will answer as soon as possible</DialogTitle>
        <DialogContent>
          <DialogContentText>
           The trial request was sent successfully!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose} color="primary" autoFocus="autoFocus" variant="contained">
              OK
            </Button>
        </DialogActions>
      </Dialog>
    </div>
    </div>
      )
  }
  
  
  