import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'


// @desc    Authenticate the user & get the token
// @route   POST /api/users/login
// @access  Public 
const authUser = asyncHandler(async(req, res) => {
  const {email, password} = req.body
  const user = await User.findOne({email})
  console.log(`user from the database fetched in the authUser function`, user);

  if(user && (await user.matchPassword(password))){    
    res.json({
      _id: user._id,
      name: user.name,
      isAdmin:user.isAdmin,
      token: generateToken(user._id)
    })    
  }else{
    res.status(401)
    throw new Error('Invalid user')
  }  
})

// @desc    register a new user
// @route   POST /api/users/
// @access  Public 
const registerUser = asyncHandler(async(req, res) => {
  const { name, email, password } = req.body

  const userExists = await User.findOne({ email })
  let user

  if(userExists){
    res.status(400)
    throw new Error('User already exists')   
  }else{
    user = await User.create({
      name,
      email,
      password
    })
  }

  if(user){
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin:user.isAdmin,
      token: generateToken(user._id)
    })
  }else{
    res.status(400)
    throw new Error('User unable to upload on to the database')    
  }
})

// @desc    get user profile
// @route   POST /api/users/profile
// @access  Private 
const getUserProfile = asyncHandler(async(req, res) => {
  const user = await User.findById(req.user._id)
  if(user){
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin:user.isAdmin,
    })

  }else{
    res.status(404)
    throw new Error('user not found!!!')
  }
  // console.log('user in the controller', user);
  res.send('success')
   
})
// @desc    update the user profile
// @route   GET /api/users/profile
// @access  Private/ 
const updateUserProfile = asyncHandler(async(req, res) => {
  const user = await User.findById(req.user._id)
  if(user){
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    if(req.body.password){
      user.password = req.body.password
    }    
   
    const updatedUser = await user.save()
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      isAdmin:updatedUser.isAdmin,
      token: generateToken(updatedUser._id)
    })     

  }else{
    res.status(404)
    throw new Error('user not found!!!')
  }
  // console.log('user in the controller', user);
  res.send('success')  
})

// @desc    get all users to the admin
// @route   GET /api/users/
// @access  Private/Admin
const getUsers = asyncHandler(async(req, res) => {
  const users = await User.find({})
  res.json(users)  
})

export { authUser, getUserProfile, registerUser, updateUserProfile, getUsers }