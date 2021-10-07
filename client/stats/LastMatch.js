import React, { useState, useEffect } from 'react'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  container: {
    padding: props => props.padding,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    textAlign: 'center',
    background: '#fff',
    boxSizing: 'border-box',
  },
  singleTeam: {
    display: 'inline-block',
    textAlign: 'center',
    background: '#fff',
    borderRadius: '3px',
    boxSizing: 'border-box',
    '& div': {
        height: props => props.height,
        marginBottom: '22px',
        display: 'inline-block',
        position: 'relative',
        '& img': {
            height: '100%',
            width: 'auto',
            maxWidth: '100%',
        }
    },
    '& span': {
        textTransform: 'uppercase',
        fontWeight: 600,
        fontSize: '14px',
        color: '#383838',
        display: 'block',
        opacity: '.9'
    }
  },
  details: {
    display: 'inline-block',
    textAlign: 'center',
  },
  detailsDate: {
    marginBottom: 12,
    '& span': {
        textTransform: 'uppercase',
        fontWeight: 500,
        fontSize: '14px',
        color: '#2a2a2',
        display: 'block',
        opacity: '.9'
    }
  },

  goal: {
    boxSizing: 'border-box',
    '& ul': {
        margin: 0,
        padding: 0,
        listStyle: 'none',
        boxSizing: 'border-box',
        display: 'flex',
        '& li': {
            boxSizing: 'border-box',
            display: 'inline-block',
            height: props => props.goal,
            width: props => props.goal,
            lineHeight: props => props.goal + 'px',
            color: '#c40c49',
            border: '2px dotted #c40c49',
            fontSize: '20px',
            fontWeight: 500,
            borderRadius: '5px',
            margin: '10px',
        }
    },
    '& span': {
        textTransform: 'uppercase',
        fontSize: '12px',
        fontWeight: 500,
        color: '#8c8b8b',
        display: 'block',
        marginTop: '5px'
    }
  }
  
}))

export default function LastGame(props){
    const classes = useStyles(props)

    console.log(props.keys)

    return (
        <div className={classes.container}>
            <div className={classes.singleTeam}>
                <div>
                    <img src={props.recentMatch.clubs[props.keys[0]].details.customKit.isCustomTeam == 0 ? 
                    `https://fifa21.content.easports.com/fifa/fltOnlineAssets/05772199-716f-417d-9fe0-988fa9899c4d/2021/fifaweb/crests/256x256/l${props.recentMatch.clubs[props.keys[0]].details.teamId}.png`
                     : `https://fifa21.content.easports.com/fifa/fltOnlineAssets/05772199-716f-417d-9fe0-988fa9899c4d/2021/fifaweb/crests/256x256/l${props.recentMatch.clubs[props.keys[0]].details.customKit.crestAssetId}.png`}>
                    </img>
                </div>
                <span>{props.recentMatch.clubs[props.keys[0]].details.name}</span>
            </div>

            <div className={classes.details}>
                <div className={classes.detailsDate}>
                    <span>{props.recentMatch.timeAgo.number} {props.recentMatch.timeAgo.unit} Ago</span>
                </div>
                <div className={classes.goal}>
                    <ul>
                        <li>{props.recentMatch.clubs[props.keys[0]].goals}</li>
                        <li>{props.recentMatch.clubs[props.keys[1]].goals}</li>
                    </ul>
                    <span>full time</span>
                </div>
            </div>
            <div className={classes.singleTeam}>
                <div>
                   <img src={props.recentMatch.clubs[props.keys[1]].details.customKit.isCustomTeam == 0 ? 
                    `https://fifa21.content.easports.com/fifa/fltOnlineAssets/05772199-716f-417d-9fe0-988fa9899c4d/2021/fifaweb/crests/256x256/l${props.recentMatch.clubs[props.keys[1]].details.teamId}.png`
                     : `https://fifa21.content.easports.com/fifa/fltOnlineAssets/05772199-716f-417d-9fe0-988fa9899c4d/2021/fifaweb/crests/256x256/l${props.recentMatch.clubs[props.keys[1]].details.customKit.crestAssetId}.png`}>
                    </img>                </div>
                <span>{props.recentMatch.clubs[props.keys[1]].details.name}</span>
            </div>      
        </div>
    )
}