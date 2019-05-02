import React from 'react';
import NavBarForm from '../components/NavBarForm.js';
import NavBarModal from './Modal.js'
import { userActions, modalActions } from '../actions';
import { connect } from 'react-redux';
import configureStore from "../configureStore.js";
import { push } from 'connected-react-router'

const store = configureStore()

class NavBar extends React.Component{

  constructor(props) {
    super(props);


    // This binding is necessary to make `this` work in the callback
    this.logout = this.props.logout.bind(this);
    this.openModal = this.props.openModal.bind(this);
    this.getProfile = this.getProfile.bind(this);
  }

  getProfile(event){
    event.preventDefault();
    this.props.getProfile(this.props.userid, this.props.token)
    store.dispatch(push('/profile'))

  }

  render() {
      return (
        <div>
          <NavBarForm
          logout={this.logout}
          loggedIn={this.props.loggedIn}
          openModal={this.openModal}
          modalButton = {this.props.loggedIn ? <NavBarModal/> : null}
          getProfile = {this.getProfile}
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
