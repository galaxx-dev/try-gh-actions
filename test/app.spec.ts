import request from 'supertest'
import app from '../src/app'

describe('GET: /health', () => {
  const endpoint = '/health'

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

  it('echo "Hello World!"', done => {
    request(app)
      .get(endpoint)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body).toMatchObject({ message: `Hello World!` })
        done()
      })
  })
})
