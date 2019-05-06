import axios from 'axios';

const openModal = () => (dispatch) => (
  dispatch({
      type: "MODAL_OPEN",
  })
)


const closeModal = () => (dispatch) => (
  dispatch({
      type: "MODAL_CLOSE",
  })
)

const updateModalInput = (key, value) => (dispatch) => (
  dispatch({
      type: "MODAL_FORM_UPDATE_VALUE_FULFILLED",
      key, value
  })
)


export const createImagePost = (username, title, textbody, file, filetype, token) =>{
  return (dispatch) =>{
    return axios.post('/api/createimagepost',
     {
       username:username,
       title:title,
       textbody:textbody,
       file:file,
       filetype:filetype
     },
     {
         headers: {
         'authorization':token,
         'Content-Type':'multipart/form-data'
       }
      }
    )
      .then(response =>{
        dispatch(createPostSuccess(response.data))
      })
      .catch(error =>{
        throw(error);
      })

  }
}

export const createVideoPost = (username, title, textbody, file, filetype, token) =>{
  return (dispatch) =>{
    return axios.post('/api/createvideopost',
     {
       username:username,
       title:title,
       textbody:textbody,
       file:file,
       filetype:filetype
     },
     {
         headers: {
         'authorization':token,
         'Content-Type':'multipart/form-data'
       }
      }
    )
      .then(response =>{
        dispatch(createPostSuccess(response.data))
      })
      .catch(error =>{
        throw(error);
      })

  }
}



export const createPostSuccess =  (data) => {
  return {
    type: "CREATE_POST_EDIT",
    payload: {
      data:data
    }
  }
};



export const modalActions = {
  closeModal,
  openModal,
  updateModalInput,
  createImagePost,
  createVideoPost
};
