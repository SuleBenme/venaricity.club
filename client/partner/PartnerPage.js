import React, {useState, useEffect}  from "react";
import { makeStyles } from '@material-ui/core/styles';
import {read} from './api-partner.js'
import Button from '@material-ui/core/Button'
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

export default function DisplayPartner({match}) {
    const classes = useStyles();
    const [partner, setPartner] = useState()

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
        
        read({partnerId: match.params.partnerId}, signal).then((data) => {
          if (data && data.error) {
            console.log(data.error)
          } else {
            //console.log(data)
            setPartner(data)
          }
        })
    
        return function cleanup(){
          abortController.abort()
        }
    }, [])

    //console.log(partner)

    return(
    <div className={classes.container}>
        {partner && <>
        <h4 className={classes.header}>{partner.name}</h4>
        <img className={classes.image} src={partner.image ? partner.image : Logo} alt={partner.name}/>
        {partner.link &&
        <a style={{display: 'block', textAlign: 'center', margin: 10}} href={partner.link} target="_blank">
            <Button variant="contained" color="primary">Visit Website</Button>
        </a>
        }
        <p className={classes.text}>{partner.description}</p>
        </>
        }
    </div>
)}
