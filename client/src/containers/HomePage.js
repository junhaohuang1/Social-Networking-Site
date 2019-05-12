import React from "react";
import HomeForm from '../components/HomeForm.js';
import Friends from './friends.js'
import FriendActivity from './friendactivities.js'
import { connect } from 'react-redux';


const style ={
  width: '80%',
  height: '200px',
  margin: 'auto',
  padding: '10px'
}

class HomePage extends React.Component {
  render() {
    return (
      <div>
        <HomeForm/>
        <div class ='container' style={style}>
          <div class='row'>
            {this.props.loggedIn ? <Friends/> : null}
            {this.props.loggedIn ? <FriendActivity/> : null}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loggedIn: state.authentication.loggedIn,
    userid: state.authentication.id,
    token: state.authentication.token
  }
}

export default connect(mapStateToProps) (HomePage);
