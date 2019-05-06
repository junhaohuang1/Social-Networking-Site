import { combineReducers } from 'redux';
import { authentication } from './authenticaionReducer.js';
import { registration } from './registrationReducer.js';
import { editProfile } from './editProfileReducer.js';
import { note } from './noteReducer.js'
import { alert } from './alertReducer.js';
import {postModal} from './postModalReducer.js';
import { connectRouter } from 'connected-react-router'


export default (history)=> combineReducers({
  authentication,
  editProfile,
  registration,
  alert,
  postModal,
  note,

  router:connectRouter(history)
});
