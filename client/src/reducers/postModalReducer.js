const initialState = {
  modalIsOpen: false,
  title:"",
  textbody:"",
  file:"",
  uploading: false,
  uploaded: false,
  errorMessage:"",
  region:"",
  country:"",
  errors:{},
  lat:"",
  long:"",
  locationLabel:"",

}

export function postModal(state = initialState, action) {
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
    case "CREATE_POST_SUCCESS":
    return {
      ...state,
      uploading: false,
      uploaded: true,
      region:"",
      country:"",
      errors:{},
      title:"",
      textbody:"",
      file:"",
    };
    case "CREATE_POST_REJECTED":
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
