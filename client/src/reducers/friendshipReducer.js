export function friendship (state = {}, action) {
    if(action.type == 'RECEIVE_FRIENDS_WANNABES') {
        let loggedUserId = action.loggedUser
        return { ...state, friendsAndWannabes: action.users, loggedUserId}
    }

    if(action.type == 'ACCEPT_FRIEND_REQUEST') {
        return { ...state,
            friendsAndWannabes: state.friendsAndWannabes.map( user => {
                if (user.id != action.id) {
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

    if(action.type == 'UNFRIEND') {
        return { ...state,
            friendsAndWannabes: state.friendsAndWannabes.map( user => {
                if (user.id != action.id) {
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

    return state;
}
