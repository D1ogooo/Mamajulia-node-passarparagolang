import express from 'express'
const router = express.Router()
import { UsersControllers } from '../controllers/UserController'
import { pratosControllers } from '../controllers/PratosController'

import { authMiddleware } from '../middlewares/authMiddleware'
import { authorizationMiddleware } from '../middlewares/authorizationMiddleware'

const userController = new UsersControllers();
const pratosController = new pratosControllers()

// Authenticação
router.post('/auth/signin', userController.signIn.bind(userController));
router.post('/auth/signup', userController.signUp.bind(userController));

// Pratos
router.post('/pratos/create', [authMiddleware, authorizationMiddleware], pratosController.create)
// router.post('/pratos/create', [authMiddleware, ], pratosController.create)
// router.post('/pratos/read', [authMiddleware, authorizationMiddleware], pratosController.read)
// router.put('/pratos/update', [authMiddleware, authorizationMiddleware], pratosController.update)
// router.delete('/pratos/delete', [authMiddleware, authorizationMiddleware], pratosController.delete)

// Pedidos
// router.post('/pedido/create', [authMiddleware, authorizationMiddleware], pratosController.create)

export { router }