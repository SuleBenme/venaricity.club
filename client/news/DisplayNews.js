import React, {useState, useEffect}  from "react";
import { makeStyles } from '@material-ui/core/styles';
import {read} from './api-news.js'
import ScheduleIcon from '@material-ui/icons/Schedule';
import { commonFunctions } from "../_utilities/commonFunctions.js";
import Loading from "../_utilities/loading.js";

const useStyles = makeStyles(theme => ({
    container: {
        marginTop: theme.spacing(10),
        fontFamily: 'Lucida Console, Courier, monospace',
        maxWidth: '700px',
        margin: '0 auto',
        padding: '1rem'
    },
    header: {
        borderBottom: 'solid 1px #BABABA',
        paddingBottom: '1.2rem',
    },
    title: {
        fontSize: '2.75rem',
        lineHeight: '3rem'
    },

    imagenPrueba: {
        paddingTop: '1rem',
        paddingBottom: '1rem',
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: '100%',
        maxHeight: 700,
        display: 'block',
    },
    inline: {
        display: 'flex',
        alignItems: 'center',
        margin: 3,
        color: '#696969'
    } 
}))

export default function DisplayNews({match}) {
    const classes = useStyles();
    const [news, setNews] = useState();
    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
        
        read({newsId: match.params.newsId}, signal).then((data) => {
          if (data && data.error) {
            alert(data.error)
          } else {
            setNews(data)
          }
        })
    
        return function cleanup(){
          abortController.abort()
        }
    }, [])

    
return(<div className={classes.container}>
    {news ? 
    <div>
        <div className={classes.header}>
            <div className={classes.title}>
                {news.title}
            </div>
            <div className={classes.inline}>
                <span><ScheduleIcon/></span>
                <span>{commonFunctions.convertDateToString(new Date(news.created))}</span>
            </div>
        </div>
        <img className={classes.imagenPrueba} src={news.image}/>
        
        <div dangerouslySetInnerHTML={{__html:news.content}}/>

    </div>
    : <Loading/>
    }
</div>
)}
