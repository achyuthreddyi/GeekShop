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
// @desc    DELETE single product
// @route   DELETE / api/products/:id
// @access  Private/Admin 
const deleteProductById = asyncHandler(async(req,res) =>{
  const product = await Product.findById(req.params.id )
  // TODO: implement only the admin who has uploaded the product can only delete the product

  if (product){
    await product.remove() 
    res.json({
      message: "product removed from the database"
    })       
  }else{
    res.status(404).json({
    message: 'Product not found in the database'})
  }  
})
// @desc    Create a product
// @route   POST / api/products
// @access  Private/Admin 
const createProduct = asyncHandler(async(req,res) =>{
  const product = new Product({
    name: 'Sample Product',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpeg',
    brand: 'SAmple Brand',
    category: 'Sample Category',
    countInStock: 0,
    numReviews: 0,
    description : 'sample description'
  })

  const createdProduct = await product.save()
  res.status(201).json(createdProduct)

})

// @desc    update a product
// @route   PUT / api/products/:id
// @access  Private/Admin 
const updateProduct = asyncHandler(async(req,res) =>{

  const {
    name,
    price, 
    description, 
    image, 
    brand, 
    category, 
    countInStock} = req.body  

  const product = await Product.findById(req.params.id)

  if(Product){
    product.name = name
    product.price = price
    product.description = description
    product.image = image
    product.brand = brand
    product.category = category
    product.countInStock = countInStock    

    const updatedProduct = await product.save()
    res.json(updatedProduct)

  }else{
    res.status(404)
    throw new Error('Product not found in database')
  }

})

export { getAllProducts, 
  getProductById, 
  deleteProductById, 
  createProduct,
  updateProduct,
}