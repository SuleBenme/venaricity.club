import React, {useState}  from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import auth from './../auth/auth-helper'
import {create} from './api-rule.js'
import { Editor } from '@tinymce/tinymce-react';

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
    history: {
        display: 'block',
        //height: 280,
    },
    textarea: {
        resize: 'none',
        width: '100%',
        height: '100%',
        fontSize: 20,
        //padding: 0,
        //margin: 0,
        boxSizing: 'border-box',
        fontFamily: 'Dosis',
    }
}))

export default function CreateRule(props) {
    const classes = useStyles()
    const jwt = auth.isAuthenticated()
    const [loading, setLoading] = useState(false)
    const [values, setValues] = useState({
        content: '',
        errors: []
    })

    const clickSubmit = () => {
        if(!values.content){
            //setValues({ ...values, error: "Fill in the required text fields"})
            alert("Fill in the editor field")
            return;
        } 
        setLoading(true)

        const rule = {
            content: values.content || undefined,
        }
    
        create( rule, {t: jwt.token}).then((data) => {
          if (data && data.error) {
              setValues({...values, error: data.error})
          } else {
              console.log(data);
              setValues({...values, content: ''})
              props.addRule(data)
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
        initialValue="<p>This is the initial content of the editor</p>"
        init={{
        height: 280,
        menubar: false,
        plugins: [
            'advlist textcolor autolink lists link image charmap print preview anchor',
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
    <Button  onClick={clickSubmit} variant="contained" color="primary" disabled={loading}> 
    {loading ? 'Wait...' : 'Create'}
    </Button>
    </>
    )
}
