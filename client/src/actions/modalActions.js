import axios from 'axios';

const openModal = () => (dispatch) => (
  dispatch({
      type: "MODAL_OPEN",
  })
)


const openMapModal = () => (dispatch) => (
  dispatch({
      type: 'MAP_MODAL_OPEN',
  })
)

const closeMapModal = () => (dispatch) => (
  dispatch({
      type: 'MAP_MODAL_CLOSE',
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

const openFriendSearchResultModal = () => (dispatch) => (
  dispatch({
      type: "FRIEND_SEARCH_RESULT_MODAL_OPEN",
  })
)


const closeFriendSearchResultModal = () => (dispatch) => (
  dispatch({
      type: "FRIEND_SEARCH_RESULT_MODAL_CLOSE",
  })
)

const updateFriendQuery = (key, value) => (dispatch) => (
  dispatch({
      type: "FRIEND_QUERY_UPDATE_VALUE_FULFILLED",
      key, value
  })
)



export const createPost = (userid,username, title, textbody, lat, long, locationLabel, file, token) =>{
  var bodyFormData = new FormData();
  bodyFormData.append('username',username)
  bodyFormData.append('title',title)
  bodyFormData.append('textbody',textbody)
  bodyFormData.append('file',file)
  bodyFormData.append('lat',lat)
  bodyFormData.append('long',long)
  bodyFormData.append('locationLabel',locationLabel)
  bodyFormData.append('userid', userid)
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
  createPost,
  openFriendSearchResultModal,
  closeFriendSearchResultModal,
  updateFriendQuery,
  openMapModal,
  closeMapModal
};
