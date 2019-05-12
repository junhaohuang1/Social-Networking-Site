import React from 'react';
import Modal from 'react-modal';
import { modalActions } from '../actions';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from 'react-router-dom';
import {CountryRegionData} from 'react-country-region-selector';
import Select from 'react-select';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Geosuggest from 'react-geosuggest';

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
    this.state={
      errors:{}
    }

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

  onSubmit(event){
    event.preventDefault();
    const username = this.props.username
    const title = this.props.title
    const textbody = this.props.textbody
    const file = this.props.file
    const token = this.props.token
    const lat = this.props.lat
    const long = this.props.long
    const locationLabel = this.props.locationLabel
    console.log(lat)
    console.log(long)

    if(!textbody || !title || !locationLabel || !file){
      this.setState({
        errors:{textbody:"Please Fill Out All Information"}
      })
    }


    if(username && title && textbody && file && token && lat && long && locationLabel){
      this.props.createPost(this.props.userid,username, title, textbody, lat, long, locationLabel, file, this.props.token)
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


   handleFileChange = (e) =>{
     e.preventDefault()
       if (e.target.file.files.length) {
           const upload_file = e.target.file.files[0];
           this.props.updateModalInput('file',upload_file);
           this.setState({
             errors:{file:true}
           })
       } else {
         this.setState({
           errors:{file:false}
         })
       }
   }

   onSuggestSelect = (suggest) =>{

     if (suggest) {
       console.log(suggest)
       this.props.updateModalInput('lat', suggest.location.lat)
       this.props.updateModalInput('long', suggest.location.lng)
       this.props.updateModalInput('locationLabel', suggest.label)
     }
   }


  selectCountry = (selectedOption) => {
    this.props.updateModalInput('country', selectedOption);
    this.props.updateModalInput('region', "");
    // this.props.updateSignUPForm('regionoptions', event.target.value);
  }

  selectRegion = selectedOption => {
    this.props.updateModalInput('region', selectedOption);
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

          {this.state.errors.textbody ? <div>{this.state.errors.textbody}</div> :""}
          {this.state.errors.file ? <div>File Uploaded</div> :""}
          <form onSubmit={this.handleFileChange}>
            <label>Upload Multimedia File:</label>
            <input
              type="file"
              name="file"
              accept="image/*,video/*"
            />
            <button type="submit">Upload</button>
          </form>


          <form action ='/' onSubmit={this.onSubmit}>

          <div className="field-line">
            <TextField
              floatingLabelText="Title"
              name="title"
              onChange={this.onChange}
              errorText={this.state.errors.title ?(this.state.errors.title) :("")}
              value={this.props.title}
            />
          </div>

          <div className="field-line">
            <TextField
              floatingLabelText="Body"
              name="textbody"
              onChange={this.onChange}
              value={this.props.textbody}
              multiLine={true}
              rows={3}
            />
          </div>

          <Geosuggest
            placehold ='Start typing!'
            onSuggestSelect={this.onSuggestSelect}

          />



          <br></br>


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
    lat:state.postModal.lat,
    long:state.postModal.long,
    locationLabel:state.postModal.locationLabel,
    errors:state.postModal.errors,
    filetype:state.postModal.filetype,
    userid: state.authentication.id

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
    createPost:(userid,username, title, textbody, lat, long, locationLabel, file, token) => {
        dispatch(modalActions.createPost(userid,username, title, textbody, lat, long, locationLabel, file, token))
    }
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(NavBarModal)
