const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../app');

describe('Playstore App', () => {
  it('should GET /apps and check if array', () => {
    return supertest(app)
      .get('/apps')
      .expect(200)
      .expect('Content-Type', /json/)
      .then( res => {
        expect(res.body).to.be.an('array');
      })
  });
  it ('should sort by sort specified', () => {
    return supertest(app)
    .get('/apps')
    .query( { sort: "Rating"})
    .then( res => {
     let sorted = true;
     let i = 0;
      // iterate once less than the length of the array
      //  comparing 2 items in the array at a time
      while (i < res.body.length - 1) {
        const appCompareFirst= res.body[i];
        const appCompareSecond = res.body[i + 1];
        if (appCompareFirst.rating < appCompareSecond.rating) { 
          sorted = false;
          break; // exit the loop
        }
        i++;
      }
      expect(sorted).to.be.true;
    })
  })

  it ('should filter by genres', () => {
    return supertest(app)
    .get('/apps')
    .query( { genres: "Puzzle"})
    .then( res => {
      let filtered = true;
      let i=0;
      while (i < res.body.length) {
      if (res.body[i].Genres !== "Puzzle") {
        filtered = false;
        break;
      }
      i++;
    }
    expect(filtered).to.be.true;
  })
  })
});