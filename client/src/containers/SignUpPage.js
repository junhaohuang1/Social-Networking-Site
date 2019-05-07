import React from 'react';
import SignUpForm from '../components/SignUpForm.js';
import { userActions } from '../actions';
import { connect } from 'react-redux';
import {CountryRegionData} from 'react-country-region-selector';

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
    const birthday = this.props.birthday.getUTCFullYear() + '-' +
    ('00' + (this.props.birthday.getUTCMonth()+1)).slice(-2) + '-' +
    ('00' + this.props.birthday.getUTCDate()).slice(-2) + ' ' +
    ('00' + this.props.birthday.getUTCHours()).slice(-2) + ':' +
    ('00' + this.props.birthday.getUTCMinutes()).slice(-2) + ':' +
    ('00' + this.props.birthday.getUTCSeconds()).slice(-2);
    const privacy = this.props.privacy;
    const region = this.props.region;
    const country = this.props.country;
    const interest = this.props.interest;
    if (username && firstname && lastname && password && birthday && privacy && country && region && interest) {
        this.props.signup(username, firstname, lastname, country, region, password, birthday, interest, privacy);
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

   getRegions = country => {
   if (!country) {
     return [];
   }
   return country[2].split("|").map(regionPair => {
       let [regionName, regionShortCode = null] = regionPair.split("~");
       return regionName;
     });
   };



  countryOptions =
     CountryRegionData.map((option) => (
       {value:option, label: option[0]}
     ))

   // regionOptions = this.props.getRegions(this.props.country).map((option) => (
   //   {value:option, label: option}
   // ))

   handleChange = name => event => {
     this.props.updateSignUPForm(name,event.target.checked);
   };

   changeDate = date => {
     this.props.updateSignUPForm('birthday',date);
   };

  selectCountry = (selectedOption) => {
    this.props.updateSignUPForm('country', selectedOption);
    this.props.updateSignUPForm('region', "");
    // this.props.updateSignUPForm('regionoptions', event.target.value);
  }

  selectRegion = selectedOption => {
    this.props.updateSignUPForm('region', selectedOption);
  }




  /**
   * Render the component.
   */
  render() {
      // if(this.props.registered){
      //   store.dispatch(push("/login"))
      // }
      return (
        <SignUpForm
          countryOptions={this.countryOptions}
          onSubmit={this.processForm}
          onChange={this.changeUser}
          onCheckBoxChange={this.handleChange}
          onChangeDate={this.changeDate}
          selectCountry={this.selectCountry}
          selectRegion={this.selectRegion}
          getRegions={this.getRegions}
          errors={this.props.errors}
          firstname={this.props.firstname}
          lastname={this.props.lastname}
          password={this.props.password}
          birthday={this.props.birthday}
          username={this.props.username}
          region = {this.props.region}
          country = {this.props.country}
          interest = {this.props.interest}
          privacy={this.props.privacy}
          successMessage={this.props.successMessage}
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
    region:  state.registration.region,
    country:  state.registration.country,
    errorMessage: state.registration.errorMessage
  }
}


const mapDispatchToProps = dispatch => {
  return {
    signup: (username, firstname, lastname, country, region, password, birthday, interest, privacy) => {
      dispatch(userActions.signup(username, firstname, lastname, country, region, password, birthday, interest, privacy))
    },
    updateSignUPForm:(key, value) =>{
      dispatch(userActions.updateSignUPForm(key, value))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage)
