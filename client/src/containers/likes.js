import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios'
import Comment from './commentmodal.js'

const style={
  position:'absolute',
  left:'0',
  bottom:'0',
  right:'0',
}



class Likes extends React.Component{
  constructor(props) {
      super(props);
      this.likePost = this.likePost.bind(this);
      this.dislikePost = this.dislikePost.bind(this);
      this.state={
        likes:2,
        dislikes:2,
        status:''
      }
  }

  getPostLikes(){

      axios.get('/api/getPostLikes',
      {
        headers:{
          authorization:this.props.token,
          postID:this.props.postID,
          userId:this.props.userid
        }
      }
    ).then(resp => {
        const likesArray = resp.data.likes.filter(likes => likes.status ===2)
        const dislikesArray = resp.data.likes.filter(likes => likes.status ===3)
        this.setState({
          likes:likesArray.length,
          dislikes:dislikesArray.length,
          status:resp.data.status
        })
      }).catch(error =>{
        console.log(error)
      })
  }

  componentDidMount(){
    this.getPostLikes()

  }


  likePost(){

    axios.post('/api/likePost',
        {
          postID:this.props.postID,
          userId:this.props.userid
        },
        {
          headers:{
          authorization:this.props.token
          }
        }
      )
    .then (resp => {
      // this.setState({
      //   likes:resp.data.likes,
      //   dislikes:resp.data.dislikes,
      //   status:2
      // });
      this.getPostLikes()
    })

  }

  dislikePost(){
    axios.post('/api/dislikepost',
        {
          postID:this.props.postID,
          userId:this.props.userid
        },
        {
          headers:{
          authorization:this.props.token
          }
        }
      )
    .then (resp => {
      // this.setState({
      //   likes:resp.data.likes,
      //   dislikes:resp.data.dislikes,
      //   status:2
      // });
      this.getPostLikes()
    })

  }



  render(){
    return (

      <div className="addlikes-wrapper" style={style}>

               <div className="container">
                <div class='row'>
                  <Comment postID={this.props.postID}class='col-log-4'/>
                   <div
                       className="btn like col-log-4"
                       onClick={this.likePost}>
                       <div className="hits" style={{float:'left'}}>{this.state.likes}</div>
                       <div className="icon" style={{float:'right'}}>
                           {((this.state.status === 0 || this.state.status ===3) && <i className="fa fa-thumbs-up"></i> )
                             || (this.state.status === 2 && <i className="fa fa-thumbs-up" style={{color:'black'}}></i>)
                           }
                       </div>
                   </div>
                   <div
                       className="btn dislike col-log-4"
                       onClick={this.dislikePost}>
                         <div className="hits" style={{float:'left'}}>{this.state.dislikes}</div>
                         <div className="icon" style={{float:'right'}}>
                         {((this.state.status === 0 || this.state.status ===2) && <i className="fa fa-thumbs-down"></i> )
                           || (this.state.status === 3 && <i className="fa fa-thumbs-down" style={{color:'black'}}></i>)
                         }
                         </div>
                   </div>

                   </div>
              </div>
           </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    userid: state.authentication.id,
    token:state.authentication.token
  }
}

export default connect(mapStateToProps)(Likes)
