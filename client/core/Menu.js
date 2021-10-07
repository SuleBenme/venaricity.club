import React, {useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import auth from './../auth/auth-helper'
import {Link, withRouter} from 'react-router-dom'
import Logo from './../assets/images/onlyLogo.png'
import CDMC from './../assets/images/cdmc.jpg'
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer"
import MenuIcon from "@material-ui/icons/Menu"
import Button from '@material-ui/core/Button'
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';


const isActive = (history, path) => {
  if (history.location.pathname == path)
    return {color: '#297bff'}
  else
    return {color: '#000'}
}
const isPartActive = (history, path) => {
  if (history.location.pathname.includes(path))
    return {color: '#297bff'}
  else
    return {color: '#000'}
}
const useStyles = makeStyles(theme => ({
  appBar: {
    position: "fixed",
    zIndex: theme.zIndex.drawer + 1,
    boxShadow: "none",
    borderBottom: `1px solid ${theme.palette.grey["100"]}`,
    backgroundColor: "white",
    paddingLeft: 50,
    paddingRight: 50
  },
  inline: {
    display: 'flex',
    alignItems: "center",
  },
  flex: {
    display: "flex",
    [theme.breakpoints.down('900')]: {
      display: "flex",
      justifyContent: "space-evenly",
      alignItems: "center"
    }
  },
  link: {
    textDecoration: "none",
    color: "inherit",
    display: 'flex',
    alignItems: "center",
  },
  productLogo: {
    display: "inline-block",
    borderLeft: `1px solid ${theme.palette.grey["A100"]}`,
    marginLeft: 32,
    paddingLeft: 24,
    [theme.breakpoints.up("md")]: {
      paddingTop: "1.5em"
    }
  },
  tagline: {
    color: 'grey',
    marginLeft: 10,
  },
  iconContainer: {
    display: "none",
    [theme.breakpoints.down('900')]: {
      display: "block"
    }
  },
  iconButton: {
    float: "right"
  },
  tabContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    color: 'black',
    marginLeft: 32,
    [theme.breakpoints.down('900')]: {
      display: "none"
    }
  },
  tabItem: {
    paddingTop: 20,
    paddingBottom: 20,
    minWidth: "auto"
  },
  indicator: {
    top: "0px"
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
    boxShadow:' 0px 8px 16px 0px rgba(0,0,0,0.2)',
    zIndex: 1,
    '& a': {
      display: 'block',
    }
  },
  selectedDrawer: {
    backgroundColor: '#e9e3df'
  },
  unselected: {
    backgroundColor: '#ffffff'
  },
}))
const MenuBar = withRouter(({history}) => {
  const classes = useStyles()
  const [menuDrawer, setMenuDrawer] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)
  const [squadOpen, setSquadOpen] = useState(false)
  const [drawer, setDrawer] = useState(-1)
  
  const handleClick = (index) => event => {
    //console.log(index)
    if(index === 1){
      setAboutOpen(!aboutOpen)
    } else{
      setSquadOpen(!squadOpen)
    }
    setDrawer(index);
  }

  const mobileMenuOpen = event => {
    setMenuDrawer(true)
  }

  const mobileMenuClose = event => {
    setMenuDrawer(false);
  }

  return (
  <AppBar  className={classes.appBar}>
    <Toolbar>
    <Grid container alignItems="baseline">
            <Grid item xs={12} className={classes.flex}>
              <div className={classes.inline}>
                <Typography variant="h6" color="inherit" noWrap>
                  <Link to="/" className={classes.link}>
                    <img width={45} src={Logo} alt="Logo" />
                    <span className={classes.tagline}>Venari City</span>
                  </Link>
                </Typography>
              </div>

    <div className={classes.iconContainer}>
      <IconButton
        onClick={mobileMenuOpen}
        className={classes.iconButton}
        aria-label="Menu"
        >
        <MenuIcon color="primary" fontSize="large"/>
      </IconButton>
     </div>
     
    <SwipeableDrawer
      anchor="right"
      open={menuDrawer}
      onClose={mobileMenuClose}
      onOpen={mobileMenuOpen}
    >

    <List 
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader className={classes.subheader} component="div" id="nested-list-subheader">
          Menu
        </ListSubheader>
      }
      //className={classes.root}
    >
      <Link to="/">
        <ListItem button>
              <ListItemText style={isActive(history, "/")}>Home</ListItemText>
        </ListItem>
      </Link>


      <ListItem button onClick={handleClick(1)}>
        <ListItemText>About Venari</ListItemText>
        {aboutOpen === true ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      <Collapse in={aboutOpen === true} timeout="auto" unmountOnExit>
        <List className={classes.selectedDrawer} component="div" disablePadding>
          <ListItem button >
            <Link to="/about-us">
              <ListItemText style={isActive(history, "/about-us")}>About Us</ListItemText>
            </Link>
          </ListItem>
          <ListItem button >
            <Link to="/history">
              <ListItemText style={isActive(history, "/history")}>History</ListItemText>
            </Link>
          </ListItem>
          <ListItem button>
            <Link to="/partners">
              <ListItemText style={isActive(history, "/partners")}>Club Partners</ListItemText>
            </Link>
          </ListItem>
          <ListItem button>
            <Link to="/careers">
              <ListItemText style={isActive(history, "/careers")}>Careers</ListItemText>
            </Link>
          </ListItem>
          <ListItem button>
            <Link to="/contact-us">
              <ListItemText style={isActive(history, "/contact-us")}>Contact Us</ListItemText>
            </Link>
          </ListItem>
          <ListItem button>
            <Link to="/report">
              <ListItemText style={isActive(history, "/report")}>Report bug</ListItemText>
            </Link>
          </ListItem>
        </List>
      </Collapse>

      <ListItem button onClick={handleClick(2)}>
        <ListItemText>Squad</ListItemText>
        {squadOpen === true ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      <Collapse in={squadOpen === true} timeout="auto" unmountOnExit>
        <List className={classes.selectedDrawer} component="div" disablePadding>
          <Link to="/players">
            <ListItem button>
              <ListItemText style={isActive(history, "/players")}>Players</ListItemText>
            </ListItem>
          </Link>
          <Link to="/stats">
            <ListItem button>
              <ListItemText style={isActive(history, "/stats")}>Stats</ListItemText>
            </ListItem>
          </Link>
          <Link to="/lastResults">
            <ListItem button>
              <ListItemText style={isActive(history, "/lastResults")}>Results</ListItemText>
            </ListItem>
          </Link>
          <Link to="/rules">
            <ListItem button>
              <ListItemText style={isActive(history, "/rules")}>Rules</ListItemText>
            </ListItem>
          </Link>
          <Link to="/league">
            <ListItem button>
              <ListItemText style={isActive(history, "/league")}>League</ListItemText>
            </ListItem>
          </Link>
          <Link to="/player-roles">
            <ListItem button>
                <ListItemText style={isActive(history, "/player-roles")}>Player Roles</ListItemText>
            </ListItem>
          </Link>
          <Link to="/tactics">
            <ListItem button>
              <ListItemText style={isActive(history, "/tactics")}>Tactics</ListItemText>
            </ListItem>
          </Link>
        </List>
      </Collapse>

      <Link to="/recruitment">
        <ListItem button>
            <ListItemText style={isActive(history, "/recruitment")}>Join Us</ListItemText>
        </ListItem>
      </Link>

      {auth.isAuthenticated() && auth.isAuthenticated().user.manager && 
      <Link to="/admin">
        <ListItem button>
          <ListItemText style={isActive(history, "/admin")}>Admin</ListItemText>
        </ListItem>
      </Link>
      }
  
    {!auth.isAuthenticated() && ( <>
      <Link to="/signin">
        <ListItem button>
          <ListItemText style={isActive(history, "/signin")}>Sign in</ListItemText>
        </ListItem>
      </Link>
      <Link to="/signup">
        <ListItem button>
          <ListItemText style={isActive(history, "/signup")}>Sign up</ListItemText>
        </ListItem>
      </Link>
      </>
    )}

    {auth.isAuthenticated() && (<>
      <Link to={"/user/" + auth.isAuthenticated().user._id}>
        <ListItem button>
          <ListItemText style={isActive(history, "/user/" + auth.isAuthenticated().user._id)}>My Profile</ListItemText>
        </ListItem>
      </Link>
      <ListItem button>
        <ListItemText onClick={() => {
          auth.clearJWT(() => history.push('/'))
        }}>Sign out</ListItemText> 
        </ListItem>
        </>     
      )}
   
      <a href="https://cdmcmachine.com" target="_blank"><img style={{padding: '8px 16px'}} width={90} src={CDMC} alt="CDMC MACHINE IMAGE"/></a>

    </List>  
    </SwipeableDrawer> 

    <div className={classes.tabContainer}>
      <div style={{display: 'flex'}}>
      <Link to="/">
        <Button style={isActive(history, "/")}>Home</Button>
      </Link>

      <div className={classes.dropdown}>
      <Button>
        About Venari
      </Button>
      <div className={classes.dropdownContainer}>

      <List className={classes.white} component="div" disablePadding>
          <ListItem button>
            <Link to="/about-us">
              <ListItemText style={isActive(history, "/about-us")}>About Us</ListItemText>
            </Link>
          </ListItem>
          <ListItem button >
            <Link to="/history">
              <ListItemText style={isActive(history, "/history")}>History</ListItemText>
            </Link>
          </ListItem>
          <ListItem button>
            <Link to="/partners">
              <ListItemText style={isActive(history, "/partners")}>Club Partners</ListItemText>
            </Link>
          </ListItem>
          <ListItem button>
            <Link to="/careers">
              <ListItemText style={isActive(history, "/careers")}>Careers</ListItemText>
            </Link>
          </ListItem>
          <ListItem button>
            <Link to="/contact-us">
              <ListItemText style={isActive(history, "/contact-us")}>Contact Us</ListItemText>
            </Link>
          </ListItem>
          <ListItem button>
            <Link to="/report">
              <ListItemText style={isActive(history, "/report")}>Report bug</ListItemText>
            </Link>
          </ListItem>
          </List>
      </div>
    </div>

    <div className={classes.dropdown}>

    <Button>
        Squad
    </Button>

    <div className={classes.dropdownContainer}>
   
    <List className={classes.white} component="div" disablePadding>
          <Link to="/players">
            <ListItem button>
              <ListItemText style={isActive(history, "/players")}>Players</ListItemText>
            </ListItem>
          </Link>
          <Link to="/stats">
            <ListItem button>
              <ListItemText style={isActive(history, "/stats")}>Stats</ListItemText>
            </ListItem>
          </Link>
          <Link to="/lastResults">
            <ListItem button>
              <ListItemText style={isActive(history, "/lastResults")}>Results</ListItemText>
            </ListItem>
          </Link>
          <Link to="/rules">
            <ListItem button>
              <ListItemText style={isActive(history, "/rules")}>Rules</ListItemText>
            </ListItem>
          </Link>
          <Link to="/league">
            <ListItem button>
              <ListItemText style={isActive(history, "/league")}>League</ListItemText>
            </ListItem>
          </Link>
          <Link to="/player-roles">
            <ListItem button>
                <ListItemText style={isActive(history, "/player-roles")}>Player Roles</ListItemText>
            </ListItem>
          </Link>
          <Link to="/tactics">
            <ListItem button>
              <ListItemText style={isActive(history, "/tactics")}>Tactics</ListItemText>
            </ListItem>
          </Link>
        </List>
    </div>
    </div>

    <Link to="/recruitment">
        <Button variant="outlined" color="primary" style={isActive(history, "/recruitment")}>Join us</Button>
    </Link>
    </div>
    
    <div style={{display: 'flex', alignItems: 'center'}}>
    {auth.isAuthenticated() && auth.isAuthenticated().user.manager && 
      <Link to="/admin">
        <Button variant="outlined" color="primary" style={isActive(history, "/admin")}>Admin</Button>
      </Link>
    }
  
    {!auth.isAuthenticated() && ( <>
        <Link to="/signin">
          <Button variant="outlined" color="primary" >Sign in</Button>
        </Link>

        <Link style={{marginLeft: 10}} to="/signup">
          <Button variant="contained" color="primary">Sign up</Button>
        </Link>
      </>
    )}

    {auth.isAuthenticated() && (<>
        <Link style={{marginLeft: 10}} to={"/user/" + auth.isAuthenticated().user._id}>
          <Button variant="outlined" color="primary" style={isActive(history, "/user/" + auth.isAuthenticated().user._id)}>My Profile</Button>
        </Link>
        <Button style={{marginLeft: 10}} variant="outlined" color="primary" onClick={() => {
          auth.clearJWT(() => history.push('/'))
        }}>Sign out</Button> 
        </>     
      )}
      <a href="https://cdmcmachine.com" target="_blank"><img width={90} style={{marginLeft: 10}} src={CDMC} alt="CDMC MACHINE IMAGE"/></a>
    </div>

    </div>
    </Grid>
    </Grid>
    </Toolbar>
  </AppBar>
 )})

export default MenuBar
