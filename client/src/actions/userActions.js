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


const updateProfileForm = (key, value) => (dispatch) => (
  dispatch({
      type: "PROFILE_FORM_UPDATE_VALUE_FULFILLED",
      key, value
  })
)



const login = (username,password) => (dispatch) => (
  dispatch({
    type: "USERS_LOGIN",
    payload: axios.post('/auth/login', {
      username: username,
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
      firstname: firstname,
      lastname: lastname,
      city: city,
      birthday: birthday,
      interest: interest,
      privacy: privacy,
      password: password
    })
  })
);


const editprofile = (userid, firstname, lastname, city, password, birthday, interest, privacy) => (dispatch) => (
  dispatch({
    type: "PROFILE_EDIT",
    payload: axios.put('/api/editprofile/'+userid, {
      firstname: firstname,
      lastname: lastname,
      city: city,
      birthday: birthday,
      interest: interest,
      privacy: privacy,
      password: password
    })
  })
);

const getProfile = (userid, token) => (dispatch) => (
  dispatch({
    type: "GET_PROFILE",
    payload: axios.get('/api/profile/'+userid, {
    headers:{
      authorization:token
    }
    })
  })
);





export const userActions = {
    login,
    logout,
    signup,
    getProfile,
    editprofile,
    updateSignInForm,
    updateSignUPForm,
    updateProfileForm
};
