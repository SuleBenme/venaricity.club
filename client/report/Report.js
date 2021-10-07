import React, {useState, useEffect, Fragment} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import {list, complete} from './api-report'
import auth from './../auth/auth-helper'
import CreateTask from './CreateReport'
import CheckCircle from '@material-ui/icons/CheckCircle'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'
import RemoveTask from './DeleteReport'

const useStyles = makeStyles((theme) => ({
  wrapper: {
    marginTop: theme.spacing(10),
    margin: 'auto',
    maxWidth: 600,
    width: '100%',
  },
  root: {
    //width: '100%',
    marginTop: '0.2rem',
    marginBottom: theme.spacing(2),
    //maxWidth: 600,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  check: {
    color:'#38cc38'
  },
  secondaryAction: {
      paddingRight: 60
  },
  noPadding: {
      padding: 0
  },
  subheader: {
    fontSize: '1rem',
    color: 'black'
  }
}));

export default function NestedList() {
  const classes = useStyles()
  const [task, setTask] = useState()

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    list(signal).then((data) => {
        if (data && data.error) {
          console.log(data.error)
        } else {
            //console.log(data)
          data.map((sections) => {
              sections.open = false})

          setTask(data)
        }
    })
    return function cleanup(){
        abortController.abort()
    }
  }, [])

  const handleClick = index => event => {
    const old = task[index];
    const updated = { ...old, open: !old.open}
    const clone = [...task];
    clone[index] = updated;
    setTask(clone);
  }
  /*
  const markComplete = (index) => {
    let clone = task
    let updatedData = {}
    updatedData.taskId = clone[index]._id
    updatedData.completed = !clone[index].completed

    console.log(updatedData)

    complete(
    {
      t: jwt.token
    }, updatedData).then((data) => {
      if (data && data.error) {
        //setValues({...values, error: data.error})
      } else {
        console.log(data)
        const old = task[index];
        const updated = { ...old, completed: !old.completed}
        const clone = [...task];
        clone[index] = updated;
        setTask(clone);
      }
    })
  } 

  const deleteTask = (taskId) => {
      setTask(task.filter(task => task._id !== taskId))
  }
  */

  const addTask = (newTask) => {
    setTask([newTask, ...task])
  }

  //console.log(task)

  return (<div className={classes.wrapper}>
    <CreateTask addTask={addTask}/>

    <List 
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader className={classes.subheader} component="div" id="nested-list-subheader">
          Bug log
        </ListSubheader>
      }
      className={classes.root}
    >
    {task && task.map((sections, index) => (
    <Fragment key={index}>
      <ListItem className={classes.secondaryAction} button onClick={sections.description && handleClick(index)}>
        <ListItemText>{sections.name}</ListItemText>
        {sections.description && (sections.open === true ? <ExpandLess /> : <ExpandMore />)}
        <ListItemSecondaryAction>
                {/*<RemoveTask deleteTask={deleteTask} taskId={sections._id} />*/}
                <IconButton className={classes.noPadding} /*onClick={() => markComplete(index)}*/>
                  {sections.completed ? 
                  <CheckCircle className={classes.check}/> : <RadioButtonUncheckedIcon/> 
                  }
                </IconButton>
         </ListItemSecondaryAction>
      </ListItem>

      <Collapse in={sections.open === true} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
           <ListItemText>{sections.description}</ListItemText>
          </ListItem>
        </List>
      </Collapse>
    </Fragment>))}
    </List>
    </div>
  )
} 