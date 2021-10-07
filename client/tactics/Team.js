import React, { useState, useEffect } from 'react'
import {createMuiTheme, makeStyles} from '@material-ui/core/styles'
import Player from './Player'

const useStyles = makeStyles(theme => ({
    team : {
        height: '100%',
        width: '80%',
        display: 'inline'
    },
    goalkeeper : {
        height: '100%',
        width: '25%',
        float: 'left',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        pointerEvents: 'none'
    },
    lines : {
        height: '100%',
        width: '75%',
        float: 'right',
        display: 'flex',
    },
    line : {
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    }
}))

export default function Pitch(props) {
    const classes = useStyles()
    //console.log(props.squad)

    return(<div className={classes.team}>
        {props.squad && <>
        
        <div className={classes.goalkeeper}>
            <Player content={
                {specific_position: "GK"}
            } />
        </div> 

         <div className={classes.lines}>
            {props.squad.df.length > 0 && <div className={classes.line}>
            { props.squad.df.map((df, i) => <Player content={df} _id={ props.squad._id} position={"df"} index={i} key={df._id } />) }
            </div> }

            {props.squad.cdm.length > 0 && <div className={classes.line}>
            { props.squad.cdm.map((cdm, i) => <Player content={cdm}  _id={props.squad._id} position={"cdm"} index={i} key={cdm._id} />) }
            </div> }


            {props.squad.cm.length > 0  && <div className={classes.line}>
            { props.squad.cm .map((cm, i) => <Player content={cm}  _id={props.squad._id} position={"cm"} index={i}  key={cm._id} />) }
            </div> }


            {props.squad.cam.length > 0  && <div className={classes.line}>
            { props.squad.cam .map((cam , i) => <Player content={cam}  _id={props.squad._id} position={"cam"} index={i} key={ cam._id} />) }
            </div> }

            {props.squad.fw.length > 0   && <div className={classes.line}>
            { props.squad.fw  .map((fw  , i) => <Player content={fw}  _id={props.squad._id} position={"fw"} index={i}  key={ fw._id} />) }
            </div> }

         </div>
         </>
        }
    </div>
    )
}