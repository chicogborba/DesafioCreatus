import { Router } from "express";
import { createUser, editUser, getUsers, login } from "../controller/userController";

const router = Router();

router.get('/users', getUsers);
router.post('/users', createUser);
router.post('/login', login);
router.put('/users/:id', editUser);

export default router;

