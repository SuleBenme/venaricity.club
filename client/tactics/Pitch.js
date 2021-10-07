import React, { useState, useEffect } from 'react'
import {makeStyles} from '@material-ui/core/styles'
import pitch from "./images/pitch.png";
import lines from "./images/lines.png";
import squares from "./images/squares.png";
import circles from "./images/circles.png";
import Team from './Team'

const images = {
    "pitch": pitch,
    'lines': lines,
    'squares': squares,
    'circles': circles
}

const useStyles = makeStyles(theme => ({
    pitch : {
        position: 'relative',
        backgroundRepeat: 'round',
    },

    responsive : {
        position: 'relative',
        backgroundRepeat: 'round',
        paddingBottom: '58.3%',
        width: '100%',
    },
    small : {
        position: 'relative',
        backgroundRepeat: 'round',
        height: 350,
        width: 600,
    },
    normal : {
        position: 'relative',
        backgroundRepeat: 'round',
        height: 525,
        width: 900,
    },
    teams : {
        position: 'absolute',
        height: '100%',
        width:' 100%',
        display: 'flex',
    }
    
}))

export default function Pitch(props) {
    const classes = useStyles()
    console.log(props)

    return(<div
    className={classes.small}
    style={ {
        backgroundColor: "#588f58",
        backgroundImage: `url(${images[props.pattern]}), url(${images["pitch"]})`
    } }>
    <div className={classes.teams}>
        <Team squad={props.squad}/>
    </div>
    </div>
    )
}