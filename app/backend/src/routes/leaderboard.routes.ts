import { Router, Request, Response } from 'express';
import MatchesModel from '../database/models/MatchesModel';
import LeaderboardService from '../services/leaderboard.service';
import LeaderboardController from '../controllers/leaderboard.controller';

const router = Router();

const leaderboardService = new LeaderboardService(MatchesModel);
const leaderboardController = new LeaderboardController(leaderboardService);

router.get('/home', (req: Request, res: Response) => leaderboardController.getHomePage(req, res));

export default router;
