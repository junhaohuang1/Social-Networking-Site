import React from 'react';
import {connect} from 'react-redux'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Route, Switch}  from 'react-router'
import {Redirect} from 'react-router-dom'
import LoginPage from './containers/LoginPage.js';
import HomePage from './containers/HomePage.js';
import SignUpPage from './containers/SignUpPage.js';
import EditProfilePage from './containers/EditProfilePage.js'
import PostSearchResults from './containers/postsearchresults.js'
import FriendPostSearchResults from './containers/friendposts.js'

import NavBar from './containers/NavBar.js';

const ConnectedSwitch = connect(state => ({
  location: state.router.location
}))(Switch)

const App = (props) => {
  return(
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div>
          <NavBar/>
          <Switch>
            <Route exact path = '/' component = {HomePage}/>
            <Route path = '/signup' component = {SignUpPage}/>
            <Route path = '/profile' component = {EditProfilePage}/>
            <Route path = '/login' component = {LoginPage}/>
            <Route path="/logout"  render={() => (<Redirect to="/"/>)}/>
            <Route path='/searchpost' component = {PostSearchResults}/>
            <Route path='/friendpost' component = {FriendPostSearchResults}/>
          </Switch>
        </div>
      </MuiThemeProvider>
  )
}
function mapStateToProps(state) {
  return {
    loggedIn: state.authentication.loggedIn,
    location: state.router.location,
    postSearchQuery:state.friendship.postSearchQuery
  }
}

const mapDispatchToProps = dispatch => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
