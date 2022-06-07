import {Router} from "express";

import UserController from "../controllers/UserController";
import MessageController from "../controllers/MessageController";
import UserValidations from "../validations/UserValidations";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.post("/registration", UserValidations, UserController.createUser);
router.post("/login", UserController.login);
router.get("/isAuth", authMiddleware, UserController.isAuth);
router.get("/getUsers", UserController.getUsers);

router.get('/message/:id', MessageController.getMessages);

export default router;