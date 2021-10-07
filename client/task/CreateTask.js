import React, {useState}  from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField'
import Divider from '@material-ui/core/Divider';
import {create} from './api-task'
import CircularProgress from '@material-ui/core/CircularProgress';
import auth from './../auth/auth-helper'

const useStyles = makeStyles(theme => ({
    heading: {
        marginBottom: theme.spacing(3),
        fontWeight: 200
    },
    root: {
        //maxWidth: 500,
        //width: '100%',
    },
   
    divider: {
        marginBottom: theme.spacing(1)
    },
    text: {
        marginBottom: theme.spacing(2),
        [theme.breakpoints.down("xs")]: {
            fontSize: "1.5rem",
        }
    },
    clickSubmit: {
        marginTop: theme.spacing(3),
    },
    textField: {
        marginTop: theme.spacing(1)
    },
    actionArea: {
        "&:hover $focusHighlight": {
          opacity: 0
        }
    },
    focusHighlight: {}
}))

export default function CreatTask(props) {
    const classes = useStyles();
    const [loading, setLoading] = useState(false)
    const [values, setValues] = useState({
        name: '',
        description: '',
        postedBy: '',
        errors: []
    })
    
    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
    }

    const clickSubmit = () => {
        setLoading(true)
        const jwt = auth.isAuthenticated()
        values.postedBy = auth.isAuthenticated().user._id
        console.log(auth.isAuthenticated().user)

        const task = {
            name: values.name || undefined,
            description: values.description || undefined,
        }

        console.log(values)
    
        create( task, {t: jwt.token}).then((data) => {
          if (data && data.error) {
              setValues({...values, error: data.error})
          } else {
              console.log(data);
              setValues({...values, name: '', description: ''})
              props.addTask(data)
          }
        setLoading(false)
        })
    }
    

return(
        <Card className={classes.root}>
            <CardActionArea
            classes={{
                root: classes.actionArea,
                focusHighlight: classes.focusHighlight
              }}>
                <CardContent className={classes.prueba}>
                <Typography variant="h5" gutterBottom>
                    Create Task
                </Typography>
                <TextField
                id="outlined-basic"
                label="Name"
                type="text"
                variant="outlined"
                required
                fullWidth
                value={values.name} onChange={handleChange('name')}
                />
                <TextField
                id="outlined-multiline-static"
                label="Description"
                multiline
                rows={3}
                onChange={handleChange('description')}
                fullWidth
                variant="outlined"
                className={classes.textField}
                />
                </CardContent>
            </CardActionArea>
            <CardActions>
            <Button onClick={clickSubmit} variant="contained" color="primary" disabled={loading}> 
                {loading && <div><CircularProgress size={14}/>Loading</div>}
                {!loading && 'Submit'}
            </Button>
            </CardActions>
        </Card> 
        )
}
