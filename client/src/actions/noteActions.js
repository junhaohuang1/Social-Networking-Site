import axios from 'axios';

const updateNoteInput = (key, value) => (dispatch) => (
  dispatch({
      type: "NOTE_FORM_UPDATE_VALUE_FULFILLED",
      key, value
  })
)

//get method for submitting notes
const getNote = (id) => (dispatch) => (
  dispatch({
    type: "GET_NOTE",
    payload: axios.get('/image/', {
      id:id
    })
  })
);

//post method for submitting notes
const uploadNote = (body, username) => (dispatch) => (
  dispatch({
    type: "UPLOAD_NOTE",
    payload: axios.post('/image/:id', {
      URL: URL,
      username: username
    })
  })
);

export const noteActions = {
  getNote,
  updateNoteInput,
  uploadNote
};
