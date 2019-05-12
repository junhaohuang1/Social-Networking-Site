import React from 'react';
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import DatePicker from 'react-date-picker';
import Select from 'react-select';

const SignUpForm = (props) => (
  <Card className="container">
    <form action="/" onSubmit={props.onSubmit}>
      <h2 className="card-heading">Sign Up</h2>
      <h2 className="card-heading">All Fields Are Required</h2>

      {props.errors.message && <p className="error-message">{props.errors.message}</p>}
      {props.successMessage && <p className="success-message">{props.successMessage}</p>}
      {props.formError && <p className="error-message">{props.formError }</p>}

      <div className="field-line">
        <TextField
          floatingLabelText="Username"
          name="username"
		      errorText={props.errors.username ?(props.errors.username):("")}
          onChange={props.onChange}
          value={props.username}
        />
      </div>

      <div className="field-line">
        <TextField
          floatingLabelText="First Name"
          name="firstname"
          onChange={props.onChange}
          errorText={props.errors.firstname ?(props.errors.firstname) :("")}
          value={props.firstname}
        />
      </div>

      <div className="field-line">
        <TextField
          floatingLabelText="Last Name"
          name="lastname"
          onChange={props.onChange}
          errorText={props.errors.lastname ?(props.errors.lastname) :("")}
          value={props.lastname}
        />
      </div>


      <div className="field-line">
        <TextField
          floatingLabelText="Password"
          type="password"
          name="password"
          onChange={props.onChange}
          errorText={props.errors.password ?(props.errors.password) :("")}
          value={props.password}
        />
      </div>

      <div className="field-line">
      Country
      <Select
          value={props.country}
          onChange={props.selectCountry}
          options={props.countryOptions}
      />
      </div>

      <div className="field-line">
      Region
      <Select
          value={props.region}
          onChange={props.selectRegion}
          options={props.getRegions(props.country.value).map((option) =>(
            {value:option, label: option}
          ))}
      />
      </div>

      <div className="field-line">
        <TextField
          floatingLabelText="Research Interest"
          name="interest"
          onChange={props.onChange}
          errorText={props.errors.interest ?(props.errors.interest) :("")}
          value={props.interest}
        />
      </div>

      <div>Birthday</div>
      <div className="field-line" >
        <DatePicker
          name="birthday"
          onChange={props.onChangeDate}
          value={props.birthday}
        />
      </div>


      <div>
          <Checkbox
              name="privacy"
              value='privacy'
              checked={props.privacy}
              onCheck={props.onCheckBoxChange('privacy')}
              label="Set profile to private."
        />
      </div>


      <div className="button-line">
        <RaisedButton type="submit" label="Create New Account" primary />
      </div>

      <CardText>Already have an account? <Link to={'/login'}>Log in</Link></CardText>
    </form>
  </Card>
);

SignUpForm.propTypes = {
	onSubmit: PropTypes.func.isRequired,
	onChange: PropTypes.func.isRequired,
	errors: PropTypes.object.isRequired,
	firstname:PropTypes.string.isRequired,
	lastname:PropTypes.string.isRequired,
	password:PropTypes.string.isRequired,
	birthday:PropTypes.instanceOf(Date).isRequired,
	username:PropTypes.string.isRequired,
	country: PropTypes.string.isRequired,
  region: PropTypes.string.isRequired,
	privacy: PropTypes.bool.isRequired,
};

export default SignUpForm;
