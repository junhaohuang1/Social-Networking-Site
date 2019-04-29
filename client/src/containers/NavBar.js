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
  }


  render() {
      return (
        <div>
          <NavBarForm
          onClick={this.logout}
          loggedIn={this.props.loggedIn}
          openModal={this.openModal}
          modalButton = {this.props.loggedIn ? <NavBarModal/> : null}
          />

        </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    loggedIn: state.authentication.loggedIn,
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
