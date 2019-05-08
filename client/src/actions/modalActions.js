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


export const createPost = (username, title, textbody, country, region, file, filetype, token) =>{
  var bodyFormData = new FormData();
  bodyFormData.append('username',username)
  bodyFormData.append('title',title)
  bodyFormData.append('textbody',textbody)
  bodyFormData.append('file',file)
  bodyFormData.append('filetype',filetype)
  bodyFormData.append('country',country)
  bodyFormData.append('region',region)

  return (dispatch) =>{
    return axios.post('/api/createpost',
      bodyFormData,
      {
        headers:{
        'authorization':token,
        'Content-Type': 'multipart/form-data'
        }
      }
    ).then(response =>{
        dispatch(createPostSuccess(response.data))
      })
      .catch(error =>{
        throw(error);
      })

  }
}




export const createPostSuccess =  (data) => {
  return {
    type: "CREATE_POST_SUCCESS",
    payload: {
      data:data
    }
  }
};



export const modalActions = {
  closeModal,
  openModal,
  updateModalInput,
  createPost
};
