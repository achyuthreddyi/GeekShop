import Product from '../models/productModel.js'
import asyncHandler from 'express-async-handler'


// @desc    Fetch all products
// @route   GET /api/products
// @access  Public 
const getAllProducts = asyncHandler(async(req, res) => {
  const products = await Product.find({})
  res.status(200).json(products)
})

// @desc    Fetch single product
// @route   GET / api/products/:id
// @access  Public 
const getProductById = asyncHandler(async(req,res) =>{
  const product = await Product.findById(req.params.id )
    if (product){
        res.json(product)
    }else{
        res.status(404).json({
            message: 'Product not found in the database'})
  }  
})

export { getAllProducts, getProductById }