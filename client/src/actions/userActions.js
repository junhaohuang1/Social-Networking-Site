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


export const editProfile = (userid, firstname, lastname, city, birthday, interest, privacy, token) =>{
  return (dispatch) =>{
    return axios.post('/api/editprofile/' +userid,
     {
       firstname:firstname,
       lastname:lastname,
       city:city,
       birthday:birthday,
       interest:interest,
       privacy:privacy
     },
     {
         headers: {
         authorization:token
       }
      }
    )
      .then(response =>{
        dispatch(editProfileSuccess(response.data))
      })
      .catch(error =>{
        throw(error);
      })

  }
}

export const editProfileSuccess =  (data) => {
  return {
    type: "PROFILE_EDIT",
    payload: {
      data:data
    }
  }
};


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
    editProfile,
    editProfileSuccess,
    updateSignInForm,
    updateSignUPForm,
    updateProfileForm
};
