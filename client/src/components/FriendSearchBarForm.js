import React from 'react';
import PropTypes from 'prop-types'
// import {Link} from 'react-router-dom';
import { Card } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';


const FriendSearchBarForm = (props) => (
  <Card className="container">
    <form action="#" onSubmit={props.onSubmit} style = {{display:'flex', height: 63, width:500}}>
      <div className="field-line" style = {{flex:1, height: 62}}>
        <TextField
          style={{height: 62}}
          floatingLabelText="Search Friend Here By Username"
          name="searchedName"
          onChange={props.onChange}
          value={props.searchedName}
        />
      </div>

      {/* <div className="button-line">*/}
      <RaisedButton style = {{flex:1,height: 63}} type="submit" label="Search Friend" primary />
      {/*</div>*/}

    </form>
  </Card>
);

FriendSearchBarForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default FriendSearchBarForm;
