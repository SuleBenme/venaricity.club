import React, {useState, Fragment, useRef, useEffect } from 'react'
import auth from './../auth/auth-helper'
import {listMessages, comment} from './api-tournament'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles(theme => ({
    app: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#fff',
        maxWidth: '1600px',
        height: '80vh',
        margin: '0 auto',
        overflow: 'hidden',
    },
    wrapper: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        flexGrow: 1,
        overflow: 'hidden',
    },
    chatArea: {
        display: 'flex',
        flexDirection: 'column',
        overflow: 'auto',
        flexGrow: 1,
    },
    chatAreaHeader: {
        display: 'flex',
        position: 'sticky',
        top: 0,
        left: 0,
        zIndex: 2,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '20px',
        background: 'linear-gradient(to bottom,rgba(255, 255, 255, 1) 0%,rgba(255, 255, 255, 1) 78%,rgba(255, 255, 255, 0) 100%)',
        outline: 'none',
        boxSizing: 'border-box',
    },
    chatAreaProfile: {
        width: '32px',
        borderRadius: '50%',
        objectFit: 'cover',
        flexShrink: 0,
        display: 'flex',
        border: '2px solid #fff',
        marginLeft: '-5px',
        outline: 'none',
        boxSizing: 'border-box',
    },

    chatAreaTitle: {
        fontSize: '18px',
        fontWeight: 600,
    },
    chatAreaMain: {
        flexGrow: 1,
    },
   
    chatAreaGroup: {
        flexShrink: 0,
        display: 'flex',
    },
    chatAreaProfileNumber: {
        border: '2px solid #fff',
        marginLeft: '-5px',
        width: '32px',
        height: '32px',
        backgroundColor: '#f0f7ff',
        color: '#0086ff',
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '14px',
        fontWeight: 500,
    },
    chatMsgImg: {
        height: '40px',
        width: '40px',
        borderRadius: '50%',
        objectFit: 'cover',
    },
       
    chatMsgProfile: {
        flexShrink: 0,
        marginTop: 'auto',
        marginBottom: '-20px',
        position: 'relative',
    },
       
    chatMsgDate: {
        position: 'absolute',
        left: 'calc(100% + 12px)',
        bottom: 0,
        fontSize: '14px',
        fontWeight: 600,
        color: '#c0c7d2',
        whiteSpace: 'nowrap',
    },
       
    chatMsg: {
        display: 'flex',
        padding: '0 20px 45px',
    },
    chatMsgContent: {
        marginLeft: '12px',
        maxWidth: '70%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        outline: 'none',
        boxSizing: 'border-box',
    },
    chatMsgText: {
        backgroundColor: '#f1f2f6',
        padding: '15px',
        borderRadius: '20px 20px 20px 0',
        lineHeight: '1.5',
        fontSize: '14px',
        fontWeight: 500,
        marginTop: '10px',
    },

    chatMsgOwner: {
        flexDirection: 'row-reverse',
        display: 'flex',
        padding: '0 20px 45px',
    },
    chatMsgContentOwner: {
        marginLeft: 0,
        marginRight: '12px',
        alignItems: 'flex-end',
        maxWidth: '70%',
        display: 'flex',
        flexDirection: 'column',
    },
    chatMsgTextOwner: {
        padding: '15px',
        lineHeight: 1.5,
        fontSize: '14px',
        fontWeight: 500,
        backgroundColor: '#0086ff',
        color: '#fff',
        borderRadius: '20px 20px 0 20px',
    },
    chatMsgDateOwner: {
        position: 'absolute',
        left: 'auto',
        right: 'calc(100% + 12px)',
        bottom: 0,
        fontSize: '14px',
        fontWeight: 600,
        color: '#c0c7d2',
        whiteSpace: 'nowrap',
    },

    chatAreaFooter: {
        display: 'flex',
        borderTop: '1px solid #eef2f4',
        width: '100%',
        padding: '10px 20px',
        alignItems: 'center',
        backgroundColor: '#fff',
        position: 'sticky',
        bottom: 0,
        left: 0,
        outline: 'none',
        boxSizing: 'border-box',
    },

    chatAreaFooterInput: {
        border: 'none',
        color: '#273346',
        backgroundColor: '#f8f8fa',
        padding: '12px',
        borderRadius: '6px',
        fontSize: '15px',
        margin: '0 12px',
        width: '100%',

        "& ::-webkit-input-placeholder": {
            color: '#a2a2a2',
        }
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
  }))

export default function GroupChat(props) {
    const classes = useStyles()
    const [loading, setLoading] = useState(false)
    const messageRef = useRef();
    const [values, setValues] = useState()

    useEffect(() => {
        if (messageRef.current) {
          messageRef.current.scrollIntoView(
            {
              block: 'end',
              inline: 'nearest'
            })
        }
    },[props.messages])


    const handleChange = event => {
        setValues(event.target.value)
    }

    const clickSubmit = () => {
        setLoading(true)
        //console.log(loading)
        const jwt = auth.isAuthenticated()
    
        const message = {
            text: values || undefined,
            date: new Date().toUTCString() || undefined,
            postedBy: auth.isAuthenticated().user._id
        }
        
        comment({t: jwt.token}, props.tournamentId, message).then((data) => {
            if (data && data.error) {
                console.log(data.error)
            } else {
                //console.log(data)
                setLoading(false)
                setValues('')
                props.addMessage(data.messages)        
            }
        })
      }

    //console.log(props.messages)


    return(
        <div className={classes.app}>
        <div className={classes.wrapper}>
        <div className={classes.chatArea}>
        <div className={classes.chatAreaHeader}>
            <div className={classes.chatAreaTitle}>Group Chat</div>
            <div className={classes.chatAreaGroup}>
            <img className={classes.chatAreaProfile} src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%283%29+%281%29.png" alt="" />
            <img className={classes.chatAreaProfile} src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%282%29.png" alt=""/>
            <img className={classes.chatAreaProfile} src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%2812%29.png" alt="" />
            <span className={classes.chatAreaProfileNumber}>+4</span>
            </div>
        </div>
        <div className={classes.chatAreaMain} ref={messageRef}>

            {props.messages.map((message) => {
            return(<div key={message._id}>
                {auth.isAuthenticated() && (auth.isAuthenticated().user._id === message.postedBy._id) ?
                <div className={classes.chatMsgOwner}>
                    <div className={classes.chatMsgProfile}>
                    {/*<img className={classes.chatMsgImg} src={message.postedBy.photo} alt="" />*/}
                    <Avatar  className={classes.large} alt={message.postedBy.name} src={message.postedBy.photo} />
                    <div className={classes.chatMsgDateOwner}>{new Date(message.date).toLocaleString()}</div>
                    </div>
                    <div className={classes.chatMsgContentOwner}>
                    <div className={classes.chatMsgTextOwner}>{message.text}</div>
                    </div>
                </div> 
                : (
                <div className={classes.chatMsg}>
                    <div className={classes.chatMsgProfile}>
                    <Avatar  className={classes.large} alt={message.postedBy.name} src={message.postedBy.photo} />
                    <div className={classes.chatMsgDate}>{new Date(message.date).toLocaleString()}</div>
                    </div>
                    <div className={classes.chatMsgContent}>
                    <div className={classes.chatMsgText}>{message.text}</div>
                    </div>
                </div>    
                    )
                }
              </div>
            )
            })}  

                <div className={classes.chatAreaFooter}>
                    <input className={classes.chatAreaFooterInput} type="text" value={values} onChange={handleChange} placeholder="Type something here..." />  
                    <Button onClick={clickSubmit} color="secondary" variant="contained" disabled={loading || !auth.isAuthenticated()}>
                        {loading && 'Sending'}
                        {!loading && 'Send'}
                    </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        )
   }