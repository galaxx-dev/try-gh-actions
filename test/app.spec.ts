import request from 'supertest'
// import { Express } from 'express-serve-static-core'
import server from '../src/app'

describe('GET: /health', () => {
  // beforeAll(() => {
  //   server = app
  // })

  it('return 200 + "Hello World!"', done => {
    request(server)
      .get('/health')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body).toMatchObject({ message: `Hello World!` })
        done()
      })
  })
})
