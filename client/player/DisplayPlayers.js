import React, { useState, useEffect, Fragment } from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import {listPlayers} from './api-player.js'
import CircularProgress from '@material-ui/core/CircularProgress';
import CardPlayer from './PlayerCard'
import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import auth from '../auth/auth-helper'

const useStyles = makeStyles(theme => ({
  background: {
    marginTop: theme.spacing(7),
    paddingLeft: theme.spacing(7),
    paddingRight: theme.spacing(7),
    paddingTop: 25,
    fontFamily: 'Dosis, sans-serif',
    [theme.breakpoints.down("xs")]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    }
    //height: '100%',
  },
  position: {
    fontWeight: 'bold',
    color: '#3861fb',
    fontSize: '38px',
    [theme.breakpoints.down("xs")]: {
      textAlign: 'center',
      fontSize: '31px',
    }
  },
  root: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    [theme.breakpoints.down("xs")]: {
      display: "flex",
      justifyContent: "space-evenly",
      alignItems: "center",
    }
  },
  loadingCircular: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  toggleButton: {
    display: 'flex',
    justifyContent: 'flex-end',
    zIndex: 4
  }
}))

export default function DisplayPlayers({}){
    const classes = useStyles()
    const [firstTeam, setFirstTeam] = useState([])
    const [academy, setAcademy] = useState([])
    const [staff, setStaff] = useState([])
    const [archive, setArchive] = useState([])
    const [loading, setLoading] = useState(true)
    const [alignment, setAlignment] = useState(0);

    const handleAlignment = (event, newAlignment) => {
      if (newAlignment !== null) {
        setAlignment(newAlignment);
      }
    };


    const positions = (data) => {
      const positions = [];
      let goalkeeper = [];
      let defense = [];
      let midfielder = [];
      let forward  = [];
      let academy = [];
      let staff = [];
      let archive = [];

      data.map((player) => {

        if(player.role == 0) {
          if(player.generalPosition === 'goalkeeper'){
            goalkeeper.push(player)
          }
          if(player.generalPosition === 'defender'){
            defense.push(player)
          }
          if(player.generalPosition === 'midfielder'){
            midfielder.push(player)
          }
          if(player.generalPosition === 'forward'){
            forward.push(player)
          }
        }

        if(player.role == 1){
          academy.push(player)
        }

        if(player.role == 2){
          staff.push(player)
        }

        if(player.role == 3){
          archive.push(player)
        }
      })    
      positions.push(goalkeeper, defense, midfielder, forward)
      setFirstTeam(positions)
      setAcademy(academy)
      setStaff(staff)
      setArchive(archive)
    }

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal

        listPlayers(signal).then((data) => {
          if (data && data.error) {
            console.log(data.error)
          } else {
            positions(data)
          }
          setLoading(false)
        })
    
        return function cleanup(){
          abortController.abort()
        }
    }, [])

    //console.log(alignment)

    return (<div className={classes.background}>
      {!loading ? (<>    
      <div className={classes.toggleButton}>
      <ToggleButtonGroup
        className={classes.toggleButton}
        value={alignment}
        exclusive
        onChange={handleAlignment}
        aria-label="right aligned"
      >
        <ToggleButton value={0} aria-label="left aligned">
          First Team 
        </ToggleButton>
        <ToggleButton value={1} aria-label="centered">
          Academy
        </ToggleButton>
        <ToggleButton value={2} aria-label="centered">
          Staff
        </ToggleButton>
        {(auth.isAuthenticated() && auth.isAuthenticated().user.manager) && 
        <ToggleButton value={3} aria-label="centered">
          Archive
        </ToggleButton>
        }
      </ToggleButtonGroup>
      </div>

        {alignment === 0 && (<>
        <div style={{letterSpacing: '2px', fontSize: '42px'}} className={classes.position}> First Team  </div>
        <hr/>
        <div className={classes.position}> Goalkeepers  </div>
        <div className={classes.root}>
          {firstTeam[0].map((player, i) => {
            return(
              <CardPlayer key={i} player={player}/>
          )
          })}  
        </div>

        <div className={classes.position}> Defenders  </div>
        <div className={classes.root}>
        {firstTeam[1].map((player, i) => {
          return(
            <CardPlayer key={i} player={player}/>
            )
         })}  
        </div>

        <div className={classes.position}> Midfielders  </div>
        <div className={classes.root}>
        {firstTeam[2].map((player, i) => {
          return(
            <CardPlayer key={i} player={player}/>
            )
         })}  
        </div>

        <div className={classes.position}> Forwards  </div>
        <div className={classes.root}>
        {firstTeam[3].map((player, i) => {
           return(
             <CardPlayer key={i} player={player}/>
        )
         })}  
        </div>
        </>)
        }
        {alignment === 1 && (<>
        <div style={{letterSpacing: '2px', fontSize: '42px'}} className={classes.position}> Academy  </div>
        <hr/>
        <div className={classes.root}>
        {academy.map((player, i) => {
          return(
            <CardPlayer key={i} player={player}/>
            )
         })}  
        </div>
        </>)}

        {alignment === 2 && (<>
        <div style={{letterSpacing: '2px', fontSize: '42px'}} className={classes.position}> Staff </div>
        <hr/>
        <div className={classes.root}>
        {staff.map((player, i) => {
          return(
            <CardPlayer key={i} player={player}/>
            )
         })}  
        </div>
        </>)}

        {alignment === 3 && (<>
        <div style={{letterSpacing: '2px', fontSize: '42px'}} className={classes.position}> Archive </div>
        <hr/>
        <div className={classes.root}>
        {archive.map((player, i) => {
          return(
            <CardPlayer key={i} player={player}/>
            )
         })}  
        </div>
        </>)}

        </>)
        : (<div className={classes.loadingCircular}>
          <CircularProgress size={64}/>
       </div>) 
      }
      </div>
    )
}