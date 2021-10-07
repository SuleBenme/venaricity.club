import React, {useState, useEffect}  from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import auth from './../auth/auth-helper'
import CircularProgress from '@material-ui/core/CircularProgress';
import {canAddPlayers, createPlayer, addPlayers} from '../player/api-player'

const useStyles = makeStyles(theme => ({
    circularProgress: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: 10
    },
    player: {
        display: 'flex',
        padding: 10
    }
   
}))
export default function AdminPlayers() {

    const classes = useStyles();
    const [players, setPlayers] = useState([])
    const [loading, setLoading] = useState(false)
    const jwt = auth.isAuthenticated()

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
        setLoading(true)
    
        canAddPlayers({t: jwt.token}, signal).then((data) => {
          if (data && data.error) {
              setValues({...values, error: data.error})
          } else {
              //console.log(data);
              data.map((player) => {
                player.loading = false})
              setPlayers(data)
          }
          setLoading(false)
        })
  
        return function cleanup(){
          abortController.abort()
        }
    },[])

    const pruebaSule = (index) => {
        const old = players[index];
        const updated = { ...old, loading: true}
        const clone = [...players];
        clone[index] = updated;
        setPlayers(clone);

        createPlayer(players[index], {t: jwt.token}).then((data) => {
            if (data && data.error) {
            } else {
               // console.log(data); 
                const old = players[index];
                const updated = { ...old, loading: false}
                const clone = [...players];
                clone[index] = updated;
                setPlayers(clone);
                setPlayers(players.filter(player => player.name !== data.name))
            }
        })
    }
   

return(<div>
    <Typography variant="h4" className={classes.text}>
        Admin Dashboard  
    </Typography>
    {/*
    <Button onClick={players.length > 0 && clickSubmitPlayers} fullWidth variant="contained" color="primary">
    {players.length > 0 && "Create the new players"}
    </Button>
    */}
    {loading && <div className={classes.circularProgress}><CircularProgress/></div>}
    {players && players.map((player, index) => {
    return (
    <div key={player.name} className={classes.player}>
        <p style={{marginRight: 10}}>{player.name}</p>
        <Button onClick={() => pruebaSule(index)} disabled={player.loading} variant="contained" color="primary"> 
            Create Player
        </Button>
    </div>
    )
    })} 
        
</div>)
}
