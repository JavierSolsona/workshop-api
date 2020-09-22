const request = require('supertest');
const app = require('../../app');
const { BAD_REQUEST,
  NAME_LENGTH,
  RUT_LENGTH,
  EMAIL_LENGTH,
  EMAIL_FORMAT } = require('../../constants/errors');
const EMAIL = 'test@test.com';
const NAME = 'name';
const RUT = 'rut';

describe('Client Endpoints', () => {
  it('should create a new client', async () => {
    const res = await request(app)
      .post('/api/clients')
      .send('name='+NAME)
      .send('rut='+RUT)
      .send('email='+EMAIL);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('email', EMAIL);
    expect(res.body).toHaveProperty('rut', RUT);
    expect(res.body).toHaveProperty('name', NAME);
  });
  
  it('should get name error', async () => {
    let error = [{
      location: "body",
      msg: NAME_LENGTH,
      param: "name"
    }];
    const res = await request(app)
      .post('/api/clients')
      .send('rut='+RUT)
      .send('email='+EMAIL);
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('message', BAD_REQUEST);
    expect(res.body).toHaveProperty('errors', error);
  });
  
  it('should get rut error', async () => {
    let error = [{
      location: "body",
      msg: RUT_LENGTH,
      param: "rut"
    }];
    const res = await request(app)
      .post('/api/clients')
      .send('name='+NAME)
      .send('email='+EMAIL);
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('message', BAD_REQUEST);
    expect(res.body).toHaveProperty('errors', error);
  });
  
  it('should get email error', async () => {
    let error = [{
      location: "body",
      msg: EMAIL_LENGTH,
      param: "email"
    },
    {
      location: "body",
      msg: EMAIL_FORMAT,
      param: "email"
    }];
    const res = await request(app)
      .post('/api/clients')
      .send('name='+NAME)
      .send('rut='+RUT);
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('message', BAD_REQUEST);
    expect(res.body).toHaveProperty('errors', error);
  });
  
  it('should get email format error', async () => {
    let error = [{
      location: "body",
      msg: EMAIL_FORMAT,
      param: "email",
      value: "test"
    }];
    const res = await request(app)
      .post('/api/clients')
      .send('name='+NAME)
      .send('rut='+RUT)
      .send('email=test');
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('message', BAD_REQUEST);
    expect(res.body).toHaveProperty('errors', error);
  });
  
  it('should get clients', async () => {
    let clients = {
      name: NAME,
      rut: RUT,
      email: EMAIL
    };
    const res = await request(app)
      .get('/api/clients');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining(clients)
      ])
    );
  });
});

