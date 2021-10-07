import React, {useState, useEffect}  from "react";
import { makeStyles } from '@material-ui/core/styles';
import Calendar from 'react-calendar';
import {list, remove, create} from './api-tournament'
import auth from './../auth/auth-helper'
import Prueba from './Prueba'
import './css.css'

const useStyles = makeStyles(theme => ({
    form: {
        minWidth: 500,
        [theme.breakpoints.down("xs")]: {
          minWidth: 380,
        },
    },
    input: {
      display: 'none'
    },
    filename:{
      marginLeft:'10px'
    },
    formControl: {
      minWidth: 200,
      marginTop: theme.spacing(3),
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    withoutLabel: {
      marginTop: theme.spacing(3),
    },
    reponsiveImage: {
      marginTop: theme.spacing(3),
      width: '100%',
      maxWidth: '400px',
      height: 'auto',
      display: 'block'
    },
    tournament: {
      backgroundColor: '#ff9b99'
    }
}))
export default function CalendarComponent() {
    const classes = useStyles();
    const jwt = auth.isAuthenticated()
    const [value, onChange] = useState(new Date());
    const [dates, setDates] = useState([])
    const [date, setDate] = useState('')
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal

        list({t: jwt.token}, signal).then((data) => {
          if (data && data.error) {
            console.log(data.error)
          } else {
            setDates(data);
            //console.log(data)
          }
        })
    
        return function cleanup(){
          abortController.abort()
        }
    }, [])

    const onClickDay = date => {
        setDate(date)

        for (let i = 0; i < dates.length; i++){
            if(shallowEqual(new Date(dates[i].date), date)){
                setDate(dates[i])   
                break;   
            }
        }
        setOpen(true)
    }
    
    const shallowEqual = (date1, date2) => {
    
        if (date1.getMonth() !== date2.getMonth()) {
        return false;
        }
    
        if (date1.getDate() !== date2.getDate()) {
        return false;
        }
    
        return true;
    }
    //console.log(dates)

    /*
    const tileContent= ({ activeStartDate, date, view }) =>  {
        console.log(view)
        for (let i = 0; i < dates.length; i++){
            let casa = shallowEqual(new Date(dates[i].date), date);  
            if(casa){
                return view === 'month' && casa ?   <span>Hola</span> : null
            }
        }
    }
    */

    const tileClassName = ({date, view}) => {
      //console.log(view)

      for (let i = 0; i < dates.length; i++){
        let casa = shallowEqual(new Date(dates[i].date), date);  
        if(casa){
          let condition = view === 'month' && casa;
          return condition ? classes.tournament : null
        }
      } 
    };

    const handleClose = () => {
        setOpen(false)
    }
    const addDate = (date) => {
        setDates([...dates, date])
        setOpen(false)
    }

    const deleteDate = (dateId) => {
        setDates(dates.filter(date => date._id !== dateId))
        setOpen(false)
    }

    console.log("Tournament Componente: " +open)

return(<>
    <Calendar
        onChange={onChange}
        value={value}
        onClickDay={onClickDay}
        //tileContent={tileContent}
        tileClassName={tileClassName}
    /> 
    <Prueba deleteDate={deleteDate} addDate={addDate} close={handleClose} prueba={open} date={date}/>
    </>
  )
}
