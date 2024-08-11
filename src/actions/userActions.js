export const getUsers = () => async (dispatch) => {
  try {
    // console.log('Getting user...')
    const response = await fetch('http://example.com/users')
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`)
    }
    const parsedResponse = await response.json()
    console.log('Fetched Users:', parsedResponse) // Debugging line
    dispatch({
      type: 'LIST_USERS',
      payload: parsedResponse,
    })
  } catch (e) {
    console.error('Error fetching users:', e)
  }
}

export const addUser = (payload) => async (dispatch) => {
  try {
    // console.log('Adding user...')
    const response = await fetch('http://example.com/user', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`)
    }
    const parsedResponse = await response.json()
    // console.log('Add User Response:', parsedResponse) // Debugging line
    if (parsedResponse.success) {
      dispatch(getUsers()) // Refresh the user list
    }
  } catch (e) {
    console.error('Error adding user:', e)
  }
}

export const deleteUser = (id) => async (dispatch) => {
  try {
    // console.log('Deleting user...')
    const response = await fetch(`http://example.com/user/${id}`, {
      method: 'DELETE',
    })
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`)
    }
    console.log('Delete User Response:', await response.text()) // Debugging line
    dispatch(getUsers()) // Refresh the user list
  } catch (e) {
    console.error('Error deleting user:', e)
  }
}

export const updateUser = (payload) => async (dispatch) => {
  try {
    const response = await fetch(`http://example.com/user/${payload.id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`)
    }

    const parsedResponse = await response.json()
    console.log('Update User Response:', parsedResponse) // Debugging line

    if (parsedResponse.success) {
      dispatch(getUsers()) // Refresh the user list
    }
  } catch (e) {
    console.error('Error updating user:', e)
  }
}
// bonus step first
export const setEditedUser = (user) => ({
  type: 'SET_EDITED_USER',
  payload: user,
})
// bonus step second
export const clearEditedUser = () => ({
  type: 'CLEAR_EDITED_USER',
})
