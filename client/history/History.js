import React, {useEffect, useState}  from "react";
import { makeStyles } from '@material-ui/core/styles';
import {list} from './api-history.js'
import Logo from './../assets/images/onlyLogo.png'
import NewHistory from './NewHistory'
import RemoveHistory from './DeleteHistory'
import {Link} from 'react-router-dom'
import UpdateHistory from './UpdateHistory'

const useStyles = makeStyles(theme => ({
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
    delete: {
        position: 'absolute',
        top: 0,
        right: 0
    },
    header: {
        fontSize: '2.5rem',
        fontWeight: 700,
        fontStyle: 'normal',
        letterSpacing: '.3px',
        textTransform: 'uppercase',
        margin: '15px 0',
        [theme.breakpoints.down('xs')]: {
            fontSize: '1.5rem',
        }
    },
    action: {
        position: 'absolute', 
        right: 0, 
        top: 0, 
        display: 'flex',
        padding: 0, 
        zIndex: 1
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

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal

        list(signal).then((data) => {
            if (data && data.error) {
                console.log(data.error)
            } else {
                console.log(data);
                setHistory(data)
            }
        })
    
        return function cleanup(){
          abortController.abort()
        }

    }, [])

    const addHistory = (newHistory) => {
        setHistory([newHistory, ...history])
    }
    const deleteHistory = (historyId) => {
        setHistory(history.filter(history => history._id !== historyId))
    }

    const updateHistory = (updatedPartner, oldType) => {
        
    const newList = history.map((item) => {
        if (item._id === updatedPartner._id) {
            return updatedPartner;
        }
        return item;
    });
    setHistory(newList)
    }

return(
    <>
    <NewHistory addHistory={addHistory}/>
    <hr/>
    <div className={classes.container}>
        {history && history.map((history) => {
            return(
                <div key={history._id} className={classes.containerCard}>
                    <div className={classes.action}>
                        <UpdateHistory updateHistory={updateHistory} history={history} />
                        <RemoveHistory historyId={history._id} deleteHistory={deleteHistory}/>
                    </div>
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
    </>
)}
