
import React from 'react';
import EditProfileForm from '../components/EditProfileForm.js';
import { userActions } from '../actions';
import { connect } from 'react-redux';
import {CountryRegionData} from 'react-country-region-selector';

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
    const interest = this.props.interest
    const region = this.props.region;
    const country = this.props.country;
    const token = this.props.token
    if (userid && firstname && lastname && birthday && privacy && country && region && interest && token) {

        this.props.editProfile(userid, firstname, lastname, country, region, birthday, interest, privacy, token);
    }
  }


  /**
   * Change the user object.
   *
   * @param {object} event - the JavaScript event object
   */

  componentWillUnmount() {
    this.props.getProfile(this.props.userid, this.props.token)
  }

   changeUser(event) {
     const name = event.target.name;
     const value = event.target.value;
     this.props.updateProfileForm(name,value);
   }

   handleChange = name => event => {
     this.props.updateProfileForm(name,event.target.checked);
   };


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

   changeDate = date => {
     this.props.updateProfileForm('birthday',date);
   };

   selectCountry = (selectedOption) => {
     this.props.updateProfileForm('country', selectedOption);
     // this.props.updateSignUPForm('regionoptions', event.target.value);
     this.props.updateProfileForm('region', '');
   }

   selectRegion = selectedOption => {
     this.props.updateProfileForm('region', selectedOption);
   }




  /**
   * Render the component.
   */
  render() {
      // if(this.props.registered){
      //   store.dispatch(push("/login"))
      // }
      return (
        <EditProfileForm
          countryOptions={this.countryOptions}
          onSubmit={this.processForm}
          onChange={this.changeUser}
          onCheckBoxChange={this.handleChange}
          onChangeDate={this.changeDate}
          selectCountry={this.selectCountry}
          selectRegion={this.selectRegion}
          getRegions={this.getRegions}
          firstname={this.props.firstname}
          lastname={this.props.lastname}
          birthday={this.props.birthday}
          interest = {this.props.interest}
          privacy={this.props.privacy}
          region = {this.props.region}
          country = {this.props.country}
        />
      );
  }

}
function mapStateToProps(state) {
  return {
    firstname: state.editProfile.firstname,
    region:  state.editProfile.region,
    country:  state.editProfile.country,
    lastname: state.editProfile.lastname,
    birthday: state.editProfile.birthday,
    username: state.editProfile.username,
    interest: state.editProfile.interest,
    privacy: state.editProfile.privacy,
    token: state.authentication.token,
    userid: state.authentication.id
  }
}


const mapDispatchToProps = dispatch => {
  return {
    editProfile: (userid, firstname, lastname, country, region, birthday, interest, privacy, token) => {
      dispatch(userActions.editProfile(userid, firstname, lastname, country, region, birthday, interest, privacy, token))
    },
    updateProfileForm:(key, value) =>{
      dispatch(userActions.updateProfileForm(key, value))
    },
    getProfile:(userid,token)=>{
      dispatch(userActions.getProfile(userid,token))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfilePage)
