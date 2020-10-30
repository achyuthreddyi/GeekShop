import express from 'express'
const router = express.Router()
import { authUser, getUserProfile } from '../controllers/usrController.js'
import { protect } from '../middleware/authMiddleware.js'

router.route('/login').post(authUser)
router.route('/profile').get(protect, getUserProfile)



export default router