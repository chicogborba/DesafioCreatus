import { Router } from "express";
import { 
  createUser, 
  editUser, 
  getUsers, 
  login, 
  deleteUser, 
  getBadgeByUserId,
  getUserById 
} from "../controller/userController";

const router = Router();

router.get('/users', getUsers);
router.get('/user/:id', getUserById);
router.get('/badge/:id', getBadgeByUserId);
router.post('/users', createUser);
router.post('/login', login);
router.put('/users/:id', editUser);
router.delete('/users/:id', deleteUser);

export default router;

