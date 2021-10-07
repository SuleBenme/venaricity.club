import React, {useState, useEffect}  from "react";
import { makeStyles } from '@material-ui/core/styles';
import {read} from './api-history.js'
import Logo from '../assets/images/onlyLogo.png'

const useStyles = makeStyles(theme => ({
    container: {
        marginTop: theme.spacing(10),
        maxWidth: 600,
        margin: 'auto',
        paddingLeft: 20,
        paddingRight: 20,
        [theme.breakpoints.down('xs')]: {
          paddingLeft: 10,
          paddingRight: 10,
        }
    },
    header: {
        fontSize: '2.5rem',
        color: '#3861fb',
        fontWeight: 700,
        fontStyle: 'normal',
        letterSpacing: '.3px',
        textTransform: 'uppercase',
        margin: '15px 0'
    },
    image: {
        margin: '0 auto',
        maxHeight: 400,
        maxWidth: '100%',
        display: 'block',
        verticalAlign: 'middle',
    },
    text: {
      whiteSpace: 'pre-wrap', 
      lineHeight: '30px', 
      fontSize: '1.2rem',
  }
}))

export default function Displayhistory({match}) {
    const classes = useStyles();
    const [history, setHistory] = useState()

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
        
        read({historyId: match.params.historyId}, signal).then((data) => {
          if (data && data.error) {
            console.log(data.error)
          } else {
            setHistory(data)
          }
        })
        return function cleanup(){
          abortController.abort()
        }
    }, [])


    return(
    <div className={classes.container}>
        {history && <>
        <h4 className={classes.header}>{history.name}</h4>
        <img className={classes.image} src={history.image ? history.image : Logo} alt={history.name}/>
        <p className={classes.text}>{history.content}</p>
        </>
        }
    </div>
)}
