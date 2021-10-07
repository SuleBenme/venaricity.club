import React, { useState, useContext } from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';
import auth from './../auth/auth-helper'
import {update} from './api-tactis'
import TextField from '@material-ui/core/TextField'
import { prueba as AppContext }  from "./Tactics.js"

const useStyles = makeStyles(theme => ({
    playerView : {
        height: '20%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    player : {
        position: 'relative',
        borderRadius: '50%',
        paddingTop: 45,
        width: 45,
        '&:hover':{
            '& $dropdownContainer': {
              display: 'block'
            }
          }
    },
    number : {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)'
    },
    dropdown: {
        overflow: 'hidden',
        '&:hover':{
          '& $dropdownContainer': {
            display: 'block'
          }
        }
      },
    dropdownContainer: {
        display: 'none',        
        position: 'absolute',
        backgroundColor: '#f9f9f9',
        minWidth: 300,
        //width: '100%',
        padding: '12px 16px',
        boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
        zIndex: 5,
    },
    textarea: {
        resize: 'none',
        width: '100%',
        height: '100%',
        fontSize: 20,
        boxSizing: 'border-box',
        fontFamily: 'Dosis',
    },
    textField: {
        marginBottom: 15
    }

}))

export default function Player(props) {
    const classes = useStyles()
    const [loading, setLoading] = useState(false)
    const { changeState, team} = useContext(AppContext)
    const [values, setValues] = useState({
        content: props.content.content,
        specific_position: props.content.specific_position,
        errors: []
    })

    const clickSubmit = () => {
        if(!values.content){
            //setValues({ ...values, error: "Fill in the required text fields"})
            alert("Fill in the editor field")
            return;
        } 
        setLoading(true)

        const rule = {
            content: values.content || undefined,
            position: props.position,
            specific_position: values.specific_position || undefined,
            index: props.index,
            _id : props._id
        }
        //console.log(rule)
    
        update(rule).then((data) => {
          if (data && data.error) {
              setValues({...values, error: data.error})
          } else {
              console.log(data);
              let update = team
              update[rule.position][rule.index].content = rule.content
              update[rule.position][rule.index].specific_position = rule.specific_position
              //console.log(update)
              changeState(update)
              //setValues({...values, content: ''})
          }
          setLoading(false)
        })
    }

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
      }

   // console.log(props)

    return(
        <div className={classes.playerView}>

        <div
            className={classes.player}
            style={ { backgroundColor: 'rgb(214, 203, 101'} }
        >

            <div
                className={classes.number}
                //style={ { color: 'rgb(240, 128, 128)' } }
            >{values.specific_position}</div>

            <div className={classes.dropdownContainer}>
                <TextField label="Position" fullWidth className={classes.textField} value={values.specific_position} onChange={handleChange('specific_position')}/>
                <textarea onChange={handleChange('content')} value={values.content} className={classes.textarea}/>
                <Button  onClick={clickSubmit} variant="contained" color="primary" disabled={loading}> 
                {loading ? 'Wait...' : 'Create'}
                </Button>
            </div>

        </div>
    </div>
    )
}