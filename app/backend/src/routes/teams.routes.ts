import { Router, Request, Response } from 'express';
import TeamsModel from '../database/models/TeamsModel';
import TeamsController from '../controllers/teams.controller';
import TeamsService from '../services/teams.service';

const router = Router();

const teamsService = new TeamsService(TeamsModel);
const teamsController = new TeamsController(teamsService);

router.get('/', (req: Request, res: Response) => teamsController.getAllTeams(req, res));

export default router;
