import request from 'supertest'
import app from '../../server'
import { ResStructure } from '../../src/helpers/apiHelper'

describe('GET: /api/users', () => {
  const endpoint = '/api/users'

  it('return 200', done => {
    request(app).get(endpoint).expect(200, done)
  })

  it('responds with json', done => {
    request(app)
      .get(endpoint)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done)
  })

  it('responds with object', done => {
    request(app)
      .get(endpoint)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body).toContain<ResStructure>({
          statusCode: 200,
          statusMessage: 'Users fetched success.',
        })
        done()
      })
  })
})
