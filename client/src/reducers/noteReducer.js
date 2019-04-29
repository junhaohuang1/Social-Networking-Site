
const initialState = {
  uploading: false,
  uploaded: false,
  fetching: false,
  fetched: false,
  note: [],
  successMessage:"",
  errorMessage:"",
  emailError:"",
  passwordError:"",
}
export function note(state = initialState, action) {
  switch (action.type) {
    case "NOTE_FORM_UPDATE_VALUE_FULFILLED":
    return {
      ...state,
      [action.key]: action.value
    };
    case "UPLOAD_NOTE_PENDING":
      return {
        ...state,
        uploading: true
      };
    case "UPLOAD_NOTE_FULFILLED":
      return {
        ...state,
        uploading: false,
        uploaded: true,
        successMessage: action.payload.data.message,
        note: "",
        errorMessage:""
      };
    case "UPLOAD_NOTE_REJECTED":
      return {
        ...state,
        uploading: false,
        uploaded: false,
        successMessage:"",
        note: "",
        errorMessage:action.payload.response.data.message
      };
    default:
      return state
  }
}
