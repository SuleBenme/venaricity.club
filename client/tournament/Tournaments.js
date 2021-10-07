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
import {listNotSignedIn,  addParticipant} from './api-tournament.js'
import CircularProgress from '@material-ui/core/CircularProgress';
import {Link} from 'react-router-dom'
import Logo from './../assets/images/prueba.png'
import Trophy from './../assets/images/trophy.svg'
import ScheduleIcon from '@material-ui/icons/Schedule';
import Calendar from 'react-calendar';
import Skeleton from '@material-ui/lab/Skeleton';
import './css.css'

const useStyles = makeStyles(theme => ({
    tournamentContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
      [theme.breakpoints.down("xs")]: {
        flexWrap: 'wrap'
      }
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
    },
    trophy: {
      width: 140,
      marginRight: 20,
      [theme.breakpoints.down("1058")]: {
        width: 100,
      }
    },
    media: {
      height: 120,
      [theme.breakpoints.down("1058")]: {
        height: 70,
      }
    },
    root: {
      //flexGrow: 2,
      //flexShrink: 0,
      //flexBasis: '750px',
      //marginRight: 60,
      [theme.breakpoints.down("1058")]: {
        //margin: 0,
        //marginBottom: 30,
        //flexBasis: '300px',
      }
    },
    cardsContainer: {
        //display: 'flex',
        //justifyContent: 'center',
        //alignItems: 'center',
        //flexWrap: 'nowrap',
        //marginBottom: 20,
        [theme.breakpoints.down("1058")]: {
          //flexWrap: 'wrap'
        }
    },
    cardActions: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    loadingCircular: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    inline: {
        display: 'flex',
        alignItems: 'center',
        margin: 3,
        color: '#696969',
        fontFamily: 'Lucida Console, Courier, monospace',
        fontSize: '1rem'

    },

    tournament: {
      backgroundColor: '#ff9b99'
    }
}))

export default function DisplayTournament() {
    const classes = useStyles()
    const [tournaments, setTournaments] = useState()
    const [dates, setDates] = useState([])
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal

        listNotSignedIn(signal).then((data) => {
          if (data && data.error) {
            console.log(data.error)
          } else {
            setTournaments(data[0])
            setDates(data)
            setLoading(false)
          }
        })
    
        return function cleanup(){
          abortController.abort()
        }
    }, [])

    const shallowEqual = (date1, date2) => {
    
      if (date1.getMonth() !== date2.getMonth()) {
      return false;
      }
  
      if (date1.getDate() !== date2.getDate()) {
      return false;
      }
  
      return true;
    }

    const tileClassName = ({date, view}) => {
      //console.log(view)

      for (let i = 0; i < dates.length; i++){
        let casa = shallowEqual(new Date(dates[i].date), date);  
        if(casa){
          let condition = view === 'month' && casa;
          return condition ? classes.tournament : null
        }
      } 
    };


    return(<>
    <div className={classes.cardsContainer}>
              <Card className={classes.root}>
                <CardActionArea>
                  {tournaments ?
                    <CardMedia
                    className={classes.media}
                    image={Logo}
                    title="FIFA 21"
                    />
                    : (<Skeleton animation="wave" variant="rect" className={classes.media} />)}

                </CardActionArea>

                <div className={classes.tournamentContainer}>
                  {tournaments ?
                  <img className={classes.trophy} src={Trophy}/>
                  : (<Skeleton variant="circle" width={80} height={80}/>)}
                  <div>
                    <p>Type of tournament</p>
                    <p>Details : Lorem ipsum dolor sit amet, </p>
                    <p>A counter</p>

                    {tournaments ?
                    <div className={classes.cardActions}>
                      <Link to={"/tournaments/"+tournaments._id}>
                        <Button size="medium" variant="contained" color="primary">
                         View more
                        </Button>
                      </Link>
                        <div className={classes.inline}>
                            <span><ScheduleIcon/></span>
                            <span>{new Date(tournaments.date).toLocaleString()}</span>
                        </div>
                    </div>
                    : (<Skeleton animation="wave" variant="rect" className={classes.cardActions} />)}
                  </div>
                </div>
            </Card>
        <div>
        {/*
        <div className={classes.calenderTitle}>Calendar</div>
          <div>
            <Calendar 
            tileClassName={tileClassName}/>
          </div>
        */}
        </div>
        
      </div>
    </>
    )
}
