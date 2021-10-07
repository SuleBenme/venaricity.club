import React, { useState, useEffect } from 'react'
import {makeStyles} from '@material-ui/core/styles'
import { divisions } from '../_utilities/divisions';
import Title_Win from '../assets/images/success-division.svg';

const useStyles = makeStyles(theme => ({
  bar: {
    background: '#e9e9e9',
    border: '1px solid #a4a4a4',
    borderRadius: 6,
    height: 14,
    width: 'calc(100% - 30px)', 
    position: 'relative'
  },  
  custom_markers: {
    borderRadius: 'inherit',
    height: '100%',
    position: 'absolute',
    width: '100%',
  },
  circle_container: {
    backgroundColor: '#fff',
    border: '2px solid #a4a4a4',
    borderRadius: '50%',
    height: 60,
    position: 'absolute',
    top: '-24px',
    transform: 'translateX(-50%)',
    width: 60,
    [theme.breakpoints.down("xs")]: {
      width: 30,
      height: 30,
      top: -9
    },
  },
  title : {
    position: 'relative',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    fontSize: 11,
    fontWeight: 700,
    height: '100%',
    justifyContent: 'center',
    //lineHeight: 11,
  },
  relegation: {
    borderBottomLeftRadius: 'inherit',
    borderTopLeftRadius: 'inherit',
    height: '100%',
    position: 'relative',
    zIndex: 1,
    width: '60.86956521739131%',
    '&::after': {
        borderLeft: '2px dashed #2c2f3e',
        content: "''",
        display: 'block',
        height: 50,
        position: 'absolute',
        right: 0,
        top: '50%',
        transform: 'translateY(-50%)'
    }
  },
  points_container: {
    borderRadius: '6px',
    height: '100%',
    position: 'relative',
    transition: 'width 1s .2s',
    background: '#11ECF2',
    width: '96.43%',
  },
  points: {
    position: 'relative',
    alignItems: 'center',
    backgroundColor: '#fff',
    border: '3px solid #2c2f3e',
    boxShadow: '0 1px 5px 2px rgb(0 0 0 / 15%)',
    display: 'flex',
    fontSize: 20,
    fontWeight: 700,
    height: 56,
    justifyContent: 'center',
    overflow: 'visible',
    width: 56,
    zIndex: 4,
    position: 'absolute',
    right: 0,
    top: '50%',
    transform: 'translate(50%,-50%)',
    borderRadius: '50%',
    [theme.breakpoints.down("xs")]: {
      height: 34,
      width: 34
    },
    '&::after': {
        backgroundColor: '#2c2f3e',
        bottom: 0,
        content: '""',
        height: 7,
        left: '50%',
        position: 'absolute',
        transform: 'translate(-50%,9px)',
        width: 2,
    },
    '&::before': {
        backgroundColor: '#2c2f3e',
        content: '""',
        height: 7,
        left: '50%',
        position: 'absolute',
        top: 0,
        transform: 'translate(-50%,-9px)',
        width: 2,
    }
  },
  circle_data: {
    alignItems: 'center',
    display: 'flex',
    fontSize: 15,
    flexDirection: 'column',
    lineHeight: '15px',
    fontWeight: 700,
    justifyContent: 'center',
    whiteSpace: 'nowrap',
    marginTop: 14,
  },
  title_image: {
    width: 30,
    [theme.breakpoints.down("xs")]: {
      width: 20
    },
  },
  games_sort: {
    display: 'flex',
    '& span': {
      borderRadius: 6,
      fontSize: 15,
      fontWeight: 700,
      height: 22,
      lineHeight: '22px',
      textAlign: 'center',
      width: 22,
      color: '#fff',
      border: 'none',
      display: 'inline-block',
      marginLeft: 6
    }
  }

}))

export default function Division(props){
    const classes = useStyles();
    console.log(props.points);
    const divData = divisions[props.currentDivision];
    console.log(divisions[props.currentDivision]);

    return (
      <>
      <div style={{marginTop: 20, marginBottom: 50, paddingRight: 50, paddingLeft: 20, display: 'flex', alignItems: 'center'}}>
        <img style={{marginRight: 30}} height={80} width={80} 
          src={`https://media.contentapi.ea.com/content/dam/eacom/fifa/pro-clubs/divisioncrest${props.currentDivision}.png`}
        />
        <div className={classes.bar}>
          <div className={classes.custom_markers}>
            <div className={classes.relegation}>
              <div 
              style={{position: 'absolute', right: 0,transform: 'translate(50%,100%)', marginTop: 18}} 
              className={classes.circle_data}>
                <span>{divData['pointsToHoldDivision']}</span>
                <span>Relegation</span>
              </div>
            </div>
            
            <div style= {{left: '100%', zIndex: 2}} className={classes.circle_container}>
                <div className={classes.title}>
                  <img className={classes.title_image} src={Title_Win}></img>
                </div>
                <div className={classes.circle_data}>
                  <span>21</span>
                  <span>Title</span>
                </div>
            </div>
            {props.currentDivision !== 1 &&
              <div style= {{left: divData['pointsForPromotion'] * 100 / divData['pointsToTitle'] + '%' , zIndex: 3}} className={classes.circle_container}>
                <div className={classes.title}>
                  <span>Div</span>
                  <span>1</span>
                </div>
                <div className={classes.circle_data}>
                  <span>20</span>
                  <span>Promotion</span>
                </div>
              </div>
            }
          </div>

          <div style={{ width: props.points * 100 / divData['pointsToTitle'] + '%' }} className={classes.points_container}>
            <div className={classes.points}>
              <div>{props.points}</div>
            </div>
          </div>

        </div>
      </div>
      {/*
      <div style={{display: 'flex', alignItems: 'center', flexWrap:'wrap', padding: '20px 0 20px' }}>
        <div className={classes.games_sort}>
          {props.recentResults.map( (result) => {
            return (
              <>
                {result === "wins" && 
                  <span style={{background: 'linear-gradient(45deg, #19A863 50%, #94D85D 100%)'}}>W</span>
                }
                {result === "losses" &&
                  <span style={{background: 'linear-gradient(45deg, #C4010D 50%, #F80245 100%)'}}>L</span>
                }
                {result === "" &&
                  <span style={{color: 'black', border: '1px solid #c1c1c1'}}>-</span>
                }
              </>
              )
          })} 
        </div>
        <div style={{display: 'flex', fontWeight: 700, marginLeft: 6}}>
          <span>Record:</span>
          <span style={{marginLeft:3, letterSpacing: '2px'}}>{props.record_wins}-{props.record_losses}-{props.record_ties}</span>
        </div>
      </div>
      */}
      </>
    )
}