import React from "react";
import HomeForm from '../components/HomeForm.js';
import Friends from './friends.js'
import Activity from './activities.js'
import { connect } from 'react-redux';

class HomePage extends React.Component {
  render() {
    return (
      <div>
        <HomeForm/>
        <div class ='container'>
          <div class='row'>
            {this.props.loggedIn ? <Friends/> : null}
            {this.props.loggedIn ? <Activity/> : null}
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
