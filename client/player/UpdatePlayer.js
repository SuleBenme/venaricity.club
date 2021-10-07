import React, {useState} from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import {makeStyles} from '@material-ui/core/styles'
import {update} from './api-player.js'
import auth from './../auth/auth-helper'
import Edit from '@material-ui/icons/Edit'
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import Flag from './Flag.js'

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
      marginTop: theme.spacing(3),
      minWidth: 200,
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
      margin: '0 auto',
     // width: '100%',
      maxHeight: '250px',
      display: 'block'
    },
}))

export default function NewLesson(props) {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [values, setValues] = useState(props.player)
  const [position, setPosition] = useState('')
  const [chipData, setChipData] = useState(props.player.specificPosition)
  const [imagen, setImage] = useState(false)
  const [role, setRole] = useState(String(props.player.role))
  
  const handleRole = (event, new_role) => {
    setRole(new_role);
  }
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
  }
  const handleChangeImage = name => event => {
    setImage(true)
    setValues({...values, [name]: event.target.files[0] })
  }

  const clickSubmit = () => {
    const jwt = auth.isAuthenticated()
    setLoading(true)
    values.specificPosition = chipData
    let playerData = new FormData()
    values._id && playerData.append('_id', values._id)
    values.name && playerData.append('name', values.name)
    values.role_description && playerData.append('role_description', values.role_description)
    values.generalPosition && playerData.append('generalPosition', values.generalPosition)
    values.image && playerData.append('image', values.image)
    values.specificPosition && playerData.append('specificPosition', JSON.stringify(values.specificPosition))
    values.kitNumber && playerData.append('kitNumber', values.kitNumber)
    role && playerData.append('role', role)
    values.country && playerData.append('country', JSON.stringify(values.country))

    update( playerData, {t: jwt.token}).then((data) => {
      if (data && data.error) {
        setValues({...values, error: data.error})
      } else {
        props.updatePlayer(data)
        setValues({...values, name: '', generalPosition: '', specificPosition: '', kitNumber: '', country: ''})
        setPosition('')
        setImage('')
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
  const handleDelete = (chipToDelete) => () => {
    setChipData(chipData.filter(chip => chipData.indexOf(chip) !== chipToDelete));
  }

  return (
    <div>
       <IconButton aria-label="Edit" color="primary" onClick={handleClickOpen}>
              <Edit fontSize="large"/>
       </IconButton>

      <Dialog open={open} onClose={handleClose} disableBackdropClick={loading} aria-labelledby="form-dialog-title">
      <div className={classes.form}>
        <DialogTitle id="form-dialog-title">Update Player</DialogTitle>
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
            onChange={handleChangeImage('image')}
            />
            <Button className={classes.withoutLabel} color="secondary" variant="contained" component="span">
              Upload Image
            </Button>
          </label><span><img className={classes.reponsiveImage} src={values.image !== '' && (imagen ? URL.createObjectURL(values.image) : values.image)}></img>{values.image ? values.image.name : ''}</span><br/>

          <Flag addCountry={addCountry} updateCountry={values.country && values.country.name}/>

          <TextField className={classes.withoutLabel}
            margin="dense"
            label="Kit Number"
            type="text"
            fullWidth
            value={values.kitNumber} onChange={handleChange('kitNumber')}
          /><br/>
          
          <ToggleButtonGroup
            className={classes.withoutLabel}
            value={role}
            exclusive
            onChange={handleRole}
            aria-label="toggle"
          >
            <ToggleButton value={"0"} aria-label="first team">
              First Team 
            </ToggleButton>
            <ToggleButton value={"1"} aria-label="academy">
              Academy
            </ToggleButton>
            <ToggleButton value={"2"} aria-label="staff">
              Staff
            </ToggleButton>
            <ToggleButton value={"3"} aria-label="archive">
              Archive
            </ToggleButton>
          </ToggleButtonGroup><br/>

          {role == 2 &&
            <TextField className={classes.withoutLabel}
            margin="dense"
            label="Role Description"
            type="text"
            fullWidth
            value={values.role_description} onChange={handleChange('role_description')}
          />
          }

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
         </FormControl><br/>

          <TextField className={classes.withoutLabel}
            margin="dense"
            label="Specific Position"
            type="text"
            rows="5"
            fullWidth
            value={position} onChange={e => setPosition(e.target.value)}
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
            <li key={i}>
              <Chip
              label={position}
              onDelete={handleDelete(i)}
              className={classes.chip}
              />
              </li>
              );
          })}
          </div>
          
        </DialogContent>
        
        <DialogActions>
          <Button onClick={handleClose} color="primary" variant="contained" disabled={loading}>
            Cancel
          </Button>
          <Button onClick={clickSubmit} color="secondary" variant="contained" disabled={loading}>
          {loading ? 'Loading' : 'Update'}
          </Button>
        </DialogActions>
        </div>
      </Dialog>
    </div>
  )
}
