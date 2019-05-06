import React from 'react';
import Modal from 'react-modal';
import { modalActions } from '../actions';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from 'react-router-dom';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormControlLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {CountryRegionData} from 'react-country-region-selector';
import Select from 'react-select';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class NavBarModal extends React.Component {
  constructor(props, context) {
    super(props, context);


    this.openModal = this.props.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.props.closeModal.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    Modal.setAppElement('body');
 }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  onChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.props.updateModalInput(name,value);
  }

  onSubmit(){
    const username = this.props.username
    const title = this.props.title
    const textbody = this.props.body
    const file = this.props.file
    const filetype = this.props.filetype
    const token = this.props.token
    const country = this.props.country
    const region = this.props.region
    if(username && title && textbody && file && filetype && token){
      if(filetype === 'image'){
        this.props.createImagePost(username, title, textbody, country, region, file, filetype, token)
      } else {
        this.props.createVideoPost(username, title, textbody, country, region, file, filetype, token)
      }

    }
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


  selectCountry = (selectedOption) => {
    this.props.updateSignUPForm('country', selectedOption);
    // this.props.updateSignUPForm('regionoptions', event.target.value);
  }

  selectRegion = selectedOption => {
    this.props.updateSignUPForm('region', selectedOption);
  }

  render() {
    return (
      <div>
        <Link to="#" onClick={this.props.openModal}>Create Post</Link>
        <Modal
          isOpen={this.props.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.props.closeModal}
          style={customStyles}
        >

          <h2 ref={subtitle => this.subtitle = subtitle}>Create Post</h2>
          <button onClick={this.props.closeModal}>close</button>
          <form action ='/' onSubmit={this.onSubmit}>

          <div className="field-line">
            <TextField
              floatingLabelText="Title"
              name="title"
              onChange={this.onChange}
              errorText={this.props.errors.title ?(this.props.errors.title) :("")}
              value={this.props.title}
            />
          </div>

          <div className="field-line">
            <TextField
              floatingLabelText="Body"
              name="textbody"
              onChange={this.onChange}
              errorText={this.props.errors.textbody ?(this.props.errors.textbody) :("")}
              value={this.props.textbody}
              multiLine={true}
              rows={3}
            />
          </div>

          <div className="field-line">
          Country
          <Select
              value={this.props.country}
              onChange={this.props.selectCountry}
              options={this.countryOptions}
          />
          </div>

          <div className="field-line">
          Region
          <Select
              value={this.props.region}
              onChange={this.selectRegion}
              options={this.getRegions(this.props.country.value).map((option) =>(
                {value:option, label: option}
              ))}
          />
          </div>

          <FormLabel component="legend">Multimedia Type</FormLabel>
          <RadioGroup
            aria-label="Multimedia Type"
            name="filetype"
            value={this.props.filetype}
            onChange={this.handleChange}
          >
            <FormControlLabel value="videoFile" control={<Radio />} label="Video" />
            <FormControlLabel value="image" control={<Radio />} label="Image" />
          </RadioGroup>


          <div className="field-line">
          Multimedia
            <input
              type="file"
              name="file"
              value={this.props.file}
              onChange={this.props.onChange}
            />
          </div>

          <div className="button-line">
            <RaisedButton type="submit" label="Create Post" primary />
          </div>
          </form>
        </Modal>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    modalIsOpen: state.postModal.modalIsOpen,
    file: state.postModal.file,
    title:state.postModal.title,
    textbody:state.postModal.textbody,
    username: state.authentication.username,
    token: state.authentication.token,
    country:state.postModal.country,
    region:state.postModal.region,
    errors:state.postModal.errors

  }
}

const mapDispatchToProps = dispatch => {
  return {
    openModal: () => {
      dispatch(modalActions.openModal())
    },
    closeModal:() =>{
      dispatch(modalActions.closeModal())
    },
    updateModalInput:(key,value) =>{
      dispatch(modalActions.updateModalInput(key,value))
    },
    createImagePost:(username, title, textbody, country, region, file, filetype, token) => {
        dispatch(modalActions.createPost(username, title, textbody, country, region, file, filetype, token))
    },
    createVideoPost:(username, title, textbody, country, region, file, filetype, token) => {
        dispatch(modalActions.createPost(username, title, textbody, country, region, file, filetype, token))
    }
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(NavBarModal)
