import express from "express";
const router = express.Router();
import { UsersControllers } from "../controllers/UserController";
import { pratosControllers } from "../controllers/PratosController";

import { authMiddleware } from "../middlewares/authMiddleware";
import { authorizationMiddleware } from "../middlewares/authorizationMiddleware";
import { upload } from "../configs/cloudconfig";

const userController = new UsersControllers();
const pratosController = new pratosControllers();

// Authenticação
router.post("/auth/signin", userController.signIn.bind(userController));
router.post("/auth/signup", userController.signUp.bind(userController));

// Pratos
router.post(
	"/pratos/create",
	[authMiddleware, authorizationMiddleware],
	upload.single("image"),
	pratosController.create.bind(pratosController),
);

router.get(
	"/pratos/list",
	[authMiddleware, authorizationMiddleware],
	pratosController.list.bind(pratosController),
);

router.put(
	"/pratos/update/:id",
	[authMiddleware, authorizationMiddleware],
	upload.single("image"),
	pratosController.update,
);

router.delete(
	"/pratos/delete/:id",
	[authMiddleware, authorizationMiddleware],
	pratosController.delete,
);

// Pedidos
// router.post('/pedido/create', [authMiddleware, authorizationMiddleware], pratosController.create)

export { router };
