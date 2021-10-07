import React, {useState, useEffect}  from "react";
import { makeStyles } from '@material-ui/core/styles';
import {read} from './api-player.js'

const useStyles = makeStyles(theme => ({
    container: {
        //padding: '0.5rem 2rem 0rem 2rem',
        marginTop: theme.spacing(10),
        marginBottom: theme.spacing(3),
        fontFamily: 'Dosis, sans-serif',
        width: '100%',
        paddingRight: 8,
        paddingLeft: 8,
        marginRight: 'auto',
        marginLeft: 'auto',
        boxSizing: 'border-box',
        maxWidth: 800,
        /*
        [theme.breakpoints.up("820")]: {
         maxWidth: 772,
        },
        */
       /*
        [theme.breakpoints.up("1150")]: {
          maxWidth: 1112,
        },
        */
    },
    wrapper: {
        display: 'flex',
        //'-ms-flex-wrap': 'wrap',
        // flexWrap: wrap,
        marginRight: '-8px',
        marginLeft: '-8px',
        boxSizing:' border-box',
        [theme.breakpoints.down("600")]: {
            flexWrap: 'wrap',
        },
    },
    column: {
        //flex: '0 0 66.66667%',
        //maxWidth: '66.66667%',
        position: 'relative',
        width: '100%',
        paddingRight: 8,
        paddingLeft: 8,
        boxSizing:' border-box',   
        [theme.breakpoints.down("820")]: {

        },
      },
    sideColumn: {  
        //flex: '0 0 33.33333%',
        //maxWidth: '33.33333%',
        //position: 'relative',
        width: '100%',
        paddingRight: 8,
        paddingLeft: 8,
        boxSizing:' border-box',
        [theme.breakpoints.down("820")]: {
        },
    },
    details: {
        borderBottom: '1px solid rgba(151,151,151,.4)',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: '10px',
        paddingBottom: '14px',
        width: '100%',
    },
    text: {
        fontSize: '1.1rem',
    },
    number: {
        fontWeight: 700,
        fontSize: 20,
    },
    contentCard: {
        position: 'relative',
        paddingTop: '90%',
        //overflow: 'hidden',
        //flexBasis: '50%',
        //maxWidth: '50%'
    },
    image: {
        backgroundRepeat: 'no-repeat',
        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
        position: 'absolute',
        top: 0,
        left: 0,
        display: 'block',
        width: '100%',
        height: '100%',
        backgroundSize: 'cover',
        backgroundPosition: 'top',
        backgroundColor: ' #fff',
        zIndex: 0,
    },
    header: {
        boxSizing: 'border-box',
        backgroundColor:' #fff',
        borderRadius:'4px',
        paddingTop: 24,
        paddingBottom: 24,
        padding: '27px 23px',
        position: 'relative',
        overflow: 'hidden',
        display: 'block',
        '&::before': {
          content: '""',
          display: 'block',
          position: 'absolute',
          width: 6,
          left: 0,
          top: 0,
          bottom: 0,
          backgroundColor: '#38a9ff',
          borderRadius: '3px 0 0 0',
        },
        '& h4': {
          fontSize: '18px',
          lineHeight: '1.2em',
          letterSpacing:' -.02em',
          marginBottom: 0,
          textTransform: 'uppercase',
          fontStyle: 'normal',
          display: 'inline-block',
          margin: 0,
        }
    },
}))

export default function DisplayNews({match}) {
    const classes = useStyles();
    const [player, setPlayer] = useState({});
    
    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
        
        read({playerName: match.params.playerName}, signal).then((data) => {
          if (data && data.error) {
            console.log(data.error)
          } else {
            console.log(data)
            setPlayer(data)
          }
        })
    
        return function cleanup(){
          abortController.abort()
        }
    }, [match.params.playerName])

    console.log(player)
    
    return (

    <div className={classes.container}>
        <div className={classes.wrapper}>
            <div className={classes.column}>
                <div className={classes.contentCard}>
                    <img className={classes.image} src={player.image}/>
                    <div style={player.image && {backgroundImage: `url(${player.image})`}}
                        className={classes.image}/>
                </div>
            </div>

            <div className={classes.sideColumn}>
            {player.stats && <>

            <div className={classes.header}>
              <h4>{player.name}</h4>
            </div>

            <div className={classes.details}>
                <div className={classes.text}>Nationality</div>
                <img width={40} src={player.country && require(`./flags/${player.country.countryCode.toLowerCase()}.svg`)}/>
            </div>

            <div className={classes.details}>
                <div className={classes.text}>General position</div>
                <div className={classes.number}>{player.generalPosition}</div>
            </div>

            <div className={classes.details}>
                <div className={classes.text}>Games Played</div>
                <div className={classes.number}>{player.stats.gamesPlayed}</div>
            </div>

            <div className={classes.details}>
                <div className={classes.text}>Goals</div>
                <div className={classes.number}>{player.stats.goals}</div>
            </div>

            <div className={classes.details}>
                <div className={classes.text}>Assists</div>
                <div className={classes.number}>{player.stats.assists}</div>
            </div>

            <div className={classes.details}>
                <div className={classes.text}>Pass Success Rate</div>
                <div className={classes.number}>{player.stats.passSuccessRate}%</div>
            </div>

            <div className={classes.details}>
                <div className={classes.text}>Pro Name</div>
                <div className={classes.number}>{player.stats.proName}</div>
            </div>

            <div className={classes.details}>
                <div className={classes.text}>Man of the match</div>
                <div className={classes.number}>{player.stats.manOfTheMatch}</div>
            </div>
            </>
            }
            </div>
        </div>
    </div>
)}
