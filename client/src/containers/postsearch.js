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

const store = configureStore()


class PostSearchBar extends React.Component{

  constructor(props){
    super(props)
    this.onSubmit = this.onSubmit.bind(this);
    this.changeUser = this.changeUser.bind(this);
    this.state={
      errors:{}
    }
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
    <Card className="container">
      <form action="#" onSubmit={this.onSubmit} style = {{display:'flex', height: 63, width:500}}>
        <div className="field-line" style = {{flex:1, height: 62}}>
          <TextField
            style={{height: 62}}
            errorText={this.state.errors.comment ?(this.state.errors.comment) :("")}
            floatingLabelText="Search for Post By User, Location, Keywords"
            name="postSearchQuery"
            onChange={this.changeUser}
            value={this.props.postSearchQuery}
          />
        </div>

        {/* <div className="button-line">*/}
        <RaisedButton style = {{flex:1,height: 63}} type="submit" label="Search Post" primary />
        {/*</div>*/}

      </form>
    </Card>
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
