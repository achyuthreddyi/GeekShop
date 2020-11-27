import Order from '../models/orderModel.js'
import asyncHandler from 'express-async-handler'


// @desc    create a new Order
// @route   POST /api/orders
// @access  Private 
const addOrderItems = asyncHandler(async(req, res) => {
  const { 
    orderItems, 
    shippingAddress, 
    paymentMethod, 
    itemsPrice, 
    taxPrice, 
    shippingPrice,
    totalPrice } = req.body

  if(orderItems && orderItems.length === 0){
    res.status(400)
    throw new Error('No Order items')
    return 
  } else{
    const order = new Order({
      orderItems, 
      user: req.user._id,
      shippingAddress, 
      paymentMethod, 
      itemsPrice, 
      taxPrice, 
      shippingPrice,
      totalPrice 
    })

    const createdOrder = await order.save()
    res.status(201).json(createdOrder)
  }
})

// @desc    Get order by id
// @route   GET /api/orders/:id
// @access  Private 
const getOrderById = asyncHandler(async(req, res) => {  
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  )
  if(order){
    res.json(order)
  }else{
    res.status(404)
  }
})
// @desc    update order to paid
// @route   GET /api/orders/:id/pay
// @access  Private 
const updateOrderToPaid = asyncHandler(async(req, res) => {  
  const order = await Order.findById(req.params.id)

  if(order){
    order.isPaid = true
    order.paidAt = Date.now()
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.email_address
    }

  const updateOrder = await order.save()

  res.json(updateOrder)
  }else{
    res.status(404)
  }
})

// @desc    get logged in user's order
// @route   GET /api/orders/myOrders
// @access  Private 
const getMyOrders = asyncHandler(async(req, res) => {  
  const orders = await Order.find({ user: req.user._id})
  res.status(200).json(orders)
})

// @desc    get all orders
// @route   GET /api/orders/
// @access  Private/Admin 
const getOrders = asyncHandler(async(req, res) => {  
  const orders = await Order.find({}).populate('user', 'id name')
  res.status(200).json(orders)
})

export { addOrderItems, getOrderById, updateOrderToPaid, getMyOrders, getOrders}