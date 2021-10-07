import React, {useState, useEffect }  from "react";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { commonFunctions } from "../_utilities/commonFunctions.js";
import './swiper-bundle.min.css'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom'
import Logo from './../assets/images/prueba.svg'
import ScheduleIcon from '@material-ui/icons/Schedule';

// install modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const useStyles = makeStyles(theme => ({
  heading: {
      marginBottom: theme.spacing(3),
      fontWeight: 200
  },
  root: {
      //width: 345,
      //margin: 10,
      [theme.breakpoints.down("xs")]: {
          //width: 250,
      }
  },
  media: {
      height: 150,
      [theme.breakpoints.down("xs")]: {
          margin: 0
      }
  },
  cardsContainer: {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      flexWrap: 'wrap',
  },
  cardActions: {
      justifyContent: 'space-between',
  },
  title: {
      fontFamily: 'Arial,Helvetica,sans-serif',
      fontWeight: 500,
      fontStyle: 'normal',
      letterSpacing: '3px',
      textTransform: 'uppercase',
      fontSize: '1.125rem',
      overflow: 'hidden',
      margin: 0,
      whiteSpace: 'normal',
      wordBreak: 'break-all',
      display: '-webkit-box',
      '-webkit-line-clamp': 2,
      '-webkit-box-orient': 'vertical',
      height: 42,
  },
  loadingCircular: {
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center'
  },

  inline: {
      display: 'flex',
      alignItems: 'center',
      margin: 3,
      color: '#696969',
      fontFamily: 'Lucida Console, Courier, monospace',
      fontSize: '1rem'
  } 
}))
export default function NewsSwiper(props) {
  const classes = useStyles()
  
  return (
        <Swiper
        spaceBetween={50}
        slidesPerView={3}
        navigation
        watchOverflow={true}
        //pagination={{ clickable: true }}
        //scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
           // when window width is >= 640px
        breakpoints={{
        // when window width is >= 640px
        
       1400: {
          slidesPerView: 2,
          spaceBetween: 8
        },
        
        720: {
          slidesPerView: 2,
          spaceBetween: 6
        },
        540: {
          slidesPerView: 2,
          spaceBetween: 4
        },
        250: {
          slidesPerView: 1,
          spaceBetween: 2
        },
        
      }}
      >
        {props.news.map((news) => {
        return ( 
        <SwiperSlide key={news._id}>
          <Card className={classes.root}>
              <CardActionArea>
              <Link to={"/news/"+news._id}>
                  <CardMedia
                  className={classes.media}
                  image={news.image ? news.image : Logo}
                  title="News"
                  />
                  <CardContent>
                  <h3 className={classes.title}>
                      {news.title}
                  </h3>
                  </CardContent>
                </Link>
              </CardActionArea>
              <CardActions className={classes.cardActions}>
              <Link to={"/news/"+news._id}>
                  <Button size="small" color="primary">
                  Read
                  </Button>
              </Link>
              <div className={classes.inline}>
                  <span><ScheduleIcon/></span>
                  <span>{commonFunctions.convertDateToString(new Date(news.date))}</span>
              </div>
              </CardActions>
          </Card>
        </SwiperSlide>
        )})}
      </Swiper>
  );
};