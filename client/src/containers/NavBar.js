import React from 'react';
import NavBarForm from '../components/NavBarForm.js';
import NavBarModal from './Modal.js'
import { userActions, modalActions } from '../actions';
import FriendSearchBar from './FriendSearchBar.js';
import { connect } from 'react-redux';
import configureStore from "../configureStore.js";
import { push } from 'connected-react-router'
import PostSearchBar from './postsearch.js'

const store = configureStore()

class NavBar extends React.Component{

  constructor(props) {
    super(props);


    // This binding is necessary to make `this` work in the callback
    this.logout = this.props.logout.bind(this);
    this.openModal = this.props.openModal.bind(this);
    this.openFriendModal = this.props.openFriendModal.bind(this)
    this.getProfile = this.getProfile.bind(this);
  }

  getProfile(event){
    event.preventDefault();

    store.dispatch(push('/profile'))

  }

  render() {
      return (
        <div>
          <NavBarForm
          logout={this.logout}
          loggedIn={this.props.loggedIn}
          openModal={this.openModal}
          openFriendModal={this.openFriendModal}
          modalButton = {this.props.loggedIn ? <NavBarModal/> : null}
          getProfile = {this.getProfile}
          friendSearchButton = {this.props.loggedIn ? <FriendSearchBar/> : null}
          postSearchButton = {this.props.loggedIn ? <PostSearchBar/> : null}
          />

        </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    loggedIn: state.authentication.loggedIn,
    userid: state.authentication.id,
    token: state.authentication.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout:() =>{
      dispatch(userActions.logout())
    },
    openModal: () => {
      dispatch(modalActions.openModal())
    },
    getProfile:(userid,token)=>{
      dispatch(userActions.getProfile(userid,token))
    },
    openFriendModal:()=>{
      dispatch(modalActions.openFriendSearchResultModal())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
