import React from 'react';
import PropTypes from 'prop-types'
import { Card } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import DatePicker from 'react-date-picker';
import Select from 'react-select';


const EditProfileForm = (props) => (
  <Card className="container">
    <form action="/" onSubmit={props.onSubmit}>
      <h2 className="card-heading">Profile Page</h2>
      {props.formError && <p className="error-message">{props.formError }</p>}

      <div className="field-line">
        <TextField
          floatingLabelText="First Name"
          name="firstname"
          onChange={props.onChange}
          value={props.firstname}
        />
      </div>

      <div className="field-line">
        <TextField
          floatingLabelText="Last Name"
          name="lastname"
          onChange={props.onChange}
          value={props.lastname}
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
          value={props.interest}
        />
      </div>

      <div className="field-line" >
        <DatePicker
          name="birthday"
          onChange={props.onChangeDate}
          value={props.birthday}
        />
        Birthday
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
        <RaisedButton type="submit" label="Save Changes" primary />
      </div>

    </form>
  </Card>
);

EditProfileForm.propTypes = {
	onSubmit: PropTypes.func.isRequired,
	onChange: PropTypes.func.isRequired,
	firstname:PropTypes.string.isRequired,
	lastname:PropTypes.string.isRequired,
	birthday:PropTypes.string.isRequired,
	privacy: PropTypes.bool.isRequired,
  country: PropTypes.object.isRequired,
  region: PropTypes.object.isRequired,
};

export default EditProfileForm;
