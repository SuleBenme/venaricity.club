import React, {useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import YouTubeIcon from '@material-ui/icons/YouTube'
import FacebookIcon from '@material-ui/icons/Facebook'
import {Link, withRouter} from 'react-router-dom'

const useStyles = makeStyles(theme => ({
    footerContainer: {
        backgroundColor: '#fff',
        marginTop: 'auto',
        bottom: 0
    },
    container: {
        maxWidth: '1550px',
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: '1.25rem',
    },
    social: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        marginLeft: '3px'
    },
    contact: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        paddingLeft: '1.25rem',
        paddingRight: '1.25rem',
        [theme.breakpoints.down("xs")]: {
            display: 'block',
        }

    },
    copyright: {
        lineHeight: '1.71',
        letterSpacing: '.3px',
        color: '#423f3c',
        textAlign: 'center',
        padding: '.25rem 1.25rem 1rem',
    },
    item: {
        padding:' 0 .7rem',
        display: 'block',
        fontWeight: 500,
        fontStyle: 'normal',
        letterSpacing: '.3px',
        fontSize: '.875rem',
        color:' #140a47',
        textAlign: 'center',
        textDecoration: 'none',
        textTransform: 'uppercase',
        transition: 'color .3s ease-in-out',
        cursor: 'pointer',
        [theme.breakpoints.down("xs")]: {
            padding: '1.3125rem 1rem',
            borderTop: '1px solid rgba(0,0,0,.2)',
        },
        '&:hover': {
            color: "#03f",
         },
    }
}))
const Footer = withRouter(({history}) => {
  const classes = useStyles()
  //console.log(history.location.pathname)
  if((history.location.pathname !== "/manager/tasks") && (history.location.pathname !== "/admin")) {
    return (
        <div className={classes.footerContainer}>
            <div className={classes.container}>
                <div className={classes.social}>  
                    <a style={{color: '#000'}} href='https://www.youtube.com/channel/UCaeqGRZcLoQDHi1jN55hWHA' target="_blank"><YouTubeIcon className={classes.icon}/></a>
                    <a style={{color: '#000'}} href='https://www.facebook.com/VenariCity' target="_blank"><FacebookIcon className={classes.icon}/></a>
                </div>
            </div>
            <div className={classes.contact}>
                <Link className={classes.item} to={"contact-us"}>Contact us</Link>
                <a className={classes.item}>Privacy policy</a>
                <a className={classes.item}>TERMS & CONDITIONS</a>
            </div>
            <div className={classes.copyright}>
                © 2020 Venari Ciy. All rights reserved. No part of this site may be reproduced without our written permission.
            </div>
        </div>
    )}
    return null;
})

export default Footer
