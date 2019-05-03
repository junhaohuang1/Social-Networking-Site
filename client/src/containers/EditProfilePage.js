
import React from 'react';
import EditProfileForm from '../components/EditProfileForm.js';
import { userActions } from '../actions';
import { connect } from 'react-redux';

class EditProfilePage extends React.Component {

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
    const userid = this.props.userid
    const firstname = this.props.firstname;
    const lastname = this.props.lastname;
    const birthday = this.props.birthday;
    // const birthday = this.props.birthday.getUTCFullYear() + '-' +
    // ('00' + (this.props.birthday.getUTCMonth()+1)).slice(-2) + '-' +
    // ('00' + this.props.birthday.getUTCDate()).slice(-2) + ' ' +
    // ('00' + this.props.birthday.getUTCHours()).slice(-2) + ':' +
    // ('00' + this.props.birthday.getUTCMinutes()).slice(-2) + ':' +
    // ('00' + this.props.birthday.getUTCSeconds()).slice(-2);
    const privacy = this.props.privacy;
    const city = this.props.city;
    const interest = this.props.interest;
    const token = this.props.token
    if (userid && firstname && lastname && birthday && privacy && city && interest && token) {

        this.props.editProfile(userid, firstname, lastname, city, birthday, interest, privacy, token);
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
     this.props.updateProfileForm(name,value);
   }

   handleChange = name => event => {
     this.props.updateProfileForm(name,event.target.checked);
   };

   changeDate = date => {
     this.props.updateProfileForm('birthday',date);
   };

  /**
   * Render the component.
   */
  render() {
      // if(this.props.registered){
      //   store.dispatch(push("/login"))
      // }
      return (
        <EditProfileForm
          onSubmit={this.processForm}
          onChange={this.changeUser}
          onCheckBoxChange={this.handleChange}
          onChangeDate={this.changeDate}
          firstname={this.props.firstname}
          lastname={this.props.lastname}
          birthday={this.props.birthday}
          city = {this.props.city}
          interest = {this.props.interest}
          privacy={this.props.privacy}
        />
      );
  }

}
function mapStateToProps(state) {
  return {
    firstname: state.editProfile.firstname,
    lastname: state.editProfile.lastname,
    birthday: state.editProfile.birthday,
    username: state.editProfile.username,
    interest: state.editProfile.interest,
    privacy: state.editProfile.privacy,
    city:  state.editProfile.city,
    token: state.authentication.token,
    userid: state.authentication.id
  }
}


const mapDispatchToProps = dispatch => {
  return {
    editProfile: (userid, firstname, lastname, city, birthday, interest, privacy, token) => {
      dispatch(userActions.editProfile(userid, firstname, lastname, city, birthday, interest, privacy, token))
    },
    updateProfileForm:(key, value) =>{
      dispatch(userActions.updateProfileForm(key, value))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfilePage)
