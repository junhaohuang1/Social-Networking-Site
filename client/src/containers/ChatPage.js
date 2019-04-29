import React from 'react';
import LoginForm from '../components/ChatPageForm.js';
import { userActions } from '../actions';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import {store} from "../store.js";
import {withRouter} from "react-router-dom";

class ChatPage extends React.component{

  constructor(props, context) {
    super(props, context);

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }


}
