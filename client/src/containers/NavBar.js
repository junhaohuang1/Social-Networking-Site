import React from 'react';
import NavBarForm from '../components/NavBarForm.js';
import NavBarModal from './Modal.js'
import { userActions, modalActions } from '../actions';
import { connect } from 'react-redux';
        //
class NavBar extends React.Component{

  constructor(props) {
    super(props);


    // This binding is necessary to make `this` work in the callback
    this.logout = this.props.logout.bind(this);
    this.openModal = this.props.openModal.bind(this);
  }m

  getProfileInformation(){
    this.props.getProfile(this.props.userid, this.props.token)
  }

  render() {
      return (
        <div>
          <NavBarForm
          logout={this.logout}
          loggedIn={this.props.loggedIn}
          openModal={this.openModal}
          modalButton = {this.props.loggedIn ? <NavBarModal/> : null}
          getProfile = {this.getProfileInformation}
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
