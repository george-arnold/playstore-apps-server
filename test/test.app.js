const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../app');

describe('Playstore App', () => {
  it('should GET /apps', () => {
    return supertest(app)
      .get('/apps')
      .expect(200);
  });
});