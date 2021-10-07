import React, { useState, useEffect, Fragment } from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {list} from './api-partner.js'
import NewPartner from './NewPartner'
import DeletePartner from './DeletePartner'
import {Link} from 'react-router-dom'
import Logo from '../assets/images/onlyLogo.png'
import UpdatePartner from './UpdatePartner.js'

const useStyles = makeStyles(theme => ({
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
    delete: {
        position: 'absolute',
        top: 0,
        right: 0
    },
    header: {
        fontSize: '2.5rem',
        fontWeight: 700,
        fontStyle: 'normal',
        letterSpacing: '.3px',
        textTransform: 'uppercase',
        margin: '15px 0',
        [theme.breakpoints.down('xs')]: {
            fontSize: '1.5rem',
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
    action: {
        position: 'absolute', 
        right: 0, 
        top: 0, 
        display: 'flex',
        padding: 0, 
        zIndex: 1
    }
}))
export default function Partners() {
    const classes = useStyles()
    const [partners, setPartners] = useState({
        principle: [],
        offical: [],
        charity: []
    })

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal

        list(signal).then((data) => {
          if (data && data.error) {
            console.log(data.error)
          } else {
            formatPlayers(data)
          }
        })
        return function cleanup(){
          abortController.abort()
        }
    }, [])
    
    const addPartner = (partner) => {
        if(partner.type == 1){
            let principle = partners.principle
            principle.unshift(partner)
            setPartners({...partners,  principle: principle})
        }
        if(partner.type == 2) {
            let offical = partners.offical
            offical.unshift(partner)
            setPartners({...partners,  offical: offical})    
        }
        if(partner.type == 3){
            let charity = partners.charity
            charity.unshift(partner)
            setPartners({...partners,  charity: charity})
        }
    }
    const deletePartner = (partnerId, type) => {
        if(type == 1){
            let principle = partners.principle.filter(partner => partner._id !== partnerId)
            setPartners({...partners,  principle: principle})
        }
        if(type == 2) {
            let offical = partners.offical.filter(partner => partner._id !== partnerId)
            setPartners({...partners,  offical: offical})    
        }
        if(type == 3){
            let charity = partners.charity.filter(partner => partner._id !== partnerId)
            setPartners({...partners,  charity: charity})
        }
    }
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
    
    const updatePartner = (updatedPartner, oldType) => {
        if(oldType != updatedPartner.type){
            addPartner(updatedPartner)
            deletePartner(updatedPartner._id, oldType)
            return;
        }

        if(updatedPartner.type == 1){
            const newList = partners.principle.map((item) => {
                if (item._id === updatedPartner._id) {
                  return updatedPartner;
                }
                return item;
            });
            setPartners({...partners,  principle: newList})
        }
        if(updatedPartner.type == 2) {
            const newList = partners.offical.map((item) => {
                if (item._id === updatedPartner._id) {
                  return updatedPartner;
                }
                return item;
            });
            setPartners({...partners,  offical: newList})  
        }
        if(updatedPartner.type == 3){
            const newList = partners.offical.map((item) => {
                if (item._id === updatedPartner._id) {
                  return updatedPartner;
                }
                return item;
            });
            setPartners({...partners,  charity: newList})
        }
    }

      return (
        <>
        <NewPartner addPartner={addPartner}/>

        <div>

        <h4 className={classes.header}>Principle Partners</h4> 
        <div className={classes.container}>
            {partners.principle && partners.principle.map((partner) => {
                return(
                    <div key={partner._id} className={classes.containerCard}>
                        <div className={classes.action}>
                            <UpdatePartner updatePartner={updatePartner} partner={partner} />
                            <DeletePartner partnerId={partner._id} deletePartner={deletePartner}/>
                        </div>
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
                    <div key={partner._id} className={classes.containerCard}>
                        <div className={classes.action}>
                            <UpdatePartner updatePartner={updatePartner} partner={partner} />
                            <DeletePartner partnerId={partner._id} deletePartner={deletePartner}/>
                        </div>
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
                    <div key={partner._id} className={classes.containerCard}>
                        <div className={classes.action}>
                            <UpdatePartner updatePartner={updatePartner} partner={partner} />
                            <DeletePartner partnerId={partner._id} deletePartner={deletePartner}/>
                        </div>
                        <Link to={"/partners/"+partner._id} className={classes.content} >
                            <div className={classes.contentCard}>
                                <div style={{backgroundImage: `url(${partner.image ? partner.image : Logo})` }} className={classes.image}/>
                            </div>
                        </Link>
                    </div>
                )
            })}
        </div>

        </div>
        </>
      )
  }