import React from 'react';
import FriendSearchBarForm from '../components/FriendSearchBarForm.js';
import { userActions,modalActions } from '../actions';
import { connect } from 'react-redux';
// import { push } from 'react-router-redux';
// import {store} from "../store.js";
import {withRouter} from "react-router-dom";
import Modal from 'react-modal';
import { Card } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios'
import FriendButton from './friendbutton.js'


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



class FriendSearchBar extends React.Component {

  /**
   * Class constructor.
   */


  constructor(props, context) {
    super(props, context);

    this.openModal = this.props.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.props.closeModal.bind(this);
    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);

    this.state = {
        userSearchedId:"",
        currentUserID:"",
        token:"",
        error:""
    }

  }

  componentWillMount() {
    Modal.setAppElement('body');
  }

  // addFriend(event){
  //   event.preventDefault();
  //   this.props.addFriend(this.props.currentUserID, this.props.userSearchedId, this.props.token)
  // }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }
  /**
  * Process the form.
  *
  * @param {object} event - the JavaScript event object
  */
  processForm(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    // create a string for an HTTP body message
    const searchedName = this.props.searchedName;
    console.log(searchedName);
    if(!searchedName){
      this.setState({
        error:"Please fill out the form"
      })
    }

    if (searchedName) {
      this.props.searchFriend(this.props.userid, searchedName, this.props.token);
      this.props.openModal();
    }
  }



  /**
   * Change the user object.
   *
   * @param {object} event - the JavaScript event object
   */
  changeUser(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.props.updateFriendQuery(name,value);
  }

  /**
   * Render the component.
   */
  render() {
    return (
      <div>
        <FriendSearchBarForm
          onSubmit={this.processForm}
          onChange={this.changeUser}
          // errors={this.props.errors}
          // successMessage={this.props.successMessage}
          searchedName={this.props.searchedName}
          error={this.state.error}
          // password={this.props.password}
        />
        <Modal
          isOpen={this.props.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.props.closeModal}
          style={customStyles}
        >
          <h2 ref={subtitle => this.subtitle = subtitle}>Friend Search Result</h2>
          <button onClick={this.props.closeModal}>close</button>
          {this.props.searched && this.props.searchingSuccess ? (
            <Card className = "container">
                <Card id={this.props.searchedId} className = "container" style={{display:"flex"}}>
                  <label>
                    First Name:{this.props.searchedFirstName}
                  </label>
                  <br>
                  </br>

                  <label>
                    Last Name:{this.props.searchedLastName}
                  </label>
                  <br>
                  </br>

                  <br>
                  </br>
                  <FriendButton/>
                </Card>
            </Card>
          ): (
            <label>
            {this.props.errorMessage}
            </label>
          )
        }
        </Modal>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    modalIsOpen: state.friendship.friendModalOpen,
    searching: state.friendship.searching,
    searched: state.friendship.searched,
    errors: state.friendship.errors,
    token: state.authentication.token,
    searchedId:state.friendship.searchedId,
    searchedFirstName:state.friendship.searchedFirstName,
    searchedLastName:state.friendship.searchedLastName,
    searchedName:state.friendship.searchedName,
    searchingSuccess:state.friendship.searchingSuccess,
    errorMessage:state.friendship.errors,
    userid: state.authentication.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    openModal: () => {
      dispatch(modalActions.openFriendSearchResultModal())
    },
    closeModal:() =>{
      dispatch(modalActions.closeFriendSearchResultModal())
    },
    updateFriendQuery:(key, value) =>{
      dispatch(modalActions.updateFriendQuery(key, value))
    },
    searchFriend:(userid, searchedName, token) =>{
      dispatch(userActions.searchFriend(userid, searchedName, token))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FriendSearchBar))
