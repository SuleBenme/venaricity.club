import React, { useState, useEffect } from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {list} from './api-stats.js'
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles(theme => ({
  wrapper: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'flex-end',
    paddingLeft: 25,
    paddingRight: 25,
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
}))

export default function TeamStatsHome(){
    const classes = useStyles()
    const [values, setValues] = useState()

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal

        list(signal).then((data) => {
            if (data && data.error) {
                console.log(data.error)
            } else {
                setValues(data)
                //console.log(data)
            }
        })

        return function cleanup(){
          abortController.abort()
        }
    }, [])

    return (<div className={classes.wrapper}>

            <div className={classes.details}>
                <div className={classes.text}>Points</div>
                <div className={classes.number}>{values ? values.teamStats.rankingPoints : <Skeleton variant="text" />}</div>
            </div>

            <div className={classes.details}>
                <div className={classes.text}>Wins</div>
                <div className={classes.number}>{values ? values.teamStats.wins : <Skeleton variant="text" />}</div>
            </div>

            <div className={classes.details}>
                <div className={classes.text}>Losses</div>
                <div className={classes.number}>{values ? values.teamStats.losses : <Skeleton variant="text" />}</div>
            </div>

            <div className={classes.details}>
                <div className={classes.text}>Draws</div>
                <div className={classes.number}>{values ? values.teamStats.ties : <Skeleton variant="text" /> }</div>
            </div>

      {/*
        <div className={classes.flex}>
            <div className={classes.firstContainer}>
                <p className={classes.teamName}>Venari City FC</p>
            </div>

            <div className={classes.secondContainer}>
            <div className={classes.puntosContainer}>
                <p style={{margin:0}}>Points</p>
                <p className={classes.puntos}>{values ? values.teamStats.rankingPoints : <Skeleton variant="text" />}</p>
            </div>
            <div className={classes.partidos}>
                <div>
                    <p>Wins</p>
                    <p>Losses</p>
                    <p>Draws</p>
                </div>
                <div>
                    <p><b>{values ? values.teamStats.wins : <Skeleton variant="text" />}</b></p>
                    <p><b>{values ? values.teamStats.losses : <Skeleton variant="text" />}</b></p>
                    <p><b>{values ? values.teamStats.ties : <Skeleton variant="text" /> }</b></p>
                </div>
            </div>
            </div>
            
        </div>
      */}
    
        </div>
        )
}