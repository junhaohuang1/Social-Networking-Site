import React from 'react';
import PropTypes from 'prop-types'
import ReactPlayer from 'react-player'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import MapModal from '../containers/mapmodal.js'
import Likes from '../containers/likes.js'
import Comment from '../containers/commentmodal.js'

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


const ActivityForm = (props) => (
  <div key = {props.friendPost.id} class ='col-lg-8' style={{height:'100%'}}>
    <div className ='top'>
      <List style = {rootstyle}>
        <ListItem alignItems="flex-start">
          <ListItemText
            primary= {props.friendPost.title + ' posted at ' + moment(props.friendPost.createdAt).format('MM/DD/YYYY')}
            secondary={
              <React.Fragment>
                <Typography component="span" style={inline} color="textPrimary">
                  {props.friendPost.username}:
                </Typography>
                 {props.friendPost.textbody}
                 <div class='container'>
                  <div class ='row'>
                    <Likes postID={props.friendPost.id}/>
                  </div>
                 </div>
              </React.Fragment>
            }
        />
        {props.friendPost.mimetype.includes('image') ? <img height='300px' width='300px' src={props.friendPost.path}/> :
        <ReactPlayer
          className='react-player'
          url={props.friendPost.path}
          width='300px'
          height='300px'
        />
        }
        <MapModal
          lat={props.friendPost.coordinates.x}
          lng={props.friendPost.coordinates.y}
          label={props.friendPost.locationLabel}
        />
        </ListItem>
      </List>
    </div>
  </div>

)

export default ActivityForm;
