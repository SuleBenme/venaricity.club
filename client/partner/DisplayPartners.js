import React, { useState, useEffect, Fragment } from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {list} from './api-partner.js'
import CircularProgress from '@material-ui/core/CircularProgress';
import {Link} from 'react-router-dom'
import Logo from '../assets/images/onlyLogo.png'
import Loading from '../components/Loading.js';

const useStyles = makeStyles(theme => ({
    wrapper: {
        marginTop: theme.spacing(10),
        marginBottom: theme.spacing(2),
        paddingLeft: 100,
        paddingRight: 100,
        [theme.breakpoints.down('sm')]: {
            paddingLeft: 60,
            paddingRight: 60
        },
        [theme.breakpoints.down('xs')]: {
            paddingLeft: 20,
            paddingRight: 20
        }
    },
    container: {
        marginTop: theme.spacing(2),
        display: 'grid',
        gridTemplateColumns: 'repeat(3,1fr)',
        gridColumnGap: '1.875rem',
        gridRowGap: '1.875rem',
        [theme.breakpoints.down('900')]: {
            gridTemplateColumns: 'repeat(2,1fr)',
        },
        [theme.breakpoints.down('xs')]: {
            gridTemplateColumns: 'repeat(1,1fr)',
        }
    },
    containerCard: {
        position: 'relative',
        width: '100%',
        maxWidth: '100%',
        margin: 0,
    },
    content: {
        display: 'block',
        textDecoration: 'none',
        overflow: 'hidden',
    },
    contentCard: {
        position: 'relative',
        paddingTop: '66.67%',
        overflow: 'hidden',
    },
    image:{
        backgroundRepeat: 'no-repeat',
        position: 'absolute',
        top: 0,
        left: 0,
        display: 'block',
        width: '100%',
        height: '100%',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundColor:' #fff',
        zIndex: 0,
    },
    header: {
        fontSize: '2.5rem',
        fontWeight: 700,
        color: '#3861fb',
        fontStyle: 'normal',
        letterSpacing: '.3px',
        textTransform: 'uppercase',
        margin: '15px 0',
        [theme.breakpoints.down('xs')]: {
            fontSize: '1.8rem',
        }
    },
    title: {
      margin: `${theme.spacing(2)}px ${theme.spacing(1)}px 0`,
      color: theme.palette.protectedTitle,
      fontSize: '1em'
    },
    loadingCircular: {
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      padding: '30px',
    },
}))

export default function DisplayPartners({ match }) {
    const classes = useStyles()
    const [partners, setPartners] = useState({
        principle: [],
        offical: [],
        charity: []
    })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal

        list(signal).then((data) => {
          if (data && data.error) {
            console.log(data.error)
          } else {
            //console.log(data)
            formatPlayers(data)
          }
          setLoading(false)
        })
        return function cleanup(){
          abortController.abort()
        }
    }, [])
    
    const formatPlayers = (players) => {
        let principle = []
        let offical = []
        let charity = []

        players.map((player) => {
            if(player.type == 1){
                principle.push(player)
            }
            if(player.type == 2) {
                offical.push(player)                
            }
            if(player.type == 3){
                charity.push(player)
            }
        })
        setPartners({...partners, principle: principle, offical: offical, charity: charity })
    }

      return (
        <div className={classes.wrapper}>
            {!loading ? <>
            <h4 className={classes.header}>Principle Partners</h4> 
            <div className={classes.container}>
                {partners.principle && partners.principle.map((partner) => {
                    return(
                        <div className={classes.containerCard}>
                            <Link to={"/partners/"+partner._id} className={classes.content} >
                                <div className={classes.contentCard}>
                                    <div style={{backgroundImage: `url(${partner.image ? partner.image : Logo})` }} className={classes.image}/>
                                </div>
                            </Link>
                        </div>
                    )
                })}
            </div>
            <h4 className={classes.header}>Official Partners</h4>
            <div className={classes.container}>
                {partners.offical && partners.offical.map((partner) => {
                    return(
                        <div className={classes.containerCard}>
                            <Link to={"/partners/"+partner._id} className={classes.content} >
                                <div className={classes.contentCard}>
                                    <div style={{backgroundImage: `url(${partner.image ? partner.image : Logo})` }} className={classes.image}/>
                                </div>
                            </Link>
                        </div>
                    )
                })}
            </div>

            <h4 className={classes.header}>Charity Partners</h4>
            <div className={classes.container}>
                {partners.charity && partners.charity.map((partner) => {
                    return(
                        <div className={classes.containerCard}>
                            <Link to={"/partners/"+partner._id} className={classes.content} >
                                <div className={classes.contentCard}>
                                    <div style={{backgroundImage: `url(${partner.image ? partner.image : Logo})` }} className={classes.image}/>
                                </div>
                            </Link>
                        </div>
                    )
                })}
            </div>
            </>
            : (<Loading/>)
            }
        </div>
      )
  }