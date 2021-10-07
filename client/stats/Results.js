import React, { useState, useEffect } from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {list} from './api-stats.js'
import LastMatch from './LastMatch'
import Loading from '../_utilities/loading'

const useStyles = makeStyles(theme => ({
  lastGames: {
    width: '100%',
    //maxWidth: '1200px',
   // paddingRight: '15px',
   // paddingLeft: '15px',
    marginRight: 'auto',
    marginLeft: 'auto',
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.spacing(11),
    boxShadow: '0px 5px 10px 0px rgba(0, 0, 0, 0.09)',
    marginBottom: '40px',
    boxSizing: 'border-box',
  },
  wrapper: {
      paddingLeft: 65,
      paddingRight: 65,
  },
}))

export default function StatsPage(){
    const classes = useStyles()
    const [stats, setStats] = useState()
    const [loading, setLoading] = useState(true)

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
                setLoading(false)
            }
        })
        return function cleanup(){
          abortController.abort()
        }
    }, [])

    return (
    <>
        {!loading ? 
            <div className={classes.lastGames}>
            {stats && stats.recent_matches.map((match, i) => {
                return (
                <LastMatch key={i} padding={'50px 15px'} height={'80px'} goal={50} recentMatch={match} keys={Object.keys(match.clubs)} />
                )
            })}
            </div>
            : <Loading/>
        }
        </>
    )
}