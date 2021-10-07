import React, {useState, useEffect}  from "react";
import { makeStyles } from '@material-ui/core/styles';
import {list} from './api-rule.js'
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

return(
     <div className={classes.wrapper}>
        <h1 className={classes.title}>
            Rules
        </h1>
        <hr/>
        {!loading ? 
        <>
            {rules.content !== undefined &&
                <div dangerouslySetInnerHTML={{__html: rules.content}}/>
            }
        </>
        : <Loading/> }
    </div>
    )
}