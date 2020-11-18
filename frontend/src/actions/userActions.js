import axios from "axios"
import { USER_LOGIN_FAIL, 
  USER_LOGIN_REQUEST, 
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_LOGOUT
} from "../constants/userConstants"

export const login = (email, password) => async(dispatch, getState) =>{
  console.log('in the dispatch of the user actions', dispatch);
  try {
    dispatch({
      type: USER_LOGIN_REQUEST
    })

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const { data } = await axios.post(
      '/api/users/login', 
      { email, password},
      config)  

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data
    }) 
    
    localStorage.setItem('userInfo', JSON.stringify(data))
     
  } catch (error) {
      dispatch({        
        type: USER_LOGIN_FAIL,
        payload: error.response &&
          error.response.data.message
            ? error.response.data.message
            : error.message
      })   
  }
}
// register a new user
export const register = (name, email, password) => async(dispatch, getState) =>{
  console.log('in the dispatch of the user actions', dispatch);
  try {
    dispatch({
      type: USER_REGISTER_REQUEST
    })

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const { data } = await axios.post(
      '/api/users/', 
      { name, email, password},
      config)  

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data
    }) 
    
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data
    }) 
    
    localStorage.setItem('userInfo', JSON.stringify(data))
     
  } catch (error) {
      dispatch({        
        type: USER_REGISTER_FAIL,
        payload: error.response &&
          error.response.data.message
            ? error.response.data.message
            : error.message
      })   
  }
}

export const logout = ()=> async (dispatch) =>{
  console.log(`in the logout of the user Action file of the a`, dispatch);
  localStorage.removeItem('userInfo')
  dispatch({
    type: USER_LOGOUT
  })
  dispatch({
    type: USER_REGISTER_LOGOUT
  })
}