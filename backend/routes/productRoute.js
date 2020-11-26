import express from 'express'
const router = express.Router()
import { getAllProducts, 
  getProductById,
  deleteProductById
} from '../controllers/productController.js'
import { admin, protect } from '../middleware/authMiddleware.js'


router.route('/').get(getAllProducts)
 
router
  .route('/:id')
  .get(getProductById )
  .delete(protect, admin, deleteProductById)

export default router