export function friendship (
  state = {
    sender_id:"",
    receiver_id:"",
    searchedName:"",
    friendModalOpen: false,
    status:"",
    friendsPosts:"",
    postSearchQuery:""

  },
action) {

  if(action.type==='FRIEND_SEARCH_RESULT_MODAL_OPEN'){
    return{
        ...state,
        friendModalOpen: true
      };
  }

  if(action.type==='FRIEND_SEARCH_RESULT_MODAL_CLOSE'){
    return{
        ...state,
        friendModalOpen: false
      };
  }

  if(action.type === 'FRIEND_QUERY_UPDATE_VALUE_FULFILLED'){
    return {
      ...state,
      [action.key]: action.value
    };
  }

  if(action.type === 'FRIEND_SEARCH_PENDING'){
    return {
      ...state,
      searching: true
    };
  }


  if(action.type === 'FRIEND_SEARCH_FULFILLED'){
    return {
      ...state,
      searching: false,
      searched: true,
      searchingSuccess: action.payload.data.success,
      errors:{},
      searchedId:action.payload.data.userId,
      searchedName:"",
      searchedFirstName:action.payload.data.firstname,
      searchedLastName:action.payload.data.lastname,
      sender_id:action.payload.data.sender_id,
      receiver_id:action.payload.data.receiver_id,
      errorMessage:"",
      status:action.payload.data.status,
    };
  }
  if(action.type === 'FRIEND_SEARCH_REJECTED'){
    return {
      ...state,
      searching: false,
      searched: false,
      errors: action.payload.response.data.message,
      successMessage:"",
      searchedName:""
    };
  }
  if(action.type === 'RECEIVE_FRIENDS_WANNABES_FULFILLED') {
        return { ...state, friendsAndWannabes: action.payload.data.users}
    }

  if(action.type === 'ACCEPT_FRIEND_REQUEST') {
      return { ...state,
          friendsAndWannabes: state.friendsAndWannabes.map( user => {
              if (user.id !== action.id) {
                  return user;
              } else {
                  return {
                      ...user,
                      status: 2
                  }
              }
          })
      }
  }

    if(action.type === 'UNFRIEND') {
        return { ...state,
            friendsAndWannabes: state.friendsAndWannabes.map( user => {
                if (user.id !== action.id) {
                    return user;
                } else {
                    return {
                        ...user,
                        status: 4
                    }
                }
            })
        }
    }

    if(action.type==='RECEIVE_FRIENDS_POSTS_FULFILLED'){
      return{
          ...state,
          friendsPosts: action.payload.data.posts
        };
    }



    return state;
}
