import React from 'react';
import SignUpForm from '../components/SignUpForm.js';
import { userActions } from '../actions';
import { connect } from 'react-redux';
// import { push } from 'react-router-redux';
// import {store} from "../store.js";

class SignUpPage extends React.Component {

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
    const username = this.props.username;
    const firstname = this.props.firstname;
    const lastname = this.props.lastname;
    const password = this.props.password;
    const birthday = this.props.birthday;
    const privacy = this.props.privacy;
    const city = this.props.city;
    const interest = this.props.interest;
    if (username && firstname && lastname && password && birthday && privacy && city && interest) {
        this.props.signup(username,firstname,lastname,password, birthday, privacy, city, interest);
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
     this.props.updateSignUPForm(name,value);
   }

   handleChange = name => event => {
     this.props.updateSignUPForm(name,event.target.checked);
   };

   changeDate = date => {
     this.props.updateSignUPForm('birthday',date);
   };

  /**
   * Render the component.
   */
  render() {
      // if(this.props.registered){
      //   store.dispatch(push("/login"))
      // }
      return (
        <SignUpForm
          onSubmit={this.processForm}
          onChange={this.changeUser}
          onCheckBoxChange={this.handleChange}
          onChangeDate={this.changeDate}
          errors={this.props.errors}
          firstname={this.props.firstname}
          lastname={this.props.lastname}
          password={this.props.password}
          birthday={this.props.birthday}
          username={this.props.name}
          city = {this.props.city}
          interest = {this.props.interest}
          privacy={this.props.privacy}
        />
      );
  }

}
function mapStateToProps(state) {
  return {
    registering: state.registration.registering,
    registered: state.registration.registered,
    errors: state.registration.errors,
    successMessage: state.registration.successMessage,
    password: state.registration.password,
    firstname: state.registration.firstname,
    lastname: state.registration.lastname,
    birthday: state.registration.birthday,
    username: state.registration.username,
    interest: state.registration.interest,
    privacy: state.registration.privacy,
    city:  state.registration.city,
    errorMessage: state.registration.errorMessage
  }
}


const mapDispatchToProps = dispatch => {
  return {
    signup: (username, firstname, lastname, city, password, birthday, interest, privacy) => {
      dispatch(userActions.signup(username, firstname, lastname, city, password, birthday, interest, privacy))
    },
    updateSignUPForm:(key, value) =>{
      dispatch(userActions.updateSignUPForm(key, value))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage)
