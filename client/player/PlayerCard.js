import React, { useState, useEffect } from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Logo from './../assets/images/onlyLogo.png'
import Chip from '@material-ui/core/Chip';
import {Link} from 'react-router-dom'

const useStyles = makeStyles(theme => ({
    card: {
        backgroundColor: 'white',
        position: 'relative',
        width: '280px',
        height: '320px',
        overflow: 'hidden',
        boxSizing: 'border-box',
        margin: '10px',
        '&::after': {
          content: '""',
          position: 'absolute',
          background: '-webkit-gradient(linear,left top,left bottom,from(rgba(21,18,17,0)),color-stop(40%,rgba(21,18,17,0)),to(rgba(21,18,17,.6)))',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        },
        [theme.breakpoints.down("xs")]: {
          width: '150px',
          height: '220px',
        }
      },
    imagen: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      maxHeight: '100%',
      backgroundRepeat:' no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'top center',
    }, 

    kitNumber: {
      position: "absolute",
      zIndex: 1,
      height: '70px',
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#040fb5',
      color: 'white',
      width: '50px',
      textAlign: 'center',
      fontSize: '45px',
      [theme.breakpoints.down("xs")]: {
        width: '40px',
        height: '50px',
        fontSize: '34px',
      }
    },
    role: {
      zIndex: 1,
      position: "absolute",
      fontSize: '23px',
      bottom: 0,
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      textAlign: 'center',
      width: '100%',
      padding: 5
    },
    text: {
      position: "absolute",
      zIndex: 1,
      height: '70px',
      bottom: 0,
      display: 'flex',
      flexDirection: 'column',
      color: 'white',
      marginLeft: '50px',
      width: '250px',
      fontSize: '21px',
      [theme.breakpoints.down("xs")]: {
        width: 110,
        height: 50,
        marginLeft: 40,
        fontSize: '17px',
      }
    },
    texto: {
      display: 'flex',
      position: 'relative',
      alignItems: 'center',
      height: '35px',
      paddingLeft: '5px'
    },
    chip: {
      display: 'flex',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(0.5),
      },
    },
    flag: {
      width: 40,
      paddingLeft: '0.8rem',
      [theme.breakpoints.down("xs")]: {
        width: 30,
      }
    },
}))

export default function PlayerCard(props){
    const classes = useStyles()

    return(
      <Link to={'/players/' + props.player.name}>
        <div className={classes.card}>
          <div style={{backgroundImage: `url("${props.player.image ? props.player.image : Logo}")`}} className={classes.imagen}>
            <div className={classes.bottomContainer}>
              {props.player.role == 2 ? 
              <div className={classes.role}>
                <div>{props.player.name}</div>
                <div>{props.player.role_description}</div>
              </div>
              : (<>
              <div className={classes.kitNumber}>{props.player.kitNumber ? props.player.kitNumber : 0 }</div>
              <div className={classes.text}>
                <div className={classes.texto}>
                  {props.player.name} 
                  <img src={props.player.country && require(`./flags/${props.player.country.countryCode.toLowerCase()}.svg`)} className={classes.flag}/>
                </div>
                <div className={classes.chip}>
                  {props.player.specificPosition.map((position,i) => {
                    return (
                    <span key={i}>
                      <Chip
                      label={position}
                      color="primary"
                      />
                    </span>
                    );
                  })}
                </div>
              </div>
              </>
              )}
            </div>
          </div>
        </div>
      </Link> 
    )
}