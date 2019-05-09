import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { userActions,modalActions } from '../actions';

class FriendButton extends React.Component {
    constructor(props) {
        super(props);
        this.sendFR = this.sendFR.bind(this);
        this.acceptFR = this.acceptFR.bind(this);
        this.rejectFR = this.rejectFR.bind(this);
        this.deleteFR = this.deleteFR.bind(this);
    }

    // componentDidMount() {
    //     axios
    //     .get('/seeFR/' + this.props.otherUserId)
    //     .then (resp => {
    //         console.log("resp axios get seeFR", resp);
    //         if(resp.data.success) {
    //             console.log("success!");
    //             this.setState({
    //                 status: resp.data.status,
    //                 sender_id: resp.data.sender_id,
    //                 receiver_id: resp.data.receiver_id
    //             });
    //             console.log('status ', resp.data.status);
    //         } else {
    //             this.setState({
    //                 error: resp.data.error
    //             });
    //         }
    //     })
    // }



    sendFR() {
        console.log("this.props.otherUserId", this.props.otherUserId);
        console.log('token: ' + this.props.token)
        axios.post('/api/sendFR',
            {
              otherUserId: this.props.otherUserId,
              userid:this.props.userid,
            },
            {
              headers:{
              authorization:this.props.token
              }
            }
          )
        .then (resp => {
            console.log("resp axios post sendFR", resp);
            if(resp.data.success) {
                console.log("success!");
                this.props.updateFriendQuery('status', resp.data.status)
                this.props.updateFriendQuery('receiver_id', resp.data.receiver_id)
                this.props.updateFriendQuery('sender_id', resp.data.sender_id)
            } else {
                this.setState({
                    error: resp.data.error
                });
            }
        })
    }

    acceptFR() {
        axios
        .post('/api/acceptFR',
        {
          otherUserId: this.props.otherUserId,
          userid:this.props.userid,
        },
        {
          headers:{
          authorization:this.props.token
          }
        }
      )
        .then (resp => {
            console.log("resp axios post acceptFR", resp);
            if(resp.data.success) {
                console.log("success!");
                console.log("resp.data.id", resp.data.id);
                this.props.updateFriendQuery('status', resp.data.status)
                this.props.updateFriendQuery('receiver_id', resp.data.receiver_id)
                this.props.updateFriendQuery('sender_id', resp.data.sender_id)
            } else {
                this.setState({
                    error: resp.data.error
                });
            }
        })
    }
    rejectFR() {
        axios
        .post('/api/rejectFR',
        {
          otherUserId: this.props.otherUserId,
          userid:this.props.userid,
        },
        {
          headers:{
          authorization:this.props.token
          }
        })
        .then (resp => {
            console.log("resp axios post rejectFR", resp);
            if(resp.data.success) {
                console.log("success!");
                console.log("resp.data.id", resp.data.id);
                this.props.updateFriendQuery('status', resp.data.status)
                this.props.updateFriendQuery('receiver_id', resp.data.receiver_id)
                this.props.updateFriendQuery('sender_id', resp.data.sender_id)
            } else {
                this.setState({
                    error: resp.data.error
                });
            }
        })
    }

    deleteFR() {
        axios
        .post('/api/deleteFR',
        {
          otherUserId: this.props.otherUserId,
          userid:this.props.userid,
        },
        {
          headers:{
          authorization:this.props.token
          }
        })
        .then (resp => {
            console.log("resp axios post deleteFR", resp);
            if(resp.data.success) {
                console.log("success!");
                console.log("resp.data.id", resp.data.id);
                this.props.updateFriendQuery('status', resp.data.status)
                this.props.updateFriendQuery('receiver_id', resp.data.receiver_id)
                this.props.updateFriendQuery('sender_id', resp.data.sender_id)
            } else {
                this.setState({
                    error: resp.data.error
                });
            }
        })
    }

    render () {
        console.log("this.state", this.state)
        return (
          <div>
          {(!this.props.status || this.props.status === 3 || this.props.status === 4 || this.props.status === 5) && <button className="frbtn" onClick={this.sendFR}>Send Friend Request</button>
          || ((this.props.status === 1 && this.state.sender_id === this.props.otherUserId) && <button className="frbtn" onClick={this.acceptFR}>Accept Friend Request</button>)
          || ((this.props.status === 1 && this.state.sender_id !== this.props.otherUserId) && <div>Friend Request Sent</div>)
          || (this.props.status === 2 && <button className="frbtn" onClick={this.deleteFR}>Unfriend</button>)
          }
          </div>
        );
    }
}

function mapStateToProps(state) {
  return {
    otherUserId:state.friendship.searchedId,
    status:state.friendship.status,
    userid: state.authentication.id,
    token:state.authentication.token,
  }
}

const mapDispatchToProps = dispatch => {
  return{
    updateFriendQuery:(key, value) =>{
    dispatch(modalActions.updateFriendQuery(key, value))
    }
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(FriendButton)
