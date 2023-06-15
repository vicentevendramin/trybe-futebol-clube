import { Router, Request, Response } from 'express';
import UsersModel from '../database/models/UsersModel';
import UsersService from '../services/users.service';
import UsersController from '../controllers/users.controller';
import RoleController from '../controllers/role.controller';
import roleMiddleware from '../middlewares/role.middleware';

const router = Router();

const usersService = new UsersService(UsersModel);
const usersController = new UsersController(usersService);

router.post('/', (req: Request, res: Response) => usersController.login(req, res));
router.get(
  '/role',
  roleMiddleware,
  (req: Request, res: Response) => RoleController.loginAuth(req, res),
);

export default router;
