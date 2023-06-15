import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import * as bcrypt from 'bcryptjs';
import { app } from '../app';
import UsersModel from '../database/models/UsersModel';
import {
  loginWithoutPassword,
  loginWithInvalidPassword,
  loginWithoutEmail,
  loginWithInvalidEmail,
  userMock,
} from './mocks/login.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('POST no endpoint /login', function () {
  it('Deve retornar status 200 e um token', async function () {
    sinon.stub(UsersModel, 'findOne').resolves(userMock as UsersModel);
    sinon.stub(bcrypt, 'compareSync').resolves(userMock.password);

    const response = await chai.request(app)
      .post('/login').send({
        email: userMock.email,
        password: userMock.password,
      });
    
    expect(response.status).to.be.eq(200);
    expect(response.body).not.to.be.empty;
  });

  it('Deve retornar um erro se o email não estiver preenchido', async function () {
    const response = await chai.request(app)
      .post('/login').send(loginWithoutEmail);
    
    expect(response.status).to.be.eq(400);
    expect(response.body).to.have.property('message', 'All fields must be filled');
  });

  it('Deve retornar um erro se o email for inválido', async function () {
    const response = await chai.request(app)
      .post('/login').send(loginWithInvalidEmail);
    
    expect(response.status).to.be.eq(401);
    expect(response.body).to.have.property('message', 'Invalid email or password');
  });

  it('Deve retornar um erro se o password não estiver preenchido', async function () {
    const response = await chai.request(app)
      .post('/login').send(loginWithoutPassword);
    
    expect(response.status).to.be.eq(400);
    expect(response.body).to.have.property('message', 'All fields must be filled');
  });

  it('Deve retornar um erro se o password for inválido', async function () {
    const response = await chai.request(app)
      .post('/login').send(loginWithInvalidPassword);
    
    expect(response.status).to.be.eq(401);
    expect(response.body).to.have.property('message', 'Invalid email or password');
  });
});
