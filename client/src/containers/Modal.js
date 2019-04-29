import React from 'react';
import Modal from 'react-modal';
import { modalActions } from '../actions';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from 'react-router-dom';

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
    this.props.uploadImageLink(this.props.src)
  }

  render() {
    return (
      <div>
        <Link to="#" onClick={this.props.openModal}>Upload Image</Link>
        <Modal
          isOpen={this.props.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.props.closeModal}
          style={customStyles}
        >

          <h2 ref={subtitle => this.subtitle = subtitle}>Input Image URL</h2>
          <button onClick={this.props.closeModal}>close</button>
          <form action ='/' onSubmit={this.onSubmit}>
          <TextField
            floatingLabelText="Image Link"
            name="src"
            onChange={this.onChange}
            value={this.props.src}
          />
          <div className="button-line">
            <RaisedButton type="submit" label="Submit Image URL" primary />
          </div>
          </form>
        </Modal>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    modalIsOpen: state.modal.modalIsOpen,
    src: state.modal.src
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
    uploadImageLink:(URL) => {
        dispatch(modalActions.uploadImageLink(URL))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBarModal)
