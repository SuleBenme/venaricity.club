import React, {useState} from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Add from '@material-ui/icons/AddBox'
import {makeStyles} from '@material-ui/core/styles'
import {create} from './api-player.js'
import auth from './../auth/auth-helper'
import CircularProgress from '@material-ui/core/CircularProgress';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Alert from '@material-ui/lab/Alert';
import Flag from './Flag.js'
import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'

const useStyles = makeStyles(theme => ({
    form: {
        minWidth: 500,
        [theme.breakpoints.down("xs")]: {
          minWidth: 380,
        },
    },
    input: {
      display: 'none'
    },
    filename:{
      marginLeft:'10px'
    },
    formControl: {
      minWidth: 200,
      marginTop: theme.spacing(3),
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    chip: {
      margin: theme.spacing(0.5),
    },
    withoutLabel: {
      marginTop: theme.spacing(3),
    },
    root: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(0.5),
      },
      listStyleType: 'none',
    },
    reponsiveImage: {
      marginTop: theme.spacing(3),
      width: '100%',
      maxWidth: '400px',
      height: 'auto',
      display: 'block'
    },
    
}))

export default function NewPlayer(props) {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [chipData, setChipData] = useState([])

  const [values, setValues] = useState({
    generalPosition: '',
    image: '',
    name: '',
    specificPosition: '',
    kitNumber: '',
    country: '',
    errors: []
  })

  const [role, setRole] = useState(0)

  const handleRole = (event, newAlignment) => {
    setRole(newAlignment);
  }

  const handleDelete = (chipToDelete) => () => {
    setChipData(chipData.filter(chip => chipData.indexOf(chip) !== chipToDelete));
  }
  
  const handleChange = name => event => {
    const value = name === 'image'
      ? event.target.files[0]
      : event.target.value
    setValues({...values, [name]: value })
  }

  function validate(name, kitNumber, generalPosition) {
    // we are going to store errors for all fields
    // in a signle array
    const errors = [];
  
    if (name.length === 0) {
      errors.push("Name can't be empty");
    }
  
    if (kitNumber.length === 0) {
      errors.push("Kitnumber can't be empty");
    }

    if (generalPosition.length === 0) {
      errors.push("General position can't be empty");
    }
    return errors;
  }
  
  const clickSubmit = () => {
    const jwt = auth.isAuthenticated()
    setLoading(true)
    values.specificPosition = chipData

    const errors = validate(values.name, values.kitNumber, values.generalPosition);
    if (errors.length > 0) {
      setValues({...values, errors: errors})
      setLoading(false)
      return;
    }

    let playerData = new FormData()
    values.name && playerData.append('name', values.name)
    values.generalPosition && playerData.append('generalPosition', values.generalPosition)
    values.image && playerData.append('image', values.image)
    values.specificPosition && playerData.append('specificPosition', JSON.stringify(values.specificPosition))
    values.kitNumber && playerData.append('kitNumber', values.kitNumber)
    role && playerData.append('role', role)
    values.country && playerData.append('country', JSON.stringify(values.country))

    //console.log(values)

    create( playerData, {t: jwt.token}).then((data) => {
      if (data && data.error) {
        setValues({...values, error: data.error})
      } else {
          console.log(data);
          setValues({...values, name: '', generalPosition: '', specificPosition: '', kitNumber: '', country: '', image: ''})
          setChipData([])
          props.addPlayer(data)
          setOpen(false)
      }
      setLoading(false)
    })
  }

  const addPosition = () => {
    setChipData([...chipData, position])
    setPosition('')
  }
  const addCountry = (country, countryCode) => {
    setValues({ ...values, country: {name: country, countryCode: countryCode}})
  }
  
  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setLoading(false)
  }
  return (
    <div>
      <Button aria-label="Add Lesson" color="primary" variant="contained" onClick={handleClickOpen}>
        <Add/> &nbsp; New Player
      </Button>
      <Dialog open={open} onClose={handleClose} disableBackdropClick={loading} aria-labelledby="form-dialog-title">
      <div className={classes.form}>
        <DialogTitle id="form-dialog-title">Add New Player</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            value={values.name} onChange={handleChange('name')}
          /><br/>
          
          <label htmlFor="upload-photo">
            <input
            style={{ display: 'none' }}
            id="upload-photo"
            name="upload-photo"
            type="file"
            onChange={handleChange('image')}
            />
            <Button className={classes.withoutLabel} color="secondary" variant="contained" component="span">
              Upload Image
            </Button>
          </label><span><img className={classes.reponsiveImage} src={values.image && URL.createObjectURL(values.image)}></img>{values.image ? values.image.name : ''}</span><br/>

          <Flag addCountry={addCountry}/>

          {console.log(values.image)}

          <TextField
            margin="dense"
            label="Kit Number"
            type="text"
            fullWidth
            value={values.kitNumber} onChange={handleChange('kitNumber')}
          /><br/><br/>
           
          <ToggleButtonGroup
            value={role}
            exclusive
            onChange={handleRole}
            aria-label="text alignment"
          >
            <ToggleButton value={0} aria-label="left aligned">
              First Team 
            </ToggleButton>
            <ToggleButton value={1} aria-label="centered">
              Academy
            </ToggleButton>
            <ToggleButton value={2} aria-label="centered">
              Staff
            </ToggleButton>
            <ToggleButton value={3} aria-label="centered">
              Archive
            </ToggleButton>
          </ToggleButtonGroup><br/>
          
          <FormControl variant="filled" className={classes.formControl}>
            <InputLabel id="demo-simple-select-filled-label">General Position</InputLabel>
            <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={values.generalPosition}
            onChange={handleChange('generalPosition')}
          >
            <MenuItem value={'forward'}>Forward</MenuItem>
            <MenuItem value={'midfielder'}>Midfielder</MenuItem>
            <MenuItem value={'defender'}>Defender </MenuItem>
            <MenuItem value={'goalkeeper'}>Goalkeeper </MenuItem>
           </Select>
         </FormControl>
          <br/>
          <TextField className={classes.withoutLabel}
            margin="dense"
            label="Specific Position"
            type="text"
            rows="5"
            fullWidth
            value={values.specificPosition} onChange={handleChange('specificPosition')}
            InputProps={{endAdornment: 
              <InputAdornment position="end">
              <IconButton onClick={addPosition}>
                <AddIcon />
              </IconButton>
              </InputAdornment>
              }}
          /><br/>
          <div className={classes.root}>
          {chipData && chipData.map((position,i) => {
            return (
            <span key={i}>
              <Chip
              label={position}
              onDelete={handleDelete(i)}
              className={classes.chip}
              />
              </span>
              );
          })}
          </div>
        </DialogContent>

          {values.errors.map(error => (
          <Alert key={error} severity="error">{error}
          </Alert>  
          ))}

        <DialogActions>
          <Button onClick={handleClose} color="primary" variant="contained" disabled={loading}>
            Cancel
          </Button>
          <Button onClick={clickSubmit} color="secondary" variant="contained" disabled={loading}>
          {loading && <div><CircularProgress size={14} />Loading</div>}
          {!loading && 'Add'}
          </Button>
        </DialogActions>
        </div>
      </Dialog>
    </div>
  )
}
