import axios from 'axios';
import Auth from '../Auth.js'




export const receiveFRList = (token, userid) => (dispatch) => (
  dispatch({
    type: "RECEIVE_FRIENDS_WANNABES",
    payload: axios.get('/api/listFR',{
      headers:{
        authorization:token,
        userid:userid,
      }
    })
  })
);



export async function acceptFR(userid, otherUserId, token) {
    const { data } = await axios.post('/api/acceptFR',
    {
      otherUserId: this.otherUserId,
      userid:userid,
    },
    {
      headers:{
      authorization:this.props.token
      }
    });
    return {
        type: 'ACCEPT_FRIEND_REQUEST',
        users: data
    };
}


const searchFriend = (userid, searchedName, token) => (dispatch) => (
  dispatch({
    type: "FRIEND_SEARCH",
    payload: axios.get('/api/findfriend', {
      headers:{
        authorization:token,
        searchedName: searchedName,
        userid:userid,
      }
    })
  })
);



export async function unfriend(userid, otherUserId, token) {
    const { data } = await axios.post('/api/deleteFR',
    {
      otherUserId: otherUserId,
      userid:userid,
    },
    {
      headers:{
      authorization:this.props.token
      }
    });
    return {
        type: 'UNFRIEND'
    };
}






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

const signup = (username, firstname, lastname, country, region, password, birthday, interest, privacy) => (dispatch) => (
  dispatch({
    type: "USERS_REGISTER",
    payload: axios.post('/auth/signup', {
      username: username,
      firstname: firstname,
      lastname: lastname,
      country: country,
      region:region,
      birthday: birthday,
      interest: interest,
      privacy: privacy,
      password: password
    })
  })
);


export const editProfile = (userid, firstname, lastname, country, region, birthday, interest, privacy, token) =>{
  return (dispatch) =>{
    return axios.post('/api/editprofile/' +userid,
     {
       firstname:firstname,
       lastname:lastname,
       country:country,
       region:region,
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
    searchFriend,
    updateSignInForm,
    updateSignUPForm,
    updateProfileForm
};
