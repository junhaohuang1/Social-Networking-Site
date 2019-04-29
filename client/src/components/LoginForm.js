import React from 'react';
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';


const LoginForm = (props) => (
  <Card className="container">
    <form action="/" onSubmit={props.onSubmit}>
      <h2 className="card-heading">Login</h2>

      {/* {props.successMessage && <p className="success-message">{props.successMessage}</p>}*/}
      {props.errors.message && <p className="error-message">{props.errors.message}</p>}

      <div className="field-line">
        <TextField
          floatingLabelText="Email"
          name="email"
          errorText={props.errors.email}
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
          errorText={props.errors.password}
          value={props.password}
        />
      </div>

      <div className="button-line">
        <RaisedButton type="submit" label="Log in" primary />
      </div>

      <CardText>`Don't have an account? `<Link to={'/signup'}>Create one</Link>.</CardText>
    </form>
  </Card>
);

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  successMessage: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};

export default LoginForm;
