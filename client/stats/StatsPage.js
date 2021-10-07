import React, { useState, useEffect } from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {list} from './api-stats.js'
import Avatar from '@material-ui/core/Avatar'
import Logo from './../assets/images/onlyLogo.png'
import Title from './../assets/images/leagueTitle.png'
import AllTitles from './../assets/images/alltiles.png'
import Cup from './../assets/images/cupswon.png'
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Chart from './Chart'
import {Link} from 'react-router-dom'


const useStyles = makeStyles(theme => ({
  wrapper: {
    marginTop: theme.spacing(11),
    paddingLeft: 140,
    paddingRight: 140,
    [theme.breakpoints.down("xs")]: {
      paddingLeft: 40,
      paddingRight: 40,
  },
},
  flex: {
    display: 'flex',
    flexWrap: 'wrap',
    //marginTop: theme.spacing(11),
  },
  records: {
    marginTop: 35,
    marginBottom: 35,
    display: 'flex',
    overflow: 'hidden',
    flexDirection: 'row',
    boxSizing: 'border-box',
    [theme.breakpoints.down("900")]: {
        flexDirection: 'column',
    },
  },
  membersTitle: {
    alignItems: 'center',
    display: 'flex',
    fontFamily: 'din-condensed',
    fontStyle: 'italic',
    marginBottom: '36px',
    width: '100%',
    fontSize: '24px',
    [theme.breakpoints.down("900")]: {
      marginBottom: 15, 
  },
    '&::after': {
        backgroundColor: 'rgba(151,151,151,.4)',
        content: "''",
        flex: 1,
        height: '1px',
        marginLeft: '20px'
    }  
  },
  overviewMembers: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    width: '50%',
    alignItems: 'flex-end',
    borderRight: '1px solid rgba(151,151,151,.4)',
    paddingRight: '79px',
    [theme.breakpoints.down("900")]: {
        borderRight: 'none',
        width: '100%',
        paddingRight: 0,
    }
  },
  overviewTotalMembers: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    width: '50%',
    alignItems: 'flex-end',
    paddingLeft: '79px',
    [theme.breakpoints.down("900")]: {
        width: '100%',
        paddingLeft: 0,    
    }
  },
  section: {
    borderRight: 'none',
    paddingRight: 0,
    width: '100%',
    alignItems: 'flex-end'
  },
  overviewMembersHeader: {
    alignItems: 'center',
    display: 'flex',
    marginBottom: '32px',
    width: '100%',
  },
  overviewMembersHeaderDetails: {
    paddingLeft: '25px'
  },
  membersCount: {
    borderBottom: '3px solid #000',
    fontFamily: 'din-condensed',
    fontSize: '42px',
    fontWeight: 700,
    marginLeft: 'auto',
    marginRight: '19px',
    padding: '0 20px 10px 20px',
    textAlign: 'center',
    whiteSpace: 'nowrap',
  },
  name: {
    fontWeight: 700,
    marginTop: '3px',
    fontSize: '24px',
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
    color: '#161616'
  },
  bigAvatar: {
    width: 60,
    height: 60,
    margin: 10
  }, 
  container:{
      width: '50%',
      boxSizing: 'border-box',
      [theme.breakpoints.down("900")]: {
        width: '100%',
    }
  },
  containerTrophie: {
    paddingLeft:' 33px',
    width: '50%',
    boxSizing: 'border-box',
    [theme.breakpoints.down("900")]: {
        paddingLeft: 0,
        width: '100%',
        marginTop: 30

    }
  },
  trophiesContainer: {
    justifyContent: 'space-around',
    overflow: 'unset',
    display: 'flex',
    maxWidth:' 100%',
    flexDirection: 'row',
    border: 'none',
    padding: 0,
    [theme.breakpoints.down("900")]: {
        overflowX: 'scroll',
        overflowY: 'hidden',
        justifyContent: 'flex-start'
    }
  },
  trophieCard: {
    alignItems: 'center',
    alignSelf: 'stretch',
    borderRight: '1px solid rgba(151,151,151,.4)',
    boxSizing: 'content-box',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    fontWeight: 700,
    justifyContent: 'space-between',
    padding:' 0 10px',
    textAlign: 'center',
    wordBreak: 'break-word',
    minWidth: 'unset',
    [theme.breakpoints.down("900")]: {
       minWidth: '50%',
    }
  },
  containerInsideTrophie: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box',
  },
  trophieImage: {
    height: '58px',
    margin: '23px 0 14px 0',
    width: '53px',
    [theme.breakpoints.down("900")]: {
        height: '66px',
        margin: '17px 0 24px 0',
        width: '60px',
     }
  },
  span: {
    boxSizing: 'border-box',
  },
  prueba: {
    alignItems:'flex-end',
    borderRight: '1px solid rgba(151,151,151,.4)',
    paddingRight: '79px',
  },
  number: {
    fontWeight: 700,
    fontSize: 20,
  },
  //Chart
  chartContainer: {
      display: 'flex',
  },
  historyChart: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
  },
  historyChartContainer: {
    alignItems: 'center',
    display: 'flex',
    boxSizing: 'border-box',
    margin: 'unset'
  },
  win: {
    color: '#fff',
    border: 'none',
    background: '#19a863',
    marginRight: '12px',
    height: '30px',
    lineHeight: '30px',
    width: '30px',
    borderRadius:' 6px',
    textAlign: 'center',
  },
  chartText: {
    color: '#8e8e8e',
    display: 'block',
    fontSize: '20px',
    marginLeft: 5,
  },
  viewAll: {
      marginTop: 20,
      padding: 0,
  },
  capitalize: {
    textTransform: 'capitalize'
  },
  title: {

    '& h1': {
      fontSize: '56px',
      margin: 0,
      padding: 0,
      color: '#3861fb',
      textAlign: 'center',
      position: 'relative',
      [theme.breakpoints.down("xs")]: {
        fontSize: "30px",
      },
      '&::after': {
        content: "' '",
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: '100%',
        borderRadius: '2px',
        borderBottom: '10px solid #f7ddbc',
      }
    }
  }
}))

export default function StatsPage(){
    const classes = useStyles()
    const [stats, setStats] = useState()
    const [loading, setLoading] = useState(true)
    const [player, setPlayer] = useState()

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal

        list(signal).then((data) => {
            if (data && data.error) {
                console.log(data.error)
            } else {
                setStats(data)
                console.log(data)
                for (var key of Object.keys(data.recent_matches[0].aggregate)) {
                  console.log(key + " -> " + data.recent_matches[0].aggregate[key])
              }
                const randomNumber = Math.floor(Math.random() * data.members.members.length)
                setPlayer(data.members.members[randomNumber])
                setLoading(false)
            }
        })

        return function cleanup(){
          abortController.abort()
        }
    }, [])

    const toPercentage = (number) => {
        let tmp = (number / stats.teamStats.totalGames) * 100;
        const percentage = tmp.toFixed(2)
        return percentage
    }

    const sumOfMembers = () => {
      const sum = stats.members.positionCount.midfielder + stats.members.positionCount.goalkeeper
      + stats.members.positionCount.defender + stats.members.positionCount.forward;
      return sum;
    }

    return (
    <div className={classes.wrapper}>
      <div className={classes.title}>
        <h1 variant="h4" className={classes.title}>
          About us
        </h1>
      </div>
      <hr/>
      {!loading ? <>
      {/*<Division points={stats.teamStats.points} currentDivision={stats.teamStats.currentDivision} />*/}
      <div className={classes.flex}>
          <div className={classes.membersTitle}>
              <span>MEMBERS</span>
          </div>

          <div className={classes.overviewMembers}>
              <div className={classes.overviewMembersHeader}>
                <Avatar className={classes.bigAvatar}/>
                <div className={classes.overviewMembersHeaderDetails}>
                    <div className={classes.capitalize}>{player.favoritePosition}</div>
                    <div className={classes.name}>{player.name}</div>
                </div>
              </div>

              <div className={classes.details}>
                  <div className={classes.text}>Goals</div>
                  <div className={classes.number}>{player.goals}</div>
              </div>

              <div className={classes.details}>
                  <div className={classes.text}>Average Match Rating</div>
                  <div className={classes.number}>{player.ratingAve}</div>
              </div>

              <div className={classes.details}>
                  <div className={classes.text}>Games Played</div>
                  <div className={classes.number}>{player.gamesPlayed}</div>
              </div>
              <Link to={"/members-stats"}>
                  <Button className={classes.viewAll} color="primary">
                  View All Members
                  </Button>
            </Link>
          </div>

          <div className={classes.overviewTotalMembers}>
              <div className={classes.overviewMembersHeader}>
                  <img src={Logo} width={45}></img>
                  <div className={classes.overviewMembersHeaderDetails}>
                    <div>Venari City FC</div>
                    <div className={classes.name}>Total Members</div>
                  </div>
                  <div className={classes.membersCount}>{sumOfMembers()}</div>
              </div>

              <div className={classes.details}>
                  <div className={classes.text}>Midfielders</div>
                  <div className={classes.number}>{stats.members.positionCount.midfielder}</div>
              </div>

              <div className={classes.details}>
                  <div className={classes.text}>Goalkeepers</div>
                  <div className={classes.number}>{stats.members.positionCount.goalkeeper}</div>
              </div>

              <div className={classes.details}>
                  <div className={classes.text}>Forwards</div>
                  <div className={classes.number}>{stats.members.positionCount.forward}</div>
              </div>

              <div className={classes.details}>
                  <div className={classes.text}>Defenders</div>
                  <div className={classes.number}>{stats.members.positionCount.defender}</div>
              </div>
          </div>
      </div>

      <div className={classes.records}>
          <div className={classes.container}>
              <div className={classes.membersTitle}>
                  <span>STATS</span>
              </div>
              <div className={classes.prueba}>
              <div className={classes.chartContainer}>

              <Chart stats={stats.teamStats}/>
              
              <div className={classes.historyChart}>
                  <div className={classes.historyChartContainer}>
                      <div className={classes.win}>W</div>
                      <span className={classes.number}>{toPercentage(stats.teamStats.wins)}%</span>
                      <span className={classes.chartText}>Wins</span>
                  </div>

                  <div style={{marginTop: '25px'}} className={classes.historyChartContainer}>
                      <div style={{backgroundColor: '#c4010d'}} className={classes.win}>L</div>
                      <span className={classes.number}>{toPercentage(stats.teamStats.losses)}%</span>
                      <span className={classes.chartText}>Losses</span>
                  </div>

                  <div style={{marginTop: '25px'}} className={classes.historyChartContainer}>
                      <div style={{background: '#282d3b'}} className={classes.win}>D</div>
                      <span className={classes.number}>{toPercentage(stats.teamStats.ties)}%</span>
                      <span className={classes.chartText}>Draws</span>
                  </div>
              </div>
              </div>
              </div>
          </div>


          <div className={classes.containerTrophie}>
              <div className={classes.membersTitle}>
                  <span>TROPHIES</span>
              </div>

              <div className={classes.trophiesContainer}>
                  <div className={classes.trophieCard}>
                      <span className={classes.span}>Leagues Won</span>
                      <div className={classes.containerInsideTrophie}>
                          <img src={Title} className={classes.trophieImage}/>
                          <span className={classes.span}>{stats.teamStats.leaguesWon}</span>
                      </div>
                  </div>
                
                  <div className={classes.trophieCard}>
                      <span className={classes.span}>Titles Won</span>
                      <div className={classes.containerInsideTrophie}>
                          <img src={AllTitles} className={classes.trophieImage}/>
                          <span className={classes.span}>{stats.teamStats.titlesWon}</span>
                      </div>
                  </div>
              

                  <div className={classes.trophieCard}>
                      <span className={classes.span}>Total Cups Won</span>
                      <div className={classes.containerInsideTrophie}>
                          <img src={Cup} className={classes.trophieImage}/>
                          <span className={classes.span}>{stats.teamStats.totalCupsWon}</span>
                      </div>
                  </div>
              </div>  
          </div>

      </div>
      </>
      : (<div className={classes.loading}><CircularProgress size={64}/></div>) }

    </div>
    )
}