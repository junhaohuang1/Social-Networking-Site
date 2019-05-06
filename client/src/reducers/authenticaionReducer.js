import Auth from "../Auth.js";

let user = Auth.checkUserLoggedIn();
const initialState = user ? ({
  loggedIn: true,
  username: user.userData.username,
  errors:{},
  successMessage:"",
  id: user.userData.id,
  password: '',
  token: user.token
  }) :
({
  loggedIn: false,
  username: "",
  errors:{},
  successMessage:"",
  password: '',
  token: '',
  id:''
});

export function authentication(state = initialState, action) {
  switch (action.type) {
    case "SIGNIN_FORM_UPDATE_VALUE_FULFILLED":
    return {
      ...state,
      [action.key]: action.value
    };
    case "USERS_LOGIN_PENDING":
      return {
        ...state,
        loggingIn: true,
        successMessage: "",
      };
    case "USERS_LOGIN_FULFILLED":
      Auth.authenticateUser(action.payload.data.user)
      return ({
        ...state,
        loggedIn: true,
        loggingIn: false,
        userData: action.payload.data.user.userData,
        username: action.payload.data.user.userData.username,
        id: action.payload.data.user.userData.id,
        token:action.payload.data.user.token,
        errors:{},
        password: ''
      }
    );
    case "USERS_LOGIN_REJECTED":
      return {
        ...state,
        loggingIn: false,
        loggedIn: false,
        errors: action.payload.response.data.errors
      };
    case "USERS_LOGOUT":
      return {
        loggedIn: false,
        username: "",
        errors:{},
        successMessage:"",
        password: '',
        token: '',
        id:''
      };
    default:
      return state
  }
}
