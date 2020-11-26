import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { getuserProfile, updateUser } from '../actions/userActions'
import {USER_UPDATE_RESET} from '../constants/userConstants'

const UserEditScreen = ({ match, history }) => {

  const userId = match.params.id

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setisAdmin] = useState(false)

  const dispatch = useDispatch()

  const userProfile = useSelector(state => state.userProfile)
  const { loading, error, user } = userProfile

  const userUpdate = useSelector(state => state.userUpdate)
  const { 
    loading: loadingUpdate, 
    error: errorUpdate, 
    success: successUpdate  } = userUpdate

  useEffect(() => {
    if(successUpdate){
      dispatch({ type: USER_UPDATE_RESET})
      history.push('/admin/userlist')
    }else{
      if(!user.name || user._id !== userId ){
        dispatch(getuserProfile(userId))
      } else{
        setName(user.name)
        setEmail(user.email)
        setisAdmin(user.isAdmin)
      }
    }
  }, [dispatch, history, userId, user, successUpdate])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateUser({ _id: userId, name, email, isAdmin}))
  }

  return (
    <>
      <Link to='/admin/userlist' className='btn btn-light my-3'>
        <AiOutlineArrowLeft/> GoBack 
      </Link>

      <FormContainer>
        <h1>Edit user</h1>
        
        {loading && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? <Loader /> : error? <Message variant='danger'>{error}</Message>:(
          <Form onSubmit={submitHandler}>

          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='name'
              placeholder='Please Enter Your Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            >
            </Form.Control>
          </Form.Group>

          <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            >
            </Form.Control>
          </Form.Group>

          <Form.Group controlId='isadmin'>
            <Form.Check
              type="checkbox"
              label="isAdmin"
              checked={isAdmin}
              onChange={(e) => setisAdmin(e.target.checked)}
            />
            
            {/* <Form.Check type="checkbox" label="Check me out" /> */}
          </Form.Group>          

          <Button type='submit' variant='primary'>Update </Button>
        </Form>

        )}
      </FormContainer>   
           
    </>    
  )
}

export default UserEditScreen
