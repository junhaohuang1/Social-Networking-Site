import React from 'react';
import { connect } from 'react-redux';
import { receiveFRPostList } from '../actions/userActions';
import ReactPlayer from 'react-player'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import MapModal from './mapmodal.js'
import Likes from './likes.js'


const rootstyle= {
  width: '100%'
}

const inline=  {
    display: 'inline'
}

const imgstyle = {
    position: 'relative',
    float: 'left',
    width:  '100px',
    height: '100px'
}


class Activity extends React.Component{


  componentDidMount(){
    this.props.dispatch(receiveFRPostList(this.props.token, this.props.userid))
  }


  render(){
    if(!this.props.friendsPosts){
      return null
    }
    return this.props.friendsPosts.map(friendPost => {
      return (
      <div key = {friendPost.id} class ='col-lg-8'>
        <div className ='top'>
          <List style = {rootstyle}>
            <ListItem alignItems="flex-start">
              <ListItemText
                primary= {friendPost.title + ' posted at ' + moment(friendPost.createdAt).format('MM/DD/YYYY')}
                secondary={
                  <React.Fragment>
                    <Typography component="span" style={inline} color="textPrimary">
                      {friendPost.username}:
                    </Typography>
                     {friendPost.textbody}
                     <Likes postID={friendPost.id}/>
                  </React.Fragment>
                }
            />
            {friendPost.mimetype.includes('image') ? <img height='300px' width='300px' src={friendPost.path}/> :
            <ReactPlayer
              className='react-player'
              url={friendPost.path}
              width='300px'
              height='300px'
            />
            }
            <MapModal
              lat={friendPost.coordinates.x}
              lng={friendPost.coordinates.y}
              label={friendPost.locationLabel}
            />
            </ListItem>
          </List>
        </div>
      </div>
      )
    })
  }
}

function mapStateToProps(state) {
  return {
    username: state.authentication.username,
    userid: state.authentication.id,
    token: state.authentication.token,
    errors:state.postModal.errors,
    friendsPosts:state.friendship.friendsPosts
  }
}



export default connect(mapStateToProps)(Activity)
