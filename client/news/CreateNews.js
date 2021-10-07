import React, {useState}  from "react";
import { Editor } from '@tinymce/tinymce-react';
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
import auth from './../auth/auth-helper'
import {create} from './api-news.js'
import Logo from './../assets/images/prueba.svg'
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
    heading: {
        marginBottom: theme.spacing(3),
        fontWeight: 200
    },
    root: {
        maxWidth: 345,
        minWidth: 345,
        [theme.breakpoints.down("xs")]: {
            maxWidth: 230,
            minWidth: 230,
        }
    },
    media: {
        height: 200,
        [theme.breakpoints.down("xs")]: {
            height: 133.33
        }
    },
    firstContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        marginBottom: '1rem',
        [theme.breakpoints.down("1040")]: {
            justifyContent: 'center'
        }
    },
    uploadContainer: {
        margin: 20,
        width: '300px'
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
    imagePath: {
        padding: 2,
        fontSize: 18,
    },
    title: {
        position: 'relative',
        fontFamily: 'Arial,Helvetica,sans-serif',
        fontWeight: 500,
        fontStyle: 'normal',
        letterSpacing: '3px',
        textTransform: 'uppercase',
        fontSize: '1.125rem',
        overflow: 'hidden',
        margin: 0,
        whiteSpace: 'normal',
        wordBreak: 'break-all',
        display: '-webkit-box',
        width: 300,
        '-webkit-line-clamp': 2,
        '-webkit-box-orient': 'vertical',
        height: 42,
    },
   
}))
export default function OneNews() {
    const classes = useStyles();
    const [image, setImage] = useState('')
    const [loading, setLoading] = useState(false)
    const [values, setValues] = useState({
        title: '',
        content: '',
        image: '',
        errors: []
    })
    
    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
    }
    
    const handleChangeImage = () => event => {
        console.log(event.target.files[0])
        //Save file
        setValues({ ...values, image: event.target.files[0] })
        //Create an image to show
        setImage(URL.createObjectURL(event.target.files[0]))
    }    

    const handleEditorChange = (content, editor) => {
        setValues({...values, content: content})
        console.log('Content was updated:', content);
    }

    const clickSubmit = () => {
        setLoading(true)
        const jwt = auth.isAuthenticated()
    
        let newsData = new FormData()
        values.title && newsData.append('title', values.title)
        values.content && newsData.append('content', values.content)
        values.image && newsData.append('image', values.image)

        console.log(values)
    
        create( newsData, {t: jwt.token}).then((data) => {
          if (data && data.error) {
              setValues({...values, error: data.error})
          } else {
              console.log(data);
              setLoading(false)
              setValues({...values, title: '', content: '', image: ''})
          }
        })
    }
    

return(<div>
    <Typography variant="h4" className={classes.text}>
        Choose a title and image
    </Typography>
        <div className={classes.firstContainer}>
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
              Upload Image
            </Button>
        </label><span className={classes.imagePath}>{values.image && values.image.name}</span><br/>

        <Divider className={classes.divider} variant="middle" />

        <TextField
          id="filled-multiline-static"
          label="Title"
          multiline
          rows={4}
          onChange={handleChange('title')}
          fullWidth
          defaultValue="Title"
          variant="filled"
          className={classes.textField}
        />
        </div>

        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                className={classes.media}
                image={values.image ? image : Logo}
                title="Contemplative Reptile"
                />
                <CardContent className={classes.prueba}>
                <h3 className={classes.title}>
                    {values.title ? values.title : "Title"} 
                </h3>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                Share
                </Button>
                <Button size="small" color="primary">
                Learn More
                </Button>
            </CardActions>
        </Card> 
    </div>
    <Typography variant="h4" className={classes.text}>
        Write the content of the news
    </Typography>
    <div className={classes.editor}>
        <Editor 
         initialValue="<p>This is the initial content of the editor</p>"
         init={{
           height: 500,
           menubar: false,
           plugins: [
             'advlist autolink lists link image charmap print preview anchor',
             'searchreplace visualblocks code fullscreen',
             'insertdatetime media table paste code help wordcount'
           ],
           toolbar:
             'undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help'
         }}
        onEditorChange={handleEditorChange}
        />
       </div>
       <Button className={classes.clickSubmit} onClick={clickSubmit} variant="contained" color="primary" disabled={loading}> 
        {loading && <div><CircularProgress size={14}/>Loading</div>}
        {!loading && 'Submit'}
       </Button>
</div>)
}
