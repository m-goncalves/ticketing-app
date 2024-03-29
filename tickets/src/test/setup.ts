import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../app';
import jwt from 'jsonwebtoken';

declare global {
  var signin: () => string[];
}

let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = 'asdf';
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  mongo = new MongoMemoryServer();
  await mongo.start();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri);
});

beforeEach( async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({})
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.signin = () => {

  const payload = {
    id: 'dsfasfas',
    email: 'test@test.com'
  };

  const token = jwt.sign(payload, process.env.JWT_KEY!);

  const session = {jwt: token};

  const sessionJSON = JSON.stringify(session);

  const base64 = Buffer.from(sessionJSON).toString('base64');

  return [`express:sess:${base64}`];
 
};