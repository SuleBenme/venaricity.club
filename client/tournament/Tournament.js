import React, {useState, useEffect}  from "react"
import PropTypes from 'prop-types'
import { makeStyles, withStyles  } from '@material-ui/core/styles'
import {read} from './api-tournament.js'
import ScheduleIcon from '@material-ui/icons/Schedule'
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import Typography from '@material-ui/core/Typography';
import MedalBronze from './../assets/images/prizes/medal.svg'
import MedalGold from './../assets/images/prizes/medal1.svg'
import MedalSilver from './../assets/images/prizes/medal2.svg'
import NewPost from './../post/NewPost'
import FifaLogo from './../assets/images/prueba.png'
import PersonIcon from '@material-ui/icons/Person'
import Avatar from '@material-ui/core/Avatar';
import PostList from './../post/PostList'
import Button from '@material-ui/core/Button';
import config from './../../config/config'
import NewPayment from './../stripe/NewPayment'
import {loadStripe} from '@stripe/stripe-js';
import GroupChat from './../tournament/GroupChat'
import auth from './../auth/auth-helper'

const stripePromise = loadStripe(config.stripe_test_api_key);

  const AntTab = withStyles((theme) => ({
    root: {
      textTransform: 'none',
      minWidth: 72,
      fontWeight: theme.typography.fontWeightRegular,
      marginRight: theme.spacing(4),
      color: 'white',
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:hover': {
        color: '#40a9ff',
        opacity: 1,
      },
      '&$selected': {
        color: '#1890ff',
        fontWeight: theme.typography.fontWeightMedium,
      },
      '&:focus': {
        color: '#40a9ff',
      },
    },
    selected: {},
  }))((props) => <Tab disableRipple {...props} />);
  
function TabPanel(props) {
    const { children, value, index, ...other } = props;
   
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
            <div>{children}</div>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

const useStyles = makeStyles(theme => ({
    container: {
        marginTop: theme.spacing(10),
        margin: '0 auto',
        backgroundColor: '#3D4351',
        color: 'white',
    },
    cover: {
        height: '150px',
        background: '#272b34'
    },
    coverImage: {
        height: '100%',
        width: '100%',
        objectFit: 'cover'
    },
    torunamentContent: {
        paddingLeft: '40px',
        paddingRight: '40px'
    },
    header: {
        borderBottom: 'solid 1px #BABABA',
        paddingBottom: '1.2rem',
    },
    title: {
        fontSize: '24px',
        fontWeight: 'bold',
        paddingTop: '10px',
        paddingBottom: '10px',
        color: 'white'
    },
    titleTab: {
        fontSize: '24px',
        fontWeight: 'bold',
        paddingBottom: '10px',
        color: 'white'
    },
    metaList: {
        paddingLeft: '0',
        marginBottom: 0,
        marginTop: 0, 
        listStyleType: 'none',
        display: 'flex',
        alignItems: 'center',
        [theme.breakpoints.down("800")]: {
            display: 'block',
        }
    },
    item: {
        marginRight: '24px',
        display: 'flex',
        alignItems: 'center',
    },
    itemText: {
        marginLeft: '4px'
    },
    icon: {
        textAlign: 'center'
    },

    //Panel (Tabs)
    panelContainer: {
        padding: '0 40px'
    },
    panel: {
        backgroundColor: '#3D4351',
        borderRadius: '4px',
        marginBottom: '24px',
        overflow: 'hidden',
        marginTop: theme.spacing(7),
        padding: '20px'
    },
    padded: {
        paddingLeft: '24px',
        paddingRight: '24px',
    },
    card: {
        borderBottomLeftRadius: '4px',
        borderBottomRightRadius: '4px',
        backgroundColor: '#444b5a',
        color: 'white'
    },
    gradientGold: {
        height: '4px',
        background: 'linear-gradient(68.15deg, #FFEFA4 2.54%, #C97F03 97.6%)'
    },
    gradientSilver: {
        height: '4px',
        background:' linear-gradient(90.17deg, #F0F0F5 0%, #7C7CA3 100%)'
    },
    gradientBronze: {
        height: '4px',
        background: 'linear-gradient(359.54deg, #AF4F1F 17.61%, #FFD0BE 100%)'
    },
    gradientUser: {
        height: '4px',
        background: 'rgb(2,0,36)',
        background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)',
    },
    rankContainer: {
        padding: '16px',
        display: 'flex',
        alignItems: 'center'
    },
    rank: {
        flex: '0 0 64px',
        marginRight: '8px'
    },
    list: {
        display: 'grid',
        gridGap: '24px 16px',
        gridTemplateColumns: '1fr 1fr 1fr',
        [theme.breakpoints.down("800")]: {
            gridTemplateColumns: '1fr',
        }
    },
    register: {
        marginRight: '1rem',
        fontSize: '12px',
        color: '#fff',
        textTransform: 'uppercase',
        fontWeight: '700',
        letterSpacing: '0.09em',
        backgroundColor: '#FF7324',
        borderColor: '#FF7324',
        borderRadius: '2px',
    }
}))

export default function Tournament({match}) {
    const classes = useStyles();
    const [value, setValue] = useState(0)
    const [tournament, setTournament] = useState()
    const [posts, setPosts] = useState([])
    const [messages, setMessages] = useState([])

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
        
        read({tournamentId: match.params.tournamentId}, signal).then((data) => {
          if (data && data.error) {
            console.log(data.error)
          } else {
            //console.log(data)
            setTournament(data)
            setPosts(data.comments)
            setMessages(data.messages)
          }
        })

        const interval = setInterval(() => read({tournamentId: match.params.tournamentId}, signal).then((data) => {
            if (data && data.error) {
              console.log(data.error)
            } else {
              //console.log(data)
              setTournament(data)
              setPosts(data.comments)
              setMessages(data.messages)
            }
          }), 5000)
        return () => {
          clearInterval(interval);
        }
        /*
        return function cleanup(){
          abortController.abort()
        }*/
    }, [])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    const addPost = (post) => {
        const updatedPosts = [...posts]
        updatedPosts.unshift(post)
        setPosts(updatedPosts)
    }

    const addMessage = (message) => {
        //console.log(message)
        //setMessages(message)
        const abortController = new AbortController()
        const signal = abortController.signal

        read({tournamentId: match.params.tournamentId}, signal).then((data) => {
            if (data && data.error) {
              console.log(data.error)
            } else {
              //console.log(data)
              setTournament(data)
              setPosts(data.comments)
              setMessages(data.messages)
            }
          })
    }

    const removePost = (post) => {
        const updatedPosts = [...posts]
        const index = updatedPosts.indexOf(post)
        updatedPosts.splice(index, 1)
        setPosts(updatedPosts)
    }
    
   // console.log(tournament)
  
return(<div>
    <div className={classes.container}>
    <div className={classes.cover}>
        <img className={classes.coverImage} src={FifaLogo}></img>
    </div>
    <div className={classes.torunamentContent}>
        {tournament && <div>
        <div className={classes.title}>
            {tournament.name}
        </div>
        <ul className={classes.metaList}>
            <NewPayment tournamentId={tournament && tournament._id} user={auth.isAuthenticated() && auth.isAuthenticated().user}/>
            
            <li className={classes.item} >
            <PersonIcon/>
            <div className={classes.itemText}>{tournament.users.length} players</div>
            </li>

            <li className={classes.item} >
            <ScheduleIcon/>
            <div className={classes.itemText}> {new Date(tournament.date).toLocaleString()}</div>
            </li>
        </ul>
        </div>
        }  
    <Tabs
      value={value}
      indicatorColor="primary"
      textColor="primary"
      onChange={handleChange}>

        <AntTab label="Group Chat" {...a11yProps(0)} />
        <AntTab label="Players" {...a11yProps(1)} />
        <AntTab label="Results" {...a11yProps(2)} />
        <AntTab label="Comments" {...a11yProps(3)} />

    </Tabs>
    </div>
    </div>  
    
    <TabPanel value={value} index={0}>
        <GroupChat addMessage={addMessage} tournamentId={tournament && tournament._id} messages={messages}/>
    </TabPanel>

    <TabPanel value={value} index={1}>
    <div className={classes.panelContainer}>
    <div className={classes.panel}>
    <div className={classes.padded}>

    <div className={classes.titleTab}>Players</div>

    <div className={classes.list}>
        {tournament && tournament.users.map((user) => {
            return(
            <div ley={user._id} className={classes.card}>
                <div className={classes.gradientUser}></div>
                <div className={classes.rankContainer}>
                    <div className={classes.rank}>
                        <Avatar alt="User image" src={user.byUser.photo} />
                    </div>
                    <div>{user.byUser.name}</div>
                </div>
            </div>
            )
        })}
    </div>
    </div>
    </div>
    </div>
    </TabPanel>

    <TabPanel value={value} index={2}>
    <div className={classes.panelContainer}>
    <div className={classes.panel}>
    <div className={classes.padded}>

    <div className={classes.titleTab}>Prizes</div>

    <div className={classes.list}>
        <div className={classes.card}>
            <div className={classes.gradientGold}></div>
            <div className={classes.rankContainer}>
                <div className={classes.rank}>
                    <div><img width={50} class="icon" src={MedalGold} alt="Icon medal first"/></div>
                </div>
                <div>First</div>
            </div>
        </div>

        <div className={classes.card}>
            <div className={classes.gradientSilver}></div>
            <div className={classes.rankContainer}>
                <div className={classes.rank}>
                    <img width={50} class="icon" src={MedalSilver} alt="Icon medal first"/>
                </div>
                <div>Second</div>
            </div>
        </div>

        <div className={classes.card}>
            <div className={classes.gradientBronze}></div>
            <div className={classes.rankContainer}>
                <div className={classes.rank}>
                    <img width={50} class="icon" src={MedalBronze} alt="Icon medal first"/>
                </div>
                <div>Third</div>
            </div>
        </div>
    </div>
    </div>
    </div>
    </div>
    </TabPanel>

    <TabPanel value={value} index={3}>
    <div className={classes.panelContainer}>
    <div className={classes.panel}>
    <div className={classes.padded}>

       {tournament &&<NewPost addUpdate={addPost} tournamentId={tournament._id}/>}
       <hr/>
       <PostList removeUpdate={removePost} posts={posts}/>
    </div>
    </div>
    </div>
    </TabPanel>
    
</div>
)}
