const initialState = {
  editedUser: null,
}

const editedUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_EDITED_USER':
      return {
        ...state,
        editedUser: action.payload,
      }
    case 'CLEAR_EDITED_USER':
      return {
        ...state,
        editedUser: null,
      }
    default:
      return state
  }
}

export default editedUserReducer
