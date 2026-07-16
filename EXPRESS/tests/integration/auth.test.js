import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongod;
let app;

beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  process.env.MONGO_URI = mongod.getUri();
  process.env.JWT_SECRET = 'test_secret_key';
  process.env.NODE_ENV = 'test';
  process.env.CLIENT_URL = 'http://localhost:3000';

  app = require('../../server'); // server.js calls connectDB() using the env vars set above
  await new Promise((resolve) => setTimeout(resolve, 500)); // let the connection settle
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongod.stop();
});

describe('Auth flow', () => {
  const user = { name: 'Test User', email: 'test@example.com', password: 'password123' };
  let token;

  it('registers a new user', async () => {
    const res = await request(app).post('/api/auth/register').send(user);
    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.user.email).toBe(user.email);
    expect(res.body.data.token).toBeDefined();
  });

  it('rejects a duplicate email', async () => {
    const res = await request(app).post('/api/auth/register').send(user);
    expect(res.status).toBe(409);
    expect(res.body.success).toBe(false);
  });

  it('rejects login with the wrong password', async () => {
    const res = await request(app).post('/api/auth/login').send({ email: user.email, password: 'wrongpass' });
    expect(res.status).toBe(401);
  });

  it('logs in with correct credentials', async () => {
    const res = await request(app).post('/api/auth/login').send({ email: user.email, password: user.password });
    expect(res.status).toBe(200);
    token = res.body.data.token;
    expect(token).toBeDefined();
  });

  it('rejects /me without a token', async () => {
    const res = await request(app).get('/api/auth/me');
    expect(res.status).toBe(401);
  });

  it('returns the current user with a valid token', async () => {
    const res = await request(app).get('/api/auth/me').set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.data.user.email).toBe(user.email);
  });
});
