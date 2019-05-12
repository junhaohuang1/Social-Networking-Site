import { combineReducers } from 'redux';
import { authentication } from './authenticaionReducer.js';
import { registration } from './registrationReducer.js';
import { editProfile } from './editProfileReducer.js';
import { friendship } from './friendshipReducer.js';
import { note } from './noteReducer.js'
import { alert } from './alertReducer.js';
import {postModal} from './postModalReducer.js';
import {map} from './mapReducer.js'
import { connectRouter } from 'connected-react-router'


export default (history)=> combineReducers({
  authentication,
  friendship,
  editProfile,
  registration,
  alert,
  postModal,
  note,
  map,

  router:connectRouter(history)
});
