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


//post method for submitting image url
const uploadImageLink = (URL) => (dispatch) => (
  dispatch({
    type: "UPLOAD_IMAGE",
    payload: axios.post('/api/imagelink', {
      URL: URL,
    })
  })
);

export const modalActions = {
  closeModal,
  openModal,
  updateModalInput,
  uploadImageLink
};
