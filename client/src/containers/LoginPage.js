import React from 'react';
import LoginForm from '../components/LoginForm.js';
import { userActions } from '../actions';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import {store} from "../store.js";
import {withRouter} from "react-router-dom";



class LoginPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props, context) {
    super(props, context);

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  processForm(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    // create a string for an HTTP body message
    const email = this.props.email;
    const password = this.props.password;
     if (email && password) {
         this.props.login(email,password);
     }
  }

  /**
   * Change the user object.
   *
   * @param {object} event - the JavaScript event object
   */
  changeUser(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.props.updateSignInForm(name,value);
  }

  /**
   * Render the component.
   */
  render() {
    if(this.props.loggedIn){
      store.dispatch(push('/'))
    }
    return (
      <LoginForm
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.props.errors}
        successMessage={this.props.successMessage}
        email={this.props.email}
        password={this.props.password}
      />
    );
  }

}

function mapStateToProps(state) {
  return {
    loggingIn: state.authentication.loggingIn,
    loggedIn: state.authentication.loggedIn,
    errors: state.authentication.errors,
    successMessage: state.registration.successMessage,
    email: state.authentication.email,
    password: state.authentication.password,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: (email,password) => {
      dispatch(userActions.login(email,password))
    },
    updateSignInForm:(key, value) =>{
      dispatch(userActions.updateSignInForm(key, value))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginPage))
