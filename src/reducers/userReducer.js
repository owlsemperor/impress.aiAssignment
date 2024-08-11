const initialState = {
  users: [],
}

const userReducer = (state = initialState, action) => {
  console.log('Reducer Action:', action) // Debugging line
  switch (action.type) {
    case 'LIST_USERS':
      return {
        ...state,
        users: action.payload,
      }
    default:
      return state
  }
}
export default userReducer
