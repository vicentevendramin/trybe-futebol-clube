import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { teamsMock, idMock } from './mocks/teams.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('GET no endpoint /teams', () => {
  it('Retorna um array de teams', async function () {
    const response = await chai.request(app).get('/teams');

    expect(response.status).to.be.eq(200);
    expect(response.body).to.deep.eq(teamsMock);
  });

  it('Retorna um team de acordo com o ID', async function () {
    const response = await chai.request(app).get('/teams/11');

    expect(response.status).to.be.eq(200);
    expect(response.body).to.deep.eq(idMock);
  });
});
