import express from 'express'
const router = express.Router()
import { authUser, getUserProfile, registerUser, updateUserProfile} from '../controllers/usrController.js'
import { protect } from '../middleware/authMiddleware.js'

router.route('/login').post(authUser)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)
router.route('/').post(registerUser)

export default router