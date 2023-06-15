import { Request, Response, NextFunction } from 'express';
import { tokenValidation } from '../utils/jwtUtils';

const roleMiddleware = (req: Request, res: Response, next: NextFunction): Response | void => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }

  const token = tokenValidation(authorization);

  if (!token) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }

  next();
};

export default roleMiddleware;
