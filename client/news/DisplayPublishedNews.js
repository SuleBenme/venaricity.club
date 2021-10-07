import React, {useState, useEffect, Fragment }  from "react";
import { makeStyles,useTheme  } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Typography from '@material-ui/core/Typography';
import {listPublished} from './api-news.js'
import CircularProgress from '@material-ui/core/CircularProgress';
import NewsSwiper from './NewsSwiper'

const useStyles = makeStyles(theme => ({
    heading: {
        //marginBottom: theme.spacing(2),
        fontWeight: 200
    },
    root: {
        flexShrink: 0,
        flexGrow: 1,
        flexBasis:'300px',
        margin: 10,
        [theme.breakpoints.down("xs")]: {
            width: 250,
        }
    },
    media: {
        height: 150,
        [theme.breakpoints.down("xs")]: {
            margin: 0
        }
    },
    cardsContainer: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        position: 'relative',
        width: '100%',
        height: '100%',
        flexWrap: 'wrap',
    },
    cardActions: {
        justifyContent: 'space-between',
    },
    title: {
        fontFamily: 'Arial,Helvetica,sans-serif',
        fontWeight: 500,
        fontStyle: 'normal',
        letterSpacing: '3px',
        textTransform: 'uppercase',
        fontSize: '1.125rem',
        overflow: 'hidden',
        margin: 0,
        whiteSpace: 'normal',
        wordBreak: 'break-all',
        display: '-webkit-box',
        '-webkit-line-clamp': 2,
        '-webkit-box-orient': 'vertical',
        height: 42,
    },
    loadingCircular: {
        height: 293,
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
    },

    inline: {
        display: 'flex',
        alignItems: 'center',
        margin: 3,
        color: '#696969',
        fontFamily: 'Lucida Console, Courier, monospace',
        fontSize: '1rem'
    } 
}))

export default function DisplayPublishedNews() {
    const classes = useStyles()
    const [news, setNews] = useState([])
    const [loading, setLoading] = useState(true)
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('xs'));
    
    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal

        listPublished(signal).then((data) => {
          if (data && data.error) {
            console.log(data.error)
          } else {
            setNews(data)
            setLoading(false)
          }
        })
    
        return function cleanup(){
          abortController.abort()
        }
    }, [])

    return(<>
        {!loading ?
        <div>
        {matches && <NewsSwiper news={news}/>}

        {!matches && <NewsSwiper news={news}/>}
        </div>
        : (
            <div className={classes.loadingCircular}>
                <CircularProgress size={64}/>
            </div>)}
        </>
    )
}
