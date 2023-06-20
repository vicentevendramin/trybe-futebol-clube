import { Router, Request, Response } from 'express';
import MatchesModel from '../database/models/MatchesModel';
import MatchesService from '../services/matches.service';
import MatchesController from '../controllers/matches.controller';
import roleMiddleware from '../middlewares/role.middleware';

const router = Router();

const matchesService = new MatchesService(MatchesModel);
const matchesController = new MatchesController(matchesService);

router.get('/', (req: Request, res: Response) => matchesController.getAllMatches(req, res));
router.post(
  '/',
  roleMiddleware,
  (req: Request, res: Response) => matchesController.createMatch(req, res),
);
router.patch(
  '/:id/finish',
  roleMiddleware,
  (req: Request, res: Response) => matchesController.finishMatch(req, res),
);
router.patch(
  '/:id',
  roleMiddleware,
  (req: Request, res: Response) => matchesController.updateMatch(req, res),
);

export default router;
