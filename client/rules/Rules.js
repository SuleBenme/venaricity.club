import React, {useState, useEffect}  from "react";
import { makeStyles } from '@material-ui/core/styles';
import {list} from './api-rule.js'
import auth from './../auth/auth-helper'
import Typography from '@material-ui/core/Typography'
import Loading from '../components/Loading'
import UpdateRules from './UpdateRules'

const useStyles = makeStyles(theme => ({
    text: {
        marginBottom: theme.spacing(2),
        [theme.breakpoints.down("xs")]: {
            fontSize: "1.5rem",
        }
    }, 
}))

export default function Rules() {
    const classes = useStyles();
    const [loading, setLoading] = useState(true)
    const [rules, setRules] = useState({})

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal

        list(signal).then((data) => {
            if (data && data.error) {
                console.log(data.error)
            } else {
                //console.log(data)
                setLoading(false)
                setRules(data)
            }
        })
        return function cleanup(){
            abortController.abort()
        }
    }, [])

return(<div>
    <Typography variant="h4" className={classes.text}>
        Rules
    </Typography>
    <hr/>
    
    {rules.content && <UpdateRules content={rules.content} />}

    {loading && <Loading/>}

</div>)
}