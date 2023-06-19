import { Router, Request, Response } from 'express';
import MatchesModel from '../database/models/MatchesModel';
import MatchesService from '../services/matches.service';
import MatchesController from '../controllers/matches.controller';

const router = Router();

const matchesService = new MatchesService(MatchesModel);
const matchesController = new MatchesController(matchesService);

router.get('/', (req: Request, res: Response) => matchesController.getAllMatches(req, res));

export default router;
