import React from 'react';
import { connect } from 'react-redux';
import { receiveFRList, unfriend, acceptFR, rejectFR } from '../actions/userActions';
import {Link} from 'react-router-dom'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';


function mapStateToProps(state) {
    return {
        friendsAndWannabes:state.friendship.friendsAndWannabes,
        userid: state.authentication.id,
        friends: state.friendship.friendsAndWannabes && state.friendship.friendsAndWannabes.filter(user => user.status === 2),
        wannabes: state.friendship.friendsAndWannabes && state.friendship.friendsAndWannabes.filter(user => (user.status === 1 && user.sender_id !== state.authentication.id)),
        token:state.authentication.token,
    }
}



const rootstyle= {
  width: '100%',
}



const inline=  {
    display: 'inline'
}


class Friends extends React.Component {

    componentDidMount() {
        this.props.dispatch(receiveFRList(this.props.token, this.props.userid));
    }




    render () {
        if (!this.props.friends) {
            return null;
        }
        return (
            <div className="friends-list col-sm-4">
                <div className="wannabes">
                    <h3>Pending:</h3>

                    {this.props.wannabes === 0 && <p>You have no pending friend requests :(</p>}
                    {this.props.wannabes.map(wannabe => {
                        return (
                            <div key={wannabe.id} className="wannabe">
                                <div className="friends-right">
                                <List style = {rootstyle}>
                                  <ListItem alignItems="flex-start">
                                  <ListItemText
                                    primary= {"Name: " + wannabe.firstname + " " + wannabe.lastname}
                                    secondary={
                                      <React.Fragment>
                                        <Typography component="h2" style={inline} color="textPrimary">
                                          Username: {wannabe.username}
                                        </Typography>
                                      </React.Fragment>
                                    }
                                  />
                                  <ListItemSecondaryAction>

                                  </ListItemSecondaryAction>
                                    <button className="frbtn" onClick={ () =>
                                        this.props.dispatch(acceptFR(this.props.userid, wannabe.id, this.props.token))}>Accept</button>
                                    <button className="frbtn" onClick={ () =>
                                        this.props.dispatch(unfriend(this.props.userid, wannabe.id, this.props.token))}>Reject</button>
                                  </ListItem>
                                </List>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="friends">
                    <h3 >Friends:</h3>
                    {this.props.friends === 0 && <p>You have no friends yet :(</p>}
                    {this.props.friends.map(friend => {
                        return (
                            <div key={friend.id} className="friend">
                            <div className="friends-right">
                            <List style = {rootstyle}>
                              <ListItem alignItems="flex-start">
                              <ListItemText
                                primary= {"Name: " + friend.firstname + " " + friend.lastname}
                                secondary={
                                  <React.Fragment>
                                    <Typography component="h2" style={inline} color="textPrimary">
                                      Username: {friend.username}
                                    </Typography>
                                  </React.Fragment>
                                }
                              />
                              <ListItemSecondaryAction>
                              <button className="frbtn" onClick={ () =>
                                  this.props.dispatch(unfriend(this.props.userid, friend.id, this.props.token))}>Unfriend</button>
                              </ListItemSecondaryAction>
                              </ListItem>
                            </List>
                            </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

//MUST BE AFTER CLASS COMPONENT!
export default connect (mapStateToProps)(Friends);
