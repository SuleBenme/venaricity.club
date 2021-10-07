import React, {useEffect, useState}  from "react";
import { makeStyles } from '@material-ui/core/styles';
import {list, create} from './api-about.js'
import UpdateAbout from './UpdateAbout'
import Typography from '@material-ui/core/Typography'
import Loading from '../components/Loading'

const useStyles = makeStyles(theme => ({
    text: {
        marginBottom: theme.spacing(2),
        [theme.breakpoints.down("xs")]: {
            fontSize: "1.5rem",
        }
    },
}))
export default function About() {
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
    <>
        <Typography variant="h4" className={classes.text}>
            About us
        </Typography>
        <hr/>
        {!loading ? 
        <>
            {about.content !== undefined &&
                <UpdateAbout content={about.content}/>
            }
        </>
        : <Loading/> }
    </>
)}
