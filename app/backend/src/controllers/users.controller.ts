import * as bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import UsersService from '../services/users.service';
import loginValidations from '../utils/loginValidations';
import { generateToken } from '../utils/jwtUtils';

class UsersController {
  constructor(
    private usersService: UsersService,
  ) { }

  async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const invalidLogin = res.status(401).json({ message: 'Invalid email or password' });

    const validations = loginValidations(email, password);
    if (validations) {
      return res.status(validations.status).json({ message: validations.message });
    }

    const login = await this.usersService.login(email);
    if (!login) {
      return invalidLogin;
    }

    const passwordBcrypt = bcrypt.compareSync(password, login.password);
    if (!passwordBcrypt) {
      return invalidLogin;
    }

    const jwtPayload = { email: login.email, role: login.role };
    const token = generateToken(jwtPayload);

    return res.status(200).json({ token });
  }
}

export default UsersController;
