import express from 'express'
const router = express.Router()
import Product from '../models/productModel.js'
import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public 
router.get('/', asyncHandler(async (req, res) =>{
    const products = await Product.find({})
    res.status(401)
    throw new Error('Not Authorized')
    // res.status(200).json(products)
}))

// @desc    Fetch single product
// @route   GET / api/products/:id
// @access  Public 
router.get('/:id', asyncHandler(async (req, res) =>{
    const product = await Product.findById(req.params.id )
    if (product){
        res.json(product)
    }else{
        res.status(404).json({
            message: 'Product not found in the database'})
    }    
}))



export default router