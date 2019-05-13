import React from 'react';
import { connect } from 'react-redux';
import ReactPlayer from 'react-player'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import MapModal from './mapmodal.js'
import Likes from './likes.js'
import Comment from './commentmodal.js'
import axios from 'axios'
import { modalActions } from '../actions';


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


class FriendPostSearchResults extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      posts:[],
      playing: false
    };
    this.playVideo = this.playVideo.bind(this)
    this.pauseVideo = this.pauseVideo.bind(this)
  }

  onPlay = () => {
    console.log('onPlay')
    this.setState({ playing: true })
  }

  onPause = () => {
    console.log('onPause')
    this.setState({ playing: false })
  }

  playVideo(event){
    event.preventDefault()
    this.setState({ playing: true })
  }

  pauseVideo(event){
    event.preventDefault()
    console.log('pausing')
    this.setState({ playing: false })
  }

  componentDidMount(){
    console.log('get likes user ' + this.props.userid)
      axios.get('/api/friendposts',
      {
        headers:{
          authorization:this.props.token,
          query:this.props.usernameQuery,
        }
      }
    ).then(resp => {
        console.log(resp.data.posts)
        this.setState({
          posts:resp.data.posts
        })
        this.props.updateFriendQuery('postSearchQuery','');
      }).catch(error =>{
        console.log(error)
      })
  }


  render(){
    if(!this.state.posts ||this.state.posts.length === 0){
      return <div><h2>No Results</h2></div>
    }
    console.log(this.state.posts)
    return this.state.posts.map(friendPost => {
      return (
      <div key = {friendPost.id} class ='col-lg-8' style={{height:'100%'}}>
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
                     <div class='container'>
                      <div class ='row'>
                        <Likes postID={friendPost.id}/>
                      </div>
                     </div>
                  </React.Fragment>
                }
            />
            {friendPost.mimetype.includes('image') ? <img height='300px' width='300px' src={friendPost.path}/> :
            <div>
            <button onClick={this.playVideo}>Play</button>
            <button onClick={this.pauseVideo}>Pause</button>
            <ReactPlayer
              className='react-player'
              url={friendPost.path}
              width='300px'
              height='300px'
            />
            </div>
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
    usernameQuery:state.friendship.usernameQuery
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    updateFriendQuery:(key, value) =>{
      dispatch(modalActions.updateFriendQuery(key, value))
    }
  }

}



export default connect(mapStateToProps,mapDispatchToProps)(FriendPostSearchResults)
