import express from 'express'
const router = express.Router()
import { getAllProducts, 
  getProductById,
  deleteProductById,
  updateProduct,
  createProduct
} from '../controllers/productController.js'
import { admin, protect } from '../middleware/authMiddleware.js'


router.route('/').get(getAllProducts).post(protect, createProduct)
 
router
  .route('/:id')
  .get(getProductById )
  .delete(protect, admin, deleteProductById)
  .put(protect, admin, updateProduct)

export default router