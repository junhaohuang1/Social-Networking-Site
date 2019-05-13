import React from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import ActivityForm from '../components/activityform.js'
import { Card } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { push } from 'connected-react-router'
import configureStore from "../configureStore.js";
import { modalActions } from '../actions';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Modal from 'react-modal';
import {Link} from 'react-router-dom';

const store = configureStore()

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


class PostSearchBar extends React.Component{

  constructor(props){
    super(props)
    this.onSubmit = this.onSubmit.bind(this);
    this.changeUser = this.changeUser.bind(this);
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.state={
      errors:{},
      modalIsOpen: false
    }
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  componentWillMount() {
    Modal.setAppElement('body');
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  changeUser(event) {
    const name = event.target.name;
    const value = event.target.value;
    console.log(name)
    console.log(value)
    this.props.updateFriendQuery(name,value);
  }

  onSubmit(event){
    event.preventDefault()
    const query = this.props.postSearchQuery;
    if(!query){
      this.setState({
        errors:{comment:"Please fill out the search"}
      })
    } else{
      store.dispatch(push('/searchpost'))
    }
  }


  render(){
    return(<div>
    <Link to="#" onClick={this.openModal}>Search Post</Link>
    <Modal
      isOpen={this.state.modalIsOpen}
      onAfterOpen={this.afterOpenModal}
      onRequestClose={this.closeModal}
      style={customStyles}
    >
    <h2 ref={subtitle => this.subtitle = subtitle}>Search Post</h2>
    <button onClick={this.closeModal}>close</button>
    <Card className="container">
      <form action="#" onSubmit={this.onSubmit}>
          <TextField
            errorText={this.state.errors.comment ?(this.state.errors.comment) :("")}
            floatingLabelText="Search for Post"
            name="postSearchQuery"
            onChange={this.changeUser}
            value={this.props.postSearchQuery}
          />
        <RadioGroup
            aria-label="Query Type"
            name="queryType"
            value={this.state.value}
            onChange={this.changeUser}
          >
            <FormControlLabel value="location" control={<Radio />} label="location" />
            <FormControlLabel value="username" control={<Radio />} label="user name" />
            <FormControlLabel value="interest" control={<Radio />} label="research interest" />
            <FormControlLabel value="title" control={<Radio />} label="title" />
          </RadioGroup>

        {/* <div className="button-line">*/}
        <RaisedButton style = {{flex:1,height: 63}} type="submit" label="Search Post" primary />
        {/*</div>*/}

      </form>
      </Card>
    </Modal>
    </div>
  )
  }
}

function mapStateToProps(state){
  return{
    username: state.authentication.username,
    userid: state.authentication.id,
    token: state.authentication.token,
    postSearchQuery:state.friendship.postSearchQuery
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    updateFriendQuery:(key, value) =>{
      dispatch(modalActions.updateFriendQuery(key, value))
    }
  }

}


export default connect(mapStateToProps, mapDispatchToProps)(PostSearchBar)
