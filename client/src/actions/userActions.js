import axios from 'axios';
import Auth from '../Auth.js'

const updateSignInForm = (key, value) => (dispatch) => (
  dispatch({
      type: "SIGNIN_FORM_UPDATE_VALUE_FULFILLED",
      key, value
  })
)

const updateSignUPForm = (key, value) => (dispatch) => (
  dispatch({
      type: "SIGNUP_FORM_UPDATE_VALUE_FULFILLED",
      key, value
  })
)



const login = (email,password) => (dispatch) => (
  dispatch({
    type: "USERS_LOGIN",
    payload: axios.post('/auth/login', {
      email: email,
      password: password
    })
  })
);

function logout() {
    Auth.deauthenticateUser();
    return { type: "USERS_LOGOUT" };
}

const signup = (username, firstname, lastname, city, password, birthday, interest, privacy) => (dispatch) => (
  dispatch({
    type: "USERS_REGISTER",
    payload: axios.post('/auth/signup', {
      username: username,
      firstname: username,
      lastname: lastname,
      city: city,
      birthday: birthday,
      interest: interest,
      privacy: privacy,
      password: password
    })
  })
);



export const userActions = {
    login,
    logout,
    signup,
    updateSignInForm,
    updateSignUPForm
};
