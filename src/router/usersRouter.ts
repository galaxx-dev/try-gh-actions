import { Router } from 'express'
import notYetImplemented from '../controllers/NotYetImplementedController'
import UsersController from '../controllers/UsersController'

const usersRouter = Router()

usersRouter
  .route('/')
  .get(UsersController.index) // get all
  .post(UsersController.validate('store'), UsersController.store) // create new one

usersRouter
  .route('/:id')
  .get(UsersController.show) // get one
  .post(notYetImplemented)
  .put(UsersController.update) // update one
  .patch(UsersController.update) // update one
  .delete(UsersController.destroy) // delete one

export { usersRouter }
