const initialState = {
  modalIsOpen: false,
  src:"",
  uploading: false,
  uploaded: false,
  errorMessage:"",
}

export function modal(state = initialState, action) {
  switch(action.type){
    case "MODAL_OPEN":
      return{
        ...state,
        modalIsOpen: true
      };
    case "MODAL_CLOSE":
      return{
        ...state,
        modalIsOpen: false
      };
    case "MODAL_FORM_UPDATE_VALUE_FULFILLED":
    return {
      ...state,
      [action.key]: action.value
    };
    case "UPLOAD_IMAGE_PENDING":
    return {
      ...state,
      uploading: true
    };
    case "UPLOAD_IMAGE_FULFILLED":
    return {
      ...state,
      uploading: false,
      uploaded: true
    };
    case "UPLOAD_IMAGE_REJECTED":
    return {
      ...state,
      uploading: false,
      uploaded: true,
      errorMessage:action.payload.response.data.message,
      errors: action.payload.response.data.errors
    };
    default:
      return state

  }
}
