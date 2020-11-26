import axios from "axios"
import { USER_LOGIN_FAIL, 
  USER_LOGIN_REQUEST, 
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_LOGOUT,
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_FAIL,
  USER_PROFILE_RESET,  
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL
} from "../constants/userConstants"

import {MY_ORDER_DETAILS_RESET} from "../constants/orderConstants"

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


// getting the user profile
export const getuserProfile = (id) => async(dispatch, getState) =>{  
  
  try {
    dispatch({
      type: USER_PROFILE_REQUEST
    })

    const { userLogin: { userInfo } } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}` 
      }
    }
    const { data } = await axios.get(
      `/api/users/${id}`, 
      config)  

    dispatch({
      type: USER_PROFILE_SUCCESS,
      payload: data
    })     
     
  } catch (error) {
      dispatch({        
        type: USER_PROFILE_FAIL,
        payload: error.response &&
          error.response.data.message
            ? error.response.data.message
            : error.message
      })   
  }
}

// update the user profile
export const updateUserProfile = (user) => async(dispatch, getState) =>{  
  
  try {
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST
    })

    const { userLogin: { userInfo } } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}` 
      }
    }
    const { data } = await axios.put(
      `/api/users/profile`, 
      user,
      config)  

    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data
    })    
    
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data
    }) 

    dispatch({
      type: USER_PROFILE_SUCCESS,
      payload: data
    }) 
     
  } catch (error) {
      dispatch({        
        type: USER_UPDATE_PROFILE_FAIL,
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
  dispatch({
    type: USER_PROFILE_RESET
  })
  dispatch({
    type: MY_ORDER_DETAILS_RESET
  })
  dispatch({
    type: USER_LIST_RESET
  })
}

// get the user list for the admins 
export const listUsers = () => async(dispatch, getState) =>{  
  
  try {
    dispatch({
      type: USER_LIST_REQUEST
    })

    const { userLogin: { userInfo } } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}` 
      }
    }
    const { data } = await axios.get(
      `/api/users/`, 
      config)  

    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data
    })     
     
  } catch (error) {
      dispatch({        
        type: USER_LIST_FAIL,
        payload: error.response &&
          error.response.data.message
            ? error.response.data.message
            : error.message
      })   
  }
}
// delete a user based on the id of the user 
export const deleteUser = (id) => async(dispatch, getState) =>{  
  
  try {
    dispatch({
      type: USER_DELETE_REQUEST
    })

    const { userLogin: { userInfo } } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}` 
      }
    }
    await axios.delete(
      `/api/users/${id}`, 
      config)  

    dispatch({
      type: USER_DELETE_SUCCESS,      
    })     
     
  } catch (error) {
      dispatch({        
        type: USER_DELETE_FAIL,
        payload: error.response &&
          error.response.data.message
            ? error.response.data.message
            : error.message
      })   
  }
}

// delete a user based on the id of the user 
export const updateUser = (user) => async(dispatch, getState) =>{  
  
  
  try {
    dispatch({
      type: USER_UPDATE_REQUEST
    })

    const { userLogin: { userInfo } } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}` 
      }
    }
    const {data} = await axios.put(
      `/api/users/${user._id}`, 
      user,
      config)  

    dispatch({
      type: USER_UPDATE_SUCCESS,      
    })     

    dispatch({
      type: USER_PROFILE_SUCCESS,
      payload: data      
    })     
     
  } catch (error) {
      dispatch({        
        type: USER_UPDATE_FAIL,
        payload: error.response &&
          error.response.data.message
            ? error.response.data.message
            : error.message
      })   
  }
}