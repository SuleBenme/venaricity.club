import React, {useEffect, useState}  from "react";
import { makeStyles } from '@material-ui/core/styles';
import {list} from './api-history'
import Logo from './../assets/images/onlyLogo.png'
import {Link} from 'react-router-dom'
import Loading from "../components/Loading";

const useStyles = makeStyles(theme => ({
    wrapper: {
        marginTop: theme.spacing(10),
        marginBottom: theme.spacing(2),
        paddingLeft: 100,
        paddingRight: 100,
        [theme.breakpoints.down('sm')]: {
            paddingLeft: 60,
            paddingRight: 60
        },
        [theme.breakpoints.down('xs')]: {
            paddingLeft: 20,
            paddingRight: 20
        }
    },
    container: {
        marginTop: theme.spacing(2),
        display: 'grid',
        gridTemplateColumns: 'repeat(3,1fr)',
        gridColumnGap: '1.875rem',
        gridRowGap: '1.875rem',
        [theme.breakpoints.down('900')]: {
            gridTemplateColumns: 'repeat(2,1fr)',
        },
        [theme.breakpoints.down('xs')]: {
            gridTemplateColumns: 'repeat(1,1fr)',
        }
    },
    containerCard: {
        position: 'relative',
        width: '100%',
        maxWidth: '100%',
        margin: 0,
    },
    content: {
        display: 'block',
        textDecoration: 'none',
        overflow: 'hidden',
    },
    contentCard: {
        position: 'relative',
        paddingTop: '66.67%',
        overflow: 'hidden',
    },
    image:{
        backgroundRepeat: 'no-repeat',
        position: 'absolute',
        top: 0,
        left: 0,
        display: 'block',
        width: '100%',
        height: '100%',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundColor:' #fff',
        zIndex: 0,
    },
    header: {
        fontSize: '2.5rem',
        fontWeight: 700,
        fontStyle: 'normal',
        letterSpacing: '.3px',
        textTransform: 'uppercase',
        margin: '15px 0',
        [theme.breakpoints.down('xs')]: {
            fontSize: '1.8rem',
        }
    },
    name: {
        fontSize: '1.4rem',
        fontWeight: 700,
        fontStyle: 'normal',
        letterSpacing: '.3px',
        textTransform: 'uppercase',
        margin: '15px 0',
        textAlign: 'center'
    }
}))

export default function OneNews() {
    const classes = useStyles();
    const [history, setHistory] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal

        list(signal).then((data) => {
            if (data && data.error) {
                console.log(data.error)
            } else {
                console.log(data);
                setHistory(data)
                setLoading(false)
            }
        })
        return function cleanup(){
          abortController.abort()
        }
    }, [])
    
    return (
    <div className={classes.wrapper}>
        <h4 className={classes.header}>History</h4>
        {!loading ? 
        <div className={classes.container}>
            {history && history.map((history) => {
                return(
                    <div key={history._id} className={classes.containerCard}>
                        <Link to={"/history/"+history._id} className={classes.content} >
                            <div className={classes.contentCard}>
                                <div style={{backgroundImage: `url(${history.image ? history.image : Logo})` }} className={classes.image}/>
                            </div>
                        </Link>
                        <h4 className={classes.name}>{history.name}</h4>
                    </div>
                )
            })}
        </div>  
        : (<Loading/>)}
    </div>
)}
