import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Sponsor from '../assets/images/cdmc.jpg'
import {Link} from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  wrapper: {
    maxWidth: 550,
    width: '100%',
    margin: 'auto',
    textAlign: 'center',
    //display: 'flex',
    boxSizing: 'border-box',
    alignItems: 'center',
    marginTop: theme.spacing(11),
    marginBottom: theme.spacing(4),
    [theme.breakpoints.down("xs")]: {
      padding: 5
    }
  },
  container: {
      //display: 'flex', 
      //alignItems: 'center',
      '& a': {
        '& div': {
            height: 100,
            position: 'relative',
            [theme.breakpoints.down("xs")]: {
                height: 70,
            },
            '& img': {
                height: '100%',
                width: 'auto',
                maxWidth: '100%',
            }
        },
        '& span': {
            //textTransform: 'uppercase',
            fontWeight: 600,
            fontSize: '17px',
            color: '#383838',
            display: 'block',
            opacity: '.9',
            padding: 5,
        }
      }
  }

  
}))

export default function ContactUsPage (){
  const classes = useStyles()

    return (
    <div className={classes.wrapper}>
        <h3>FEATURED SPONSORS</h3>
        <div className={classes.container}>
            <a href="https://cdmcmachine.com/" target="_blank">
            <div><img src={Sponsor} alt={"CDMC IMAGE"}/></div>
            <span>Cleveland Deburring Machine Company or CDMC </span>
            </a>
        </div>
    </div>)
}