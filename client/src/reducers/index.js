import { combineReducers } from 'redux';
import { authentication } from './authenticaionReducer.js';
import { registration } from './registrationReducer.js';
import { note } from './noteReducer.js'
import { alert } from './alertReducer.js';
import {modal} from './modalReducer.js';
import { connectRouter } from 'connected-react-router'


export default (history)=> combineReducers({
  authentication,
  registration,
  alert,
  modal,
  note,

  router:connectRouter(history)
});
