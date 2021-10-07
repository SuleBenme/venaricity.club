import React, {useState}  from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import auth from './../auth/auth-helper'
import {update} from './api-rule'
import { Editor } from '@tinymce/tinymce-react';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles(theme => ({
    heading: {
        marginBottom: theme.spacing(3),
        fontWeight: 200
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
}))

export default function UpdateRules(props) {
    const classes = useStyles()
    const jwt = auth.isAuthenticated()
    const [loading, setLoading] = useState(false)
    const [show, setShow] = useState(false)
    const [values, setValues] = useState({
        content: props.content,
        errors: []
    })

    console.log(props.content)

    const clickSubmit = () => {
        if(!values.content){
            alert("Fill in the editor field")
            return;
        } 
        setShow(false)
        setLoading(true)

        const content = {
            content: values.content || undefined,
        }
    
        update( content, {t: jwt.token}).then((data) => {
          if (data && data.error) {
              setValues({...values, error: data.error})
          } else {
              console.log(data);
              setValues({...values, content: ''})
              setShow(true)
          }
          setLoading(false)
        })
    }

    const handleEditorChange = (content, editor) => {
        setValues({...values, content: content})
        //console.log('Content was updated:', content);
    }
return(<>
    <div className={classes.history}>
    <Editor 
        apiKey="tpp29vihoay4jemwph6ce1mu6ipecbvvjiak6qukwptc0otn"
        initialValue={props.content} 
        init={{
        height: 300,
        menubar: false,
        plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'media table paste code help wordcount'
        ],
        
        toolbar:
            'undo redo | formatselect fontsizeselect| forecolor | bold italic backcolor | \
            alignleft aligncenter alignright alignjustify | \
            bullist numlist outdent indent | removeformat | help'
        }}
        onEditorChange={handleEditorChange}
        />
    </div>
    <br/>
    {show && <Alert style={{marginBottom: 15}} severity="success">The content was successfully saved</Alert>}
    <Button  onClick={clickSubmit} variant="contained" color="primary" disabled={loading}> 
    {loading ? 'Wait...' : 'Save'}
    </Button>
    </>
    )
}
