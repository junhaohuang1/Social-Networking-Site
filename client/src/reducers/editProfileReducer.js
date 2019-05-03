
const initialState = {

  username:"",
  firstname:"",
  lastname:"",
  birthday:new Date(),
  privacy: false,
  interest:"",
  errors:{},
  successMessage:"",
  errorMessage:"",
  emailError:"",
  passwordError:"",
  country:"",
  region:"",
}
export function editProfile(state = initialState, action) {
  switch (action.type) {
    case "GET_PROFILE_FULFILLED":
    return{
      firstname:action.payload.data.firstname,
      lastname:action.payload.data.lastname,
      birthday:action.payload.data.birthday,
      interest:action.payload.data.interest,
      privacy: action.payload.data.privacy,
      country:action.payload.data.country,
      region:action.payload.data.region,
    }
    case "PROFILE_FORM_UPDATE_VALUE_FULFILLED":
    return {
      ...state,
      [action.key]: action.value
    };
    case "PROFILE_EDIT_PENDING":
      return {
        ...state,
      };
    case "PROFILE_EDIT_FULFILLED":

      return {
		...state,
  		errors:{},
      firstname:action.payload.data.firstname,
      lastname:action.payload.data.lastname,
      birthday:action.payload.data.birthday,
      interest:action.payload.data.interest,
      privacy: action.payload.data.privacy,
      country:action.payload.data.country,
      region:action.payload.data.region,
      errorMessage:""
    };
    case "PROFILE_EDIT_REJECTED":
      return {
        ...state,
        errors: action.payload.response.data.errors,
        successMessage:"",
        errorMessage:action.payload.response.data.message
      };
    default:
      return state
  }
}
