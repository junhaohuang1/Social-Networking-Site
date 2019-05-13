import React from 'react'
import {connect} from 'react-redux'
import Modal from 'react-modal';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import axios from 'axios'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import moment from 'moment';

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

const style={
  position:'absolute',
  bottom:'0',
  left:'0'
}

const rootstyle= {
  width: '100%'
}

const inline=  {
    display: 'inline'
}


class Comment extends React.Component{
  constructor(props, context){
    super(props, context);
    this.state = {
      modalIsOpen: false,
      comment:"",
      postComments:[],
      errors:{},
      postCommentsCount:0
    };
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }



  componentWillMount() {
    Modal.setAppElement('body');
  }

  componentDidMount(){
    this.getPostComments()
  }

  getPostComments(){
    console.log('get user comments')
      axios.get('/api/getpostcomments',
      {
        headers:{
          authorization:this.props.token,
          postID:this.props.postID,
          userId:this.props.userid
        }
      }
    ).then(resp => {
        console.log(resp.data.postComments)
        this.setState({
          postComments:resp.data.postComments,
          postCommentsCount:resp.data.postComments.length
        })
      }).catch(error =>{
        console.log(error)
      })
  }


  onSubmit(event){
    event.preventDefault();
    const comment = this.state.comment
    if(!comment){
      this.setState({
        errors:{comment:"Please fill out the comment"}
      })
    } else {
      console.log('commenting stuff')
      console.log(this.props.userid)
      console.log('post' + this.props.postID)
      axios.post('/api/comment',
          {
            postID:this.props.postID,
            userId:this.props.userid,
            username:this.props.username,
            comment:this.state.comment
          },
          {
            headers:{
            authorization:this.props.token
            }
          }
        )
      .then (resp => {
        this.getPostComments()
        this.setState({
          comment:''
        })
      })
    }
  }

  onChange(event) {
    console.log('changing stuff')
    const value = event.target.value;
    console.log('value is ' + value)
    this.setState({
      comment:value
    })
    console.log(this.state)
  }


  render(){
    return(
      <div>
        <button onClick={this.openModal}>
          <i class='fa fa-comments-o' style={{fontSize:'20px'}}>
          <div className="hits" style={{float:'left'}}>{this.state.postCommentsCount}</div>
        </i></button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
        >
        <h2 ref={subtitle => this.subtitle = subtitle}>Add Comments</h2>
        <button onClick={this.closeModal}>close</button>

        <form action ='/' onSubmit={this.onSubmit}>

        <div className="field-line">
          <TextField
            floatingLabelText="Comment"
            name="comment"
            onChange={this.onChange}
            errorText={this.state.errors.comment ?(this.state.errors.comment) :("")}
            value={this.state.comment}
            multiLine={true}
            rows={3}
          />
        </div>

        <div className="button-line">
          <RaisedButton type="submit" label="Create Comment" primary />
        </div>
        </form>
        <br></br>
        {this.state.postComments.map(postComment =>{
          return(
            <div key = {postComment.id} class ='col-lg-8'>
              <div className ='top'>
                <List style = {rootstyle}>
                  <ListItem alignItems="flex-start">
                    <ListItemText
                      primary= {
                        <React.Fragment>
                          <Typography component="span" style={inline} color="textPrimary">
                            {postComment.username} on {moment(postComment.createdAt).format('MM/DD/YYYY')} wrote :
                          </Typography>
                            {postComment.comment}
                        </React.Fragment>
                      }
                  />
                  </ListItem>
                </List>
                </div>
              </div>
            )
          })}
        </Modal>
      </div>
    )
  }
}

function mapStateToProps(state){
  return{
    userid: state.authentication.id,
    token:state.authentication.token,
    username:state.authentication.username
  }
}

export default connect(mapStateToProps)(Comment)
