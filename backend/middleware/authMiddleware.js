import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

export const protect = asyncHandler(async(req, res, next) =>{
  
  let token 

  if(req.headers.authorization 
    && req.headers.authorization.startsWith('Bearer')){

      token = req.headers.authorization.split(' ')[1]
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await User.findById(decoded.id).select('-password')
        console.log(decoded.id);
        next()
        
      } catch (error) {
        console.error('coming here', error);
        res.status(401)
        throw new Error('Not authorized, token failed ')        
      }     
      
  }  
  if(!token){
    res.status(401)
    throw new Error(' Not authorized')
  }
})