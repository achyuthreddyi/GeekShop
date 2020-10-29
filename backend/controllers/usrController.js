import Product from '../models/productModel.js'
import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'


// @desc    Auth the user & get the token
// @route   POST /api/users/login
// @access  Public 
const authUser = asyncHandler(async(req, res) => {
  const {email, password} = req.body

  const user = await User.findOne({email})

  if(user && (await user.matchPassword(password))){
    res.json({
      _id: user._id,
      name: user.name,
      isAdmin:user.isAdmin,
      token: null
    })    
  }else{
    res.status(401)
    throw new Error('Invalid user')
  }  
})


export {authUser}