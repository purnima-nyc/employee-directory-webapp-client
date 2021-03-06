import * as types from './actionTypes';

const loadUserSuccess = (user) => {
  return {
    type: types.LOAD_USER_SUCCESS,
    payload: user
  }
}

const updateUserSuccess = (user) => {
  return {
    type: types.UPDATE_USER_SUCCESS,
    payload: user
  }
}

const userError = (message) => {
  return {
    type: types.USER_ERROR,
    payload: message
  }
}

export const loginUser = (credentials) => {
  // console.log(credentials)
  return dispatch => {
    return fetch('http://localhost:3001/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
    .then(response => response.json())
    .then(result => {
    console.log(result)
    // {
      // if (result.errors) {
      //   dispatch(userError(result.errors))
      // } else {
        localStorage.setItem('Token', result.token)
        dispatch(loadUser(result.employee.id))
        // dispatch({ type: types.CLEAR_ERROR })
      })
    
    // .catch(error => console.log(error))
  }
}

export const signupUser = (userInfo) => {
  return dispatch => {
    return fetch('http://localhost:3001/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({employee: userInfo})
    })
    .then(response => response.json())
    .then(result => {
      if (result.errors) {
        dispatch(userError(result.errors))
      } else {
        localStorage.setItem('Token', result.token)
        dispatch(findUser(result.token))
        dispatch({ type: types.CLEAR_ERROR })
      }
    })
    .catch(error => console.log(error))
  }
}

export const findUser = (token) => {
  return dispatch => {
    return fetch('http://localhost:3001/api/find', {
      method: 'POST',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token })
    })
    .then(response => response.json())
    .then(result => {
      if (result.errors) {
        dispatch(userError(result.errors))
      } else {
        dispatch(loadUser(result.employee.id))
        dispatch({ type: types.CLEAR_ERROR })
      }
    })
    // .catch(error => console.log(error))
  }
}

export const loadUser = (userId) => {
  return dispatch => {
    return fetch(`http://localhost:3001/api/employees/${userId}`, {
      method: 'GET'
    })
    .then(response => response.json())
    .then(result => {
      dispatch(loadUserSuccess(result))
    })
    // .catch(error => console.log(error))
  }
}

export const updateUser = (user) => {
  return dispatch => {
    return fetch(`http://localhost:3001/api/employees/${user.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ user })
    })
    .then(response => response.json())
    .then(result => {
      if (result.errors) {
        dispatch(userError(result.errors))
      } else {
        dispatch(updateUserSuccess(result))
        dispatch({ type: types.CLEAR_ERROR })
      }
    })
    .catch(error => console.log(error))
  }
}



export const logout = () => {
  return dispatch => {
    localStorage.clear();
    dispatch({type: types.LOGOUT});
  }
}


