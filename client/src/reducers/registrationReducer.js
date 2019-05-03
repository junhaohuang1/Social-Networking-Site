
const initialState = {
  registering: false,
  registered: false,
  username:"",
  firstname:"",
  lastname:"",
  birthday:new Date(),
  password:"",
  privacy: false,
  interest:"",
  errors:{},
  successMessage:"",
  errorMessage:"",
  passwordError:"",
  country:"",
  region:"",
}
export function registration(state = initialState, action) {
  switch (action.type) {
    case "SIGNUP_FORM_UPDATE_VALUE_FULFILLED":
    return {
      ...state,
      [action.key]: action.value
    };
    case "USERS_REGISTER_PENDING":
      return {
        ...state,
        registering: true
      };
    case "USERS_REGISTER_FULFILLED":

      return {
		...state,
  		registering: false,
  		registered: true,
  		successMessage: action.payload.data.message,
  		errors:{},
  		username:"",
  		firstname:"",
  		lastname:"",
  		birthday:"",
  		password:"",
      interest:"",
  		privacy: false,
      country:"",
      region:"",
    };
    case "USERS_REGISTER_REJECTED":
      return {
        ...state,
        registering: false,
        registered: false,
        errors: action.payload.response.data.errors,
        successMessage:"",
        errorMessage:action.payload.response.data.message
      };
    default:
      return state
  }
}
