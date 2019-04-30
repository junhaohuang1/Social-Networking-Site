import React from 'react';
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import DatePicker from 'react-date-picker';


const SignUpForm = (props) => (
  <Card className="container">
    <form action="/" onSubmit={props.onSubmit}>
      <h2 className="card-heading">Sign Up</h2>


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
          floatingLabelText="City"
          name="city"
          onChange={props.onChange}
          errorText={props.errors.city ?(props.errors.city) :("")}
          value={props.city}
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
        <TextField
          floatingLabelText="Research Interest"
          name="interest"
          onChange={props.onChange}
          errorText={props.errors.interest ?(props.errors.interest) :("")}
          value={props.interest}
        />
      </div>

      <div>
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
	firstname:PropTypes.object.isRequired,
	lastname:PropTypes.object.isRequired,
	password:PropTypes.object.isRequired,
	birthday:PropTypes.object.isRequired,
	username:PropTypes.object.isRequired,
	city: PropTypes.object.isRequired,
	privacy: PropTypes.object.isRequired,
};

export default SignUpForm;
