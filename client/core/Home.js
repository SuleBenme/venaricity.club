import React, {useState, useEffect, useCallback} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import News from './../news/DisplayPublishedNews'
import TeamStats from './../stats/teamStats'
import {list} from '../stats/api-stats.js'
import LastResult from '../stats/LastMatch'
import Calendar from 'react-calendar';
import Tournaments from '../tournament/Tournaments'
import Skeleton from '@material-ui/lab/Skeleton';
import '../tournament/css.css'
import FacebookIcon from '@material-ui/icons/Facebook';
import YouTubeIcon from '@material-ui/icons/YouTube';
import Alert from '@material-ui/lab/Alert';
import {Link} from 'react-router-dom'
import Division from '../stats/Division';
import Loading from '../_utilities/loading';

const useStyles = makeStyles(theme => ({
  container: {
    //padding: '0.5rem 2rem 0rem 2rem',
    marginTop: theme.spacing(10),
    fontFamily: 'Dosis, sans-serif',
    width: '100%',
    paddingRight: 8,
    paddingLeft: 8,
    marginRight: 'auto',
    marginLeft: 'auto',
    boxSizing:' border-box',
    /*
    [theme.breakpoints.up("820")]: {
     maxWidth: 772,
    },
    */
    [theme.breakpoints.up("1150")]: {
      maxWidth: 1112,
    },
  },
  wrapper: {
    display: 'flex',
    //-ms-flex-wrap: wrap;
    //flexWrap: 'wrap',
    marginRight: '-8px',
    marginLeft: '-8px',
    boxSizing:' border-box',
    flexWrap: 'wrap',
  },
  widgetSidebar: {
    marginBottom: 15,
    border: '1px solid #e4e7ed',
    borderRadius: '4px',
    backgroundColor:' #fff',
  },
  column: {
    flex: '0 0 66.66667%',
    maxWidth: '66.66667%',
    position: 'relative',
    width: '100%',
    paddingRight: '8px',
    paddingLeft: '8px',
    boxSizing:' border-box',   
    [theme.breakpoints.down("820")]: {
      position: 'relative',
      width: '100%',
      paddingRight: 8,
      paddingLeft: 8,
      maxWidth: 'unset',
      flex: 'unset',
    },
  },
  sideColumn: {  
    flex: '0 0 33.33333%',
    maxWidth: '33.33333%',
    position: 'relative',
    width: '100%',
    paddingRight: '8px',
    paddingLeft: '8px',
    boxSizing:' border-box',
    [theme.breakpoints.down("820")]: {
      position: 'relative',
      width: '100%',
      paddingRight: 8,
      paddingLeft: 8,
      maxWidth: 'unset',
      flex: 'unset',
    },
  },
  header: {
    boxSizing:' border-box',
    backgroundColor:' #fff',
    border:' 1px solid #e4e7ed',
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
      fontSize: '16px',
      lineHeight: '1.2em',
      letterSpacing:' -.02em',
      marginBottom: 0,
      textTransform: 'uppercase',
      fontStyle: 'normal',
      display: 'inline-block',
      margin: 0,
    }
  },
  root: {
    flexGrow: 1,
    margin: 20,
  },
  title: {
    padding:`${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
    color: theme.palette.text.secondary
  },
  credit: {
    padding: 10,
    textAlign: 'right',
    backgroundColor: '#ededed',
    borderBottom: '1px solid #d0d0d0',
    '& a':{
      color: '#3f4771'
    } 
  },
  socialMedia: {
    backgroundColor: '#3b5998',
    flexWrap: 'wrap',
    padding: 0,
    textAlign: 'center',
    marginLeft: 5,
    marginRight: 5,
    width: '50%',
    maxWidth:' 50',
    flexDirection: 'column',
    display: 'flex',

    color: '#fff',
    textTransform: 'uppercase',
    border: '1px solid #e4e7ed',
    borderRadius: '4px',
    minHeight: '65px',
    position: 'relative',
    overflow: 'hidden',
    backgroundClip: 'padding-box',
    transition: 'all .3s ease-in-out',
    transform: 'translateZ(0)',
    boxSizing: 'border-box',

    '& div': {
      position: 'relative',
      width: '100%',
      //padding: '35px 0 10px',
      padding: 5,
      backgroundColor: 'transparent!important',
    },
    '& h6': {
      fontSize: '12px',
      margin: 0,
      padding: '0 12px 10px',
      lineHeight: '1.2em',
      color: '#fff',
    //  marginBottom: '1px',
      letterSpacing: '-.02em',
      textTransform: 'uppercase',
    }
  }
}))

export default function Home({history}){
  const classes = useStyles()
  const [defaultPage, setDefaultPage] = useState(false)
  const [value, onChange] = useState(new Date())
  const [stats, setStats] = useState({})
  const [showReport, setShowReport] = useState(true)


  const tileContent= ({ activeStartDate, date, view }) =>  {
    let fecha = new Date(2020, 10, 20);
    let casa = shallowEqual(fecha, date);
    console.log(view)

    return view === 'month' && casa ? <span>{5}</span> : null
  }
  const tileClassName = ({date, view}) => {
    let condition = view === 'month' && date.getDay() === 3;
    return condition ? classes.prueba : null
  };


    /*
    setDefaultPage(auth.isAuthenticated())
    const unlisten = history.listen (() => {
      setDefaultPage(auth.isAuthenticated())
    })
    return () => {
      unlisten()
    }*/
    useEffect(() => {
      const abortController = new AbortController()
      const signal = abortController.signal

      list(signal).then((data) => {
          if (data && data.error) {
              console.log(data.error)
          } else {
            console.log(data)
            setStats(data);
          }
      })

      return function cleanup(){
        abortController.abort()
      }
  }, [])


    return (<div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.column}>
          <div className={classes.widgetSidebar}>
            <div className={classes.header}>
              <h4>News</h4>
            </div>
            <News/>
          </div>

          <div className={classes.widgetSidebar}>
            <div className={classes.header}>
                <h4>DIVISION RANKING</h4>
            </div>
            {stats.teamStats ?
              <Division 
              points={stats.teamStats.points} 
              currentDivision={stats.teamStats.currentDivision} 
              recentResults={stats.teamStats.recentResults} 
              record_wins={stats.teamStats.seasonWins}
              record_ties={stats.teamStats.seasonTies}
              record_losses={stats.teamStats.seasonLosses}
              />
              : <Skeleton animation="wave" variant="rect" height={130} />
            }
          </div>

          <div className={classes.widgetSidebar}>
            <div className={classes.header}>
                <h4>Next Tournament</h4>
            </div>
            <Tournaments/>
          </div>
        </div>

        <div className={classes.sideColumn}>
          {showReport &&<span><Alert style={{marginBottom: 15}} severity="info" onClose={() => setShowReport(false)}><Link to={"/report"}>If you find any bug, please let us know immediately here</Link></Alert></span>}
          <div className={classes.widgetSidebar}>
          <div className={classes.header}>
            <h4>Last Result</h4>
          </div>
          {stats.recent_matches ?
          <LastResult padding={'40px 10px'} height={"70px"} goal={40} recentMatch={stats.recent_matches[0]} keys={Object.keys(stats.recent_matches[0].clubs)} />
           : <Skeleton variant="rect" height={199}/>
          }
          </div>
          <div className={classes.widgetSidebar}>
            <div className={classes.header}>
              <h4>Calendar</h4>
            </div>
            <Calendar/>
          </div>
          <div style={{display: 'flex',
            justifyContent:' space-between',
            marginLeft: '-5px',
            marginRight: '-5px',
            overflow: 'hidden',
            marginBottom: 15}} 
            >
            <a href='https://www.facebook.com/VenariCity' target="_blank" className={classes.socialMedia}>
              <div><FacebookIcon/></div>
              <h6>Like our facebook page</h6>
            </a>
            <a href='https://www.youtube.com/channel/UCaeqGRZcLoQDHi1jN55hWHA' target="_blank" style={{backgroundColor: '#FF0000'}} className={classes.socialMedia}>
              <div><YouTubeIcon/></div>
              <h6>Subscribe to our youtube channel</h6>
            </a>
          </div>
            <div className={classes.widgetSidebar}>
              <div className={classes.header}>
                <h4>Stats</h4>
              </div>
              <TeamStats/>
            </div>
        </div>
      </div>
    </div>
    )
}
