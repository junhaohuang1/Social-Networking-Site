import React from 'react';
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';


const SignUpForm = (props) => (
  <Card className="container">
    <form action="/" onSubmit={props.onSubmit}>
      <h2 className="card-heading">Sign Up</h2>

      {props.errors.message && <p className="error-message">{props.errors.message}</p>}

      <div className="field-line">
        <TextField
          floatingLabelText="Name"
          name="name"
          errorText={props.errors.name ? (props.errors.name) : ("")}
          onChange={props.onChange}
          value={props.name}
        />
      </div>

      <div className="field-line">
        <TextField
          floatingLabelText="Email"
          name="email"
          errorText={props.errors.email ?(props.errors.email):("")}
          onChange={props.onChange}
          value={props.email}
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
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default SignUpForm;
