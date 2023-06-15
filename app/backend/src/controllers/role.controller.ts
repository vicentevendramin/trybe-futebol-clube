import { Request, Response } from 'express';
import { tokenValidation } from '../utils/jwtUtils';

class RoleController {
  static async loginAuth(req: Request, res: Response): Promise<object | void> {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }

    const token = tokenValidation(authorization);
    return res.status(200).json({ role: JSON.parse(JSON.stringify(token)).role });
  }
}

export default RoleController;
