import React, {useState, useEffect }  from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import auth from './../auth/auth-helper'
import {publish, list} from './api-news.js'
import DeleteNews from './DeleteNews'
import CircularProgress from '@material-ui/core/CircularProgress';
import {Link} from 'react-router-dom'
import Logo from './../assets/images/prueba.svg'
import { commonFunctions } from "../_utilities/commonFunctions";

const useStyles = makeStyles(theme => ({
    heading: {
        marginBottom: theme.spacing(3),
        fontWeight: 200
    },
    root: {
        maxWidth: '100%',
        width: 350,
        margin: 10,
        [theme.breakpoints.down("xs")]: {
            width: '100%',
        }
    },
    media: {
        height: 200,
        [theme.breakpoints.down("xs")]: {
            height: 133.33
        }
    },
    cardsContainer: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexWrap: 'wrap',
        [theme.breakpoints.down("xs")]: {
            justifyContent: 'center'
        }
    },
    cardActions: {
        justifyContent: 'space-between',
        padding: 0,
        paddingLeft: 5,
        paddingRight: 5,
    },
    loadingCircular: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    date: {
        fontSize: '19px',
        [theme.breakpoints.down("xs")]: {
            position: 'absolute',
            fontSize: '19px',
            backgroundColor: 'black',
            color: 'white',
            top: 0,
            right: 0
        }
    },
    relative: {
        position: 'relative',
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
        [theme.breakpoints.down("xs")]: {
            padding: 2,
        }
    },

}))

export default function News() {
    const classes = useStyles()
    const jwt = auth.isAuthenticated()
    const [news, setNews] = useState()
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal

        list({t: jwt.token}, signal).then((data) => {
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

    const deleteNews = (playerId) => {
        setNews(news.filter(player => player._id !== playerId))
    }

    const markComplete = (index) => {  
        let updatedData = {}
        updatedData._id = news[index]._id
        updatedData.published = !news[index].published
  
        publish({
          t: jwt.token
        }, updatedData).then((data) => {
          if (data && data.error) {
            //setValues({...values, error: data.error})
          } else {
            console.log(data)
            let newArr = [...news]; // copying the old datas array
            newArr[index].published = data.published; // replace e.target.value with whatever you want to change it to
            setNews(newArr);
          }
        })
    }

    return(<div>
        <Typography variant="h4" gutterBottom>
         News
       </Typography>
    {!loading ?
    <div className={classes.cardsContainer}>
        {news && news.map((news,i) => {
            return (
                <div className={classes.relative} key={news._id}>
                <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                    className={classes.media}
                    image={news.image ? news.image : Logo}
                    title="News"
                    />
                    <CardContent>
                    <h3 className={classes.title}>
                        {news.title}
                    </h3>
                    </CardContent>
                </CardActionArea>
                <CardActions className={classes.cardActions}>
                    <Button onClick={() => markComplete(i)} variant={news.published ? 'contained' : 'outlined'} color="secondary">
                    {news.published ? "Published" : "Publish"}
                    </Button>
                    <Link to={"/news/"+news._id}>
                    <Button variant={ 'contained'} color="primary">See</Button>
                    </Link>
                    <DeleteNews newsId={news._id} deleteNews={deleteNews}/>
                    <div className={classes.date}>{commonFunctions.convertDateToString(new Date(news.created))}</div>
                </CardActions>
            </Card></div>)}
        ) }
    </div>
    : (
    <div className={classes.loadingCircular}>
    <CircularProgress size={64}/>
    </div>)}
    </div>
    )
}
