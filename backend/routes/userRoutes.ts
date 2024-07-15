import { Router } from "express";
import { createUser, editUser, getUsers, login, deleteUser, getBadgeByUserId } from "../controller/userController";

const router = Router();

router.get('/users', getUsers);
router.get('/badge/:id', getBadgeByUserId);
router.post('/users', createUser);
router.post('/login', login);
router.put('/users/:id', editUser);
router.delete('/users/:id', deleteUser);

export default router;

