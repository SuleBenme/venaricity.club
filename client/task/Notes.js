import React, {useState, useEffect, Fragment} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Draggable, {DraggableCore} from 'react-draggable'; // Both at the same time
import { Resizable, ResizableBox } from 'react-resizable';
import "./styles.css"
import Button from '@material-ui/core/Button';
import {create, list, update} from './api-task'
import RemoveNote from './RemoveNote'

const useStyles = makeStyles((theme) => ({
  wrapper: {
    marginTop: theme.spacing(10),
    margin: 'auto',
    maxWidth: 600,
    width: '100%',
  },
  box: {
    position: 'absolute',
    background:' #ccc',
    border: '1px solid black',
    textAlign: 'center',
    boxSizing: 'border-box',
    overflow: 'hidden',
  },
  inside: {
    height: '100%'
  },
  resize: {
    width: '100%',
    height: 'calc(100% - 48px)',
    resize: 'none',
    padding: 0,
    display: 'block',
    margin: 0, 
    boxSizing: 'border-box',
    border: 'none',
    outline: 'none',
  },
  button: {
    //marginTop: 150,
  },
  draggable: {
    padding: 0
  },
  info: {
    width: '100%',
    maxWidth: 400,
    padding: 10,
    marginTop: 70,
  }
}));

export default function NestedList() {
  const classes = useStyles()
  const [loading, setLoading] = useState(false)
  const [task, setTask] = useState()

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    list(signal).then((data) => {
        if (data && data.error) {
          console.log(data.error)
        } else {
            console.log(data)
            setTask(data)
        }
    })
    return function cleanup(){
        abortController.abort()
    }
  }, [])

 const savePosition = (e, position, task) =>  {
   //console.log(task)
   const {x, y} = position;
   task.x = x
   task.y = y
   
   update(task).then((data) => {
    if (data && data.error) {
      alert('Error: ' + data.error)
    } 
  })
 }


  const onResizeStop = (task, size) => {
    console.log(size.width + " and " + size.height)
    task.width = size.width 
    task.height = size.height 
    
    update(task).then((data) => {
      if (data && data.error) {
        alert('Error: ' + data.error)
      } 
    })
  };

  const clickSubmit = () => {
    setLoading(true)

    const task = {
        title: 'New Note',
        description: "Type here...",
        width: 200,
        height: 200,
        y: 70,
        x: 120,
    }

    create(task).then((data) => {
      if (data && data.error) {
        alert('Error: ' + data.error)
      } else {
        addTask(data)
      }
      setLoading(false)
    })
  }

  const save = (task) => {
    //task.description = "Funciona"
    console.log(task)
    update(task).then((data) => {
      if (data && data.error) {
        alert('Error: ' + data.error)
        console.log(data.error)
      } else {
        alert('SAVED')
        console.log(data);
      }
    }) 
  }

  const addTask = (newTask) => {
    setTask([...task, newTask])
  }

  const handleChange = (taskId) =>  event => {
    const newList = task.map((task) => {
      if (task._id === taskId) {
        task.description = event.target.value
        return task;
      }
      return task;
    });
    setTask(newList); 
  }

  const deleteNote = (taskId) => {
    setTask(task.filter(task => task._id !== taskId))
  }

  return (<>

  <div className={classes.info}>
  <p>Only click the save button when you have typed something because the position and size are automatically saved every time you drag or resize the note, so there is no need to save every time you drag or resize the note. 
     You are probably going to find bugs, so report them to me. The color will be implemented, and other features like naming the note later
  </p>
  <Button className={classes.button} onClick={clickSubmit} variant="contained" color="primary" disabled={loading}>
  {loading ? 'Wait...' : 'New note'}
  </Button>
  </div>
  

  {task && task.map((task) => (

      <Draggable 
      //className={classes.draggable}
      key={task._id}
      //axis="x"
      //handle=".handle"
      defaultPosition={{x: task.x, y: task.y}}
      //position={values}
      //position={null}
      //grid={[25, 25]}
      onDrag={() => console.log("onDrag")}
      cancel={".react-resizable-handle"}
      onStop={(e, position) => savePosition(e, position, task)}
      >
      <ResizableBox
        className={classes.box} 
        width={task.width} 
        height={task.height}
        onResizeStop={(event, {element, size, handle}) => onResizeStop(task, size)}          
      >
        <div style={{height: '100%'}}>
          <div style={{height: 23}}>
            <RemoveNote deleteNote={deleteNote} taskId={task._id}/>      
          </div>
        
          <textarea className={classes.resize} value={task.description} onChange={handleChange(task._id)}></textarea> 
          
          <Button style={{width: '100%', height: 25, borderRadius: 'unset'}} onClick={() => save(task)}  variant="contained" color="primary" >
            Save
          </Button>
        </div>
      
      </ResizableBox>      
  </Draggable>
    ))}
    </>
    
  )
}