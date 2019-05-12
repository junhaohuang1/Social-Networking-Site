const initialState = {
  mapModalOpen: false,
  errors:{},
}

export function map(state = initialState, action) {
  switch(action.type){
    case "MAP_MODAL_OPEN":
      return{
        ...state,
        mapModalOpen: true
      };
    case "MAP_MODAL_CLOSE":
      return{
        ...state,
        mapModalOpen: false
      };
    case "MODAL_FORM_UPDATE_VALUE_FULFILLED":
    return {
      ...state,
      [action.key]: action.value
    };
    default:
      return state

  }
}
