import express from 'express'
const router = express.Router()
import { usersControllers } from '../controllers/UserController'
import { pratosControllers } from '../controllers/PratosController'

import { authMiddleware } from '../middlewares/authMiddleware'
import { authorizationMiddleware } from '../middlewares/authorizationMiddleware'

const userController = new usersControllers()
const pratosController = new pratosControllers()

// Authenticação
router.post('/auth/signin', userController.signIn)
router.post('/auth/signup', userController.signUp)

// Pratos
// router.post('/pratos/create', [authMiddleware, authorizationMiddleware], pratosController.create)
// router.post('/pratos/read', [authMiddleware, authorizationMiddleware], pratosController.read)
// router.put('/pratos/update', [authMiddleware, authorizationMiddleware], pratosController.update)
// router.delete('/pratos/delete', [authMiddleware, authorizationMiddleware], pratosController.delete)

export { router }