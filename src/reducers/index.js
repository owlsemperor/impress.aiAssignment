import { combineReducers } from 'redux'
import userReducer from './userReducer'
import editedUserReducer from './editedUserReducer'

const rootReducer = combineReducers({
  userState: userReducer,
  editedUserState: editedUserReducer, // Add the new reducer here
})

export default rootReducer
