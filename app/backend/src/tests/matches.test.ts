import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
import * as sinon from 'sinon';

// @ts-ignore
import chaiHttp = require('chai-http');
import {
  matchesMock,
  matchesInProgress,
  matches,
  goals,
  jwtPayload,
} from './mocks/matches.mock';

import { app } from '../app';
import MatchesModel from '../database/models/MatchesModel';
import IMatches from '../Interfaces/Matches';

chai.use(chaiHttp);
const { expect } = chai;

describe('Matches endpoints', function () {
  describe('Testando a rota GET /matches', function () {
    afterEach(() => {
      sinon.restore();
    });

    it('deve retornar status 200', async function () {
      const response = await chai.request(app).get('/matches');

      expect(response.status).to.be.eq(200);
      expect(response.body).not.to.be.empty;
    });

    it('deve retornar status 200 e partidas em progresso', async function () {
      sinon.stub(MatchesModel, 'findAll').resolves(matchesInProgress as MatchesModel[]);

      const response = await chai.request(app).get('/matches').query({ inProgress: 'true' });

      expect(response.status).to.be.eq(200);
      expect(response.body).to.be.deep.eq(matchesInProgress);
    });

    it('deve retornar status 200 e partidas encerradas', async function () {
      sinon.stub(MatchesModel, 'findAll').resolves(matchesInProgress as MatchesModel[]);

      const response = await chai.request(app).get('/matches').query({ inProgress: 'false' });

      expect(response.status).to.be.eq(200);
      expect(response.body).to.be.deep.eq(matchesInProgress);
    });
  });

  describe('Testando a rota PATH /matches/:id', function () {
    afterEach(() => {
      sinon.restore();
    });

    it('deve retornar status 200 e uma mensagem', async function () {
      sinon.stub(jwt, 'verify').callsFake(() => jwtPayload);
      sinon.stub(MatchesModel, 'findOne').resolves(matches[1] as MatchesModel);
      sinon.stub(MatchesModel, 'update').resolves([1]);

      const response = await chai.request(app).patch('/matches/1').set('Authorization', 'token-valid');

      expect(response.status).to.be.eq(200);
      expect(response.body).to.be.deep.eq({ message: 'Updated' });
    });

    it('deve retornar status 400 e uma mensagem', async function () {
      sinon.stub(jwt, 'verify').callsFake(() => jwtPayload);

      const response = await chai.request(app).patch('/matches/1').set('Authorization', 'token-valid');

      expect(response.status).to.be.eq(400);
      expect(response.body).to.be.deep.eq({ message: 'All fields must be filled' });
    });
  });

  describe('Testando a rota PATH /matches/:id/finish', function () {
    afterEach(() => {
      sinon.restore();
    });

    it('deve retornar status 200 e uma mensagem', async function () {
      sinon.stub(jwt, 'verify').callsFake(() => jwtPayload);
      sinon.stub(MatchesModel, 'findOne').resolves(matches[1] as MatchesModel);
      sinon.stub(MatchesModel, 'update').resolves([1]);

      const response = await chai.request(app).patch('/matches/1/finish').set('Authorization', 'token-valid');

      expect(response.status).to.be.eq(200);
      expect(response.body).to.be.deep.eq({ message: 'Finished' });
    });

    it('deve retornar status 404 e uma mensagem', async function () {
      sinon.stub(jwt, 'verify').callsFake(() => jwtPayload);
      sinon.stub(MatchesModel, 'findOne').resolves(undefined);

      const response = await chai.request(app).patch('/matches/99/finish').set('Authorization', 'token-valid');

      expect(response.status).to.be.eq(404);
      expect(response.body).to.be.deep.eq({ message: 'Team does not exist' });
    });
  });
});
