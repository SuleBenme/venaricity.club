import React, { useState, useEffect, Fragment } from 'react'
import {makeStyles} from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction' 
import ListItemText from '@material-ui/core/ListItemText' 
import Avatar from '@material-ui/core/Avatar'
import Divider from '@material-ui/core/Divider'
import auth from './../auth/auth-helper'
import {list} from './api-player.js'
import CreatePlayer from './NewPlayer.js'
import UpdatePlayer from './UpdatePlayer.js'
import DeletePlayer from './DeletePlayer.js'
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete';
import Kits from './Kits'

const useStyles = makeStyles(theme => ({
    root: theme.mixins.gutters({
      maxWidth: 600,
      margin: 'auto',
      marginTop: theme.spacing(5)
    }),
    title: {
      margin: `${theme.spacing(2)}px ${theme.spacing(1)}px 0`,
      color: theme.palette.protectedTitle,
      fontSize: '1em'
    },
    bigAvatar: {
      width: 100,
      height: 100,
      margin: 10,
      '& img': {
        objectPosition: 'top',
      }
    },
    action: {
      display: 'inline'
    },
    chip: {
      margin: theme.spacing(0.5),
    },
    chipDisplay: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(0.5),
      },
      listStyleType: 'none',
    },
    extraMarginTop: {
      marginTop: theme.spacing(3)
    },
    loadingCircular: {
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      padding: '30px',
    },
    inline:{
      display: 'inline'
    },
    header:{
      display: 'flex',
      justifyContent: 'space-evenly',
      alignItems: 'center',
    },
    autocomplete: {
      width: 300,
      [theme.breakpoints.down("xs")]: {
        width: 150,
      }
    }
}))
export default function Players({ match }) {
    const classes = useStyles()
    const jwt = auth.isAuthenticated()
    const [values, setValues] = useState([])
    const [players, setPlayers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState()

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal

        list({t: jwt.token}, signal).then((data) => {
          if (data && data.error) {
            setError(data.error)
          } else {
            //console.log(data)
            setPlayers(data)
            setValues(data)
          }
          setLoading(false)
        })
        return function cleanup(){
          abortController.abort()
        }
    }, [])

    const addPlayer = (player) => {
      setValues([...values, player])
      setPlayers([...players, player])
    }
    const deletePlayer = (playerId) => {
      setValues(values.filter(player => player._id !== playerId))
      setPlayers(players.filter(player => player._id !== playerId))
    }
    const updatePlayer = (updatedPlayer) => {
      const newList = values.map((item) => {
        if (item._id === updatedPlayer._id) {
          return updatedPlayer;
        }
        return item;
      });
  
      setValues(newList);
      setPlayers(newList)
    }

    const onTagsChange = (event, player) => {
      if(!player){
        setPlayers(values)
      } else{
        console.log(player)
        setPlayers([player])
      }
    }
    const filterKits = (players) => {
      let kits = []
      for (let i = 0; i < 100; i++){
          let found = false
          for (let player = 0; player < players.length; player++){
              if(players[player].kitNumber != undefined && i == players[player].kitNumber){
                  //console.log(players[player].kitNumber)
                  found = true;
                  kits.push({kit: i, found: true})
                  break;
              } 
          }
          if(!found){kits.push(i)}
      }
      return kits;
    }  
  // console.log(players)
      return (<>
          {!loading ? (<div>
          <div className={classes.header}>
            <Autocomplete
              id="combo-box-demo"
              options={values}
              onChange={onTagsChange}
              getOptionLabel={(option) => option.name}
              className={classes.autocomplete}
              renderInput={(params) => <TextField {...params} label="Search" variant="outlined" />}
            />
            <Box component="div" display="inline" p={1} m={1}>
              <CreatePlayer addPlayer={addPlayer}/>
            </Box>

            <Kits players={filterKits(players)} />
          </div>

         <List disablePadding>
          {players && players.map((player) => {
                    return(<span key={player._id}>
            <ListItem className={classes.extraMarginTop}>
              <ListItemAvatar>
                <Avatar alt="Avatar" variant="square" src={player.image} className={classes.bigAvatar}></Avatar>
              </ListItemAvatar>
              <ListItemText primary={player.name} />
              <ListItemText secondary={player.generalPosition} />
              <ListItemText secondary={player.kitNumber} />
              <ListItemText secondary={player.country ? player.country.name : ''} />

              {auth.isAuthenticated()
               ? (<ListItemSecondaryAction>
                    <UpdatePlayer player={player} updatePlayer={updatePlayer}/>
                    <DeletePlayer playerId={player._id} deletePlayer={deletePlayer}/>
                  </ListItemSecondaryAction>)
              : (<div><p>You do not have permission</p></div>)
              }
            </ListItem>
            <ListItem>
            <div className={classes.chipDisplay}>
              {player.specificPosition.map((position,i) => {
                return (
                <span key={i}>
                  <Chip
                  label={position}
                  className={classes.chip}
                  color="primary"
                  />
                </span>
                );
              })}
            </div>
            </ListItem>
            <Divider/>
            </span>)}
          )}
          </List>
          </div>)
          :
          <div className={classes.loadingCircular}>
             <CircularProgress size={64}/>
          </div>}
        </>
      )
  }