import React, {useEffect, useState}  from "react";
import { makeStyles } from '@material-ui/core/styles';
import {list} from './api-about.js'
import Loading from '../components/Loading'

const useStyles = makeStyles(theme => ({
    wrapper: {
        maxWidth: 500,
        width: '100%',
        margin: 'auto',
        marginTop: theme.spacing(10),
    },
    title: {
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#3861fb',
        fontSize: '38px',
        [theme.breakpoints.down("xs")]: {
          textAlign: 'center',
          fontSize: '31px',
        }
    },
}))
export default function DisplayAboutUs() {
    const classes = useStyles();
    const [about, setAbout] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal

        list(signal).then((data) => {
            if (data && data.error) {
                console.log(data.error)
            } else {
                console.log(data);
                setAbout(data)
                setLoading(false)
            }
        })
    
        return function cleanup(){
          abortController.abort()
        }

    }, [])

return(
    <div className={classes.wrapper}>
        <h1 className={classes.title}>
            About us
        </h1>
        <hr/>
        {!loading ? 
        <>
            {about.content !== undefined &&
                <div dangerouslySetInnerHTML={{__html: about.content}}/>
            }
        </>
        : <Loading/> }
    </div>
)}
