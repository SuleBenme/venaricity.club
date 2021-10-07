import React, {useState}  from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField'
import {create} from './api-report'
import CircularProgress from '@material-ui/core/CircularProgress';
import Icon from '@material-ui/core/Icon'

const useStyles = makeStyles(theme => ({
    heading: {
        marginBottom: theme.spacing(3),
        fontWeight: 200
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
        errors: ''
    })

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
    }

    const clickSubmit = () => {
        if(!values.name){
            setValues({ ...values, error: "Fill in the required text field"})
            return;
        } 
        setLoading(true)

        const task = {
            name: values.name || undefined,
            description: values.description || undefined,
        }

        create( task).then((data) => {
          if (data && data.error) {
              setValues({...values, error: data.error})
          } else {
              //console.log(data);
              setValues({...values, error: '', name: '', description: ''})
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
                    Report Bug
                </Typography>
                <TextField
                id="outlined-basic"
                label="Description"
                type="text"
                variant="outlined"
                required
                fullWidth
                value={values.name} onChange={handleChange('name')}
                />
                <TextField
                id="outlined-multiline-static"
                label="Detailed description"
                multiline
                rows={3}
                value={values.description}
                onChange={handleChange('description')}
                fullWidth
                variant="outlined"
                className={classes.textField}
                />
                </CardContent>
            </CardActionArea>
            <CardActions>
            {values.error && (
            <Typography component="p" color="error">
              <Icon color="error" className={classes.error}>error</Icon>
              {values.error}
            </Typography>)
            }
            <Button onClick={clickSubmit} variant="contained" color="primary" disabled={loading}> 
            {loading && <div><CircularProgress size={14}/>Loading</div>}
            {!loading && 'Submit'}
            </Button>
            </CardActions>
        </Card> 
        )
}