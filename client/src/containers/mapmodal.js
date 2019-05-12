import React from 'react';
import Modal from 'react-modal';
import { modalActions } from '../actions';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import GoogleMapReact from 'google-map-react';
import Marker from 'google-map-react';


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

class MapModal extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.openModal = this.props.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.props.closeModal.bind(this);


  }


  componentWillMount() {
    Modal.setAppElement('body');
 }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }



  render() {
    return (
      <div>
        <Link to="#" onClick={this.props.openModal}><i class='fa fa-globe'></i></Link>
        <Modal
          isOpen={this.props.mapModalOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.props.closeModal}
          style={customStyles}
        >

          <h2 ref={subtitle => this.subtitle = subtitle}>Post Location</h2>
          <button onClick={this.props.closeModal}>close</button>
          <h3>{this.props.label}</h3>
          <div style={{ height: '100vh', width: '100%' }}>
            <GoogleMapReact
              bootstrapURLKeys={{key:''}}
              defaultCenter={{lat:this.props.lat, lng:this.props.lng}}
              defaultZoom={15}
            >
            <i class ='fa fa-user' style={{fontSize:'20px'}} lat={this.props.lat} lng={this.props.lng}></i>

            </GoogleMapReact>
            <Marker
                name={this.props.label}
                position={{lat: this.props.lat, lng: this.props.lng}} />

          </div>
        </Modal>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    mapModalOpen: state.map.mapModalOpen
  }
}

const mapDispatchToProps = dispatch => {
  return {
    openModal: () => {
      dispatch(modalActions.openMapModal())
    },
    closeModal:() =>{
      dispatch(modalActions.closeMapModal())
    }
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(MapModal)
