import React, {useState}  from "react";
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import CreateNews from './CreateNews'
import News from './News'
import Players from './../player/Players'
import Calender from './../tournament/Calendar'
import EventIcon from '@material-ui/icons/Event';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import FaceIcon from '@material-ui/icons/Face';
import CreateIcon from '@material-ui/icons/Create';
import auth from './../auth/auth-helper'
import History from '../history/History'
import ArtTrackIcon from '@material-ui/icons/ArtTrack'
import Button from '@material-ui/core/Button'
import AdminPlayers from './AdminPlayers'
import NotesIcon from '@material-ui/icons/Notes'
import {Link} from 'react-router-dom'
import AppsIcon from '@material-ui/icons/Apps'
import Rule from '../rules/Rules'
import GavelIcon from '@material-ui/icons/Gavel'
import Tactics from '../tactics/Tactics'
import SportsSoccerIcon from '@material-ui/icons/SportsSoccer'
import Partners from '../partner/Partners'
import About from '../about/About'
import ArrowRightIcon from '@material-ui/icons/ArrowRight'

const useStyles = makeStyles(theme => ({
    container: {
      position: 'relative',
      maxWidth: '100%',
      margin: 'auto',
      marginTop: theme.spacing(8),
      marginLeft: 240,
      padding: 20,
      [theme.breakpoints.down("xs")]: {
        marginLeft: 50,
        padding: 10
      }
    },
    root: {
      padding: 30
    },
    toolbar: theme.mixins.toolbar,
    drawer: {
        width: 240,
        flexShrink: 0,
    },
    drawerPaper: {
        width: 240,
        [theme.breakpoints.down("xs")]: {
          width: 50,
        }
    },
    drawerContainer: {
        overflow: 'scroll',
    },
    selectedDrawer: {
      backgroundColor: '#e9e3df'
    },
    unselected: {
      backgroundColor: '#ffffff'
    },
    loadingCircular: {
      position: 'absolute', /* Important */
      top: '50%', /* Position Y halfway in */
      left: '50%', /* Position X halfway in */
      transform: 'translate(-50%,-50%)' /* Move it halfway back(x,y) */
    },
    text: {
      color: 'black',
      [theme.breakpoints.down("xs")]: {
        display: 'none'
      }
    }
}))

export default function Prueba() {
    const classes = useStyles();
    const [drawer, setDrawer] = useState(-1)   

    const componentes = [<CreateNews/>, <About/>, <Players/>, <News/>, <Calender/>, <History/>, <Rule/>, <Tactics/>, <Partners/>]
    const Algo1 = {name: "Create News", icon: <CreateIcon/>}
    const Algo2 = {name: "Players", icon: <FaceIcon />}
    const Algo3 = {name: "News", icon: <AnnouncementIcon/>}
    const Algo4 = {name: "Calender", icon: <EventIcon/>}
    const Algo5 = {name: "History", icon: <ArtTrackIcon/>}
    const Algo6 = {name: "Rules", icon: <GavelIcon/>}
    const Algo7 = {name: "Tactics", icon: <SportsSoccerIcon/>}
    const Algo8 = {name: "Partners", icon: <ArrowRightIcon/>}
    const Algo9 = {name: "About us", icon: <ArrowRightIcon/>}

    console.log("New render")

    const names = [Algo1, Algo9, Algo2, Algo3, Algo4, Algo5, Algo6, Algo7, Algo8]

    const selectDrawer = (index) => event => {
        setDrawer(index)
    }

    return(<div>
        {auth.isAuthenticated() && auth.isAuthenticated().user.educator ? ( 
        <div>
        <Drawer
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        >
        <div className={classes.toolbar} />
        <div className={classes.drawerContainer}>
          <List>
           <ListItem button onClick={selectDrawer(-1)} className={drawer == -1 ? classes.selectedDrawer : classes.unselected}>
              <ListItemIcon><AppsIcon/></ListItemIcon>
              <ListItemText className={classes.text} primary="Admin" />
            </ListItem>
            <Link to="/manager/tasks">
              <ListItem button className={classes.unselected}>
                <ListItemIcon><NotesIcon/></ListItemIcon>
                <ListItemText className={classes.text} primary="Notes" />
              </ListItem>
            </Link>
            {names.map((text, index) => (
              <ListItem button key={index} onClick={selectDrawer(index)} className={drawer == index ? classes.selectedDrawer : classes.unselected}>
                <ListItemIcon>{text.icon}</ListItemIcon>
                <ListItemText className={classes.text} primary={text.name} />
              </ListItem>
            ))}
          </List>
          <Divider />
        </div>
      </Drawer>

      <div className={classes.container}>
      {drawer != -1 ?
      <Paper elevation={3} className={classes.root}>
          {componentes[drawer]}
      </Paper>
       : (<Paper elevation={3} className={classes.root}><AdminPlayers/></Paper>)
       }
      </div>

      </div>
      ) : <div>You are not the admin</div>}
    </div>
    )
}

