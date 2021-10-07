import React, { useState, useEffect, useContext } from 'react'
import {makeStyles} from '@material-ui/core/styles'
//import SoccerLineUp from 'react-soccer-lineup'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import Pitch from './Pitch'
import {list} from './api-tactis'

const AppContext = React.createContext()
export {AppContext as prueba}

const useStyles = makeStyles(theme => ({
    formControl: {
        minWidth: 200,
        marginTop: theme.spacing(3),
    },
}))

export default function Tactics() {
    const classes = useStyles()
    const [values, setValues] = useState({
        color: '588f58',
        pattern: 'lines',
        showHomeTeam: false,
        showAwayTeam: false,
        formation: '4-2-3-1',
        size: 'responsive',

        homeTeamColor: 'f08080',
        homeTeamNumberColor: 'ffffff',

        awayTeamColor: 'add8e6',
        awayTeamNumberColor: '333333'
    })
    const [tactics, setTactics] = useState([])
    const [team, setTeam] = useState()

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal

        list(signal).then((data) => {
            if (data && data.error) {
                console.log(data.error)
            } else {
                console.log(data)
                for(let i = 0; i < data.length; i++){
                    if(values.formation === data[i].formation) {
                        setTeam(data[i])
                        break
                    }
                }
                setTactics(data)
            }
        })
        return function cleanup(){
            abortController.abort()
        }
    }, [])

    const handleChange = name => event => {
        setValues({...values, [name]: event.target.value })
    }

    const handleChangeFormation = name => event => {
        console.log("Loop")
        for(let i = 0; i < tactics.length; i++){
            if(event.target.value === tactics[i].formation) {
                console.log("Yes")
                setTeam(tactics[i])
                setValues({...values, [name]: event.target.value })
                break
            }
        }
    }
    const tryContext = value => {
        console.log(value)
    }
    //console.log("Render")
    //console.log(values)
    const changeState = team => {
        setTeam(team)
    }
    const contextValue = { changeState, team }


    return(<div>
    <h3>{values.formation}</h3>
    {team && <>
    <AppContext.Provider value={contextValue}>
        <Pitch
            size={values.size}
            squad={team}
            pattern={values.pattern}
        />
    </AppContext.Provider>
    
    <FormControl variant="filled" className={classes.formControl}>
        <InputLabel id="demo-simple-select-filled-label">Change Formation</InputLabel>
            <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={values.formation}
            onChange={handleChangeFormation('formation')}
        >
            <MenuItem value={"4-2-3-1"}>4-2-3-1</MenuItem>
            <MenuItem value={"4-1-2-1-2"}>4-1-2-1-2</MenuItem>
            <MenuItem value={"5-2-1-2"}>5-2-1-2</MenuItem>
        </Select>
    </FormControl>

    <FormControl variant="filled" className={classes.formControl}>
        <InputLabel id="pattern">Pattern</InputLabel>
            <Select
            labelId="pattern"
            id="select-filled"
            value={values.pattern}
            onChange={handleChange('pattern')}
        >
            <MenuItem value={"lines"}>Lines</MenuItem>
            <MenuItem value={"squares"}>Squares</MenuItem>
            <MenuItem value={"circles"}>Circles</MenuItem>
        </Select>
    </FormControl>

    <FormControl variant="filled" className={classes.formControl}>
        <InputLabel id="size">Size</InputLabel>
            <Select
            labelId="size"
            id="select-filled"
            value={values.size}
            onChange={handleChange('size')}
        >
            <MenuItem value={"small"}>Small</MenuItem>
            <MenuItem value={"normal"}>Normal</MenuItem>
            <MenuItem value={"responsive"}>Responsive</MenuItem>
        </Select>
    </FormControl>
    </>}   
    </div>
    )
}