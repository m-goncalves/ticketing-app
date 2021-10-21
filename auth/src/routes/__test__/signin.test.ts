import request from 'supertest';
import { app } from '../../app';

it('Returns a 400 with missing password and email!', async () => {
  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com'
    })
    .expect(400);
  
    await request(app)
    .post('/api/users/signin')
    .send({
      password: 'password'
    })
    .expect(400);
});

it('Returns a 400 with an invalid email', async () => {
  return request(app)
    .post('/api/users/signin')
    .send({
      email: 'testtest.com',
      password: 'password'
    })
    .expect(400);
});

it('Fails when a email that does not exist is supplied!', async () => {
  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(400);
})

it('Fails when an incorrect password is supplied!', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(201);

  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'passwd'
    })
    .expect(400);
});

it('Responds with a cookie when given valid credentials!', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(201);

  const response = await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(200);

  expect(response.get('Set-Cookie')).toBeDefined();
});