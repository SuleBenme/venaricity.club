import React, {Component, Fragment} from 'react'
import {Route, Switch} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Home from './core/Home'
import Users from './user/Users'
import Signup from './user/Signup'
import Signin from './auth/Signin'
import EditProfile from './user/EditProfile'
import Profile from './user/Profile'
import PrivateRoute from './auth/PrivateRoute'
import Menu from './core/Menu'
import Footer from './core/Footer'
import DisplayNews from './news/DisplayNews'
import DisplayPlayers from './player/DisplayPlayers'
import Recruitment from './recruitment/NewRecruitment'
import Tournament from './tournament/Tournament'
import ForgotPassword from './user/ForgotPassword'
import ResetPassword from './user/ResetPassword'
import Admin from './news/Admin'
import Task from './task/Task'
import StatsPage from './stats/StatsPage'
import MembersStats from './stats/Members'
import ContactUs from './contact/ContactUs'
import VerifyEmail from './user/VerifyEmail'
import Notes from './task/Notes'
import Sponsors from './sponsors/Sponsors'
import Report from './report/Report'
import DisplayOnePartner from './partner/PartnerPage'
import DisplayPartners from './partner/DisplayPartners'
import AboutUs from './about/DisplayAboutUs'
import Player from './player/Player'
import Rules from './rules/DisplayRules'
import History from './history/DisplayHistory'
import HistoryPage from './history/HistoryPage'
import LastResults from './stats/Results'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    //background: 'rgb(2,0,36)',
    background: '#eeeeee',
    fontFamily: 'Dosis, sans-serif'
  },
}))

const MainRouter = () => {
  const classes = useStyles()

    return (<>
      <Menu/>
      <div className={classes.root}>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/users" component={Users}/>
        <Route path="/signup" component={Signup}/>
        <Route path="/signin" component={Signin}/>
        <PrivateRoute path="/user/edit/:userId" component={EditProfile}/>
        <Route path="/user/:userId" component={Profile}/>
        <Route path="/players/:playerName" component={Player}/>
        <Route path="/players" component={DisplayPlayers}/>
        <Route path="/recruitment" component={Recruitment}/>
        <Route path="/manager/tasks" component={Notes}/>
        <Route path="/news/:newsId" component={DisplayNews}/>
        <Route path="/partners/:partnerId" component={DisplayOnePartner}/>
        <Route path="/partners" component={DisplayPartners}/>
        <Route path="/tournaments/:tournamentId" component={Tournament}/>
        <Route path="/forgot-password" component={ForgotPassword}/>
        <Route path="/reset-password/:resetPasswordLink" component={ResetPassword}/> 
        <Route path="/verify-email/:verifyEmailLink" component={VerifyEmail}/>    
        <Route path="/history/:historyId" component={HistoryPage}/>
        <Route path="/history" component={History}/>
        <Route path="/admin" component={Admin}/>
        <Route path="/stats" component={StatsPage}/>
        <Route path="/members-stats" component={MembersStats}/>
        <Route path="/contact-us" component={ContactUs}/>
        <Route path="/about-us" component={AboutUs}/>
        <Route path="/sponsors" component={Sponsors}/>
        <Route path="/report" component={Report}/>
        <Route path="/rules" component={Rules}/>
        <Route path="/lastResults" component={LastResults}/>
      </Switch>
      <Footer/>
      </div>
    </>)
}

export default MainRouter
