import { Router } from 'express'
import notYetImplemented from '../controllers/NotYetImplementedController'
import UsersController from '../controllers/UsersController'

const usersRouter = Router()

usersRouter
  .route('/')
  .get(UsersController.index)
  .post(UsersController.store)
  .put(notYetImplemented)
  .patch(notYetImplemented)
  .delete(notYetImplemented)

usersRouter
  .route('/create')
  .get(UsersController.create)
  .put(notYetImplemented)
  .patch(notYetImplemented)
  .delete(notYetImplemented)

usersRouter
  .route('/:id')
  .get(UsersController.show)
  .post(notYetImplemented)
  .put(UsersController.update)
  .patch(UsersController.update)
  .delete(UsersController.destroy)

usersRouter
  .route('/:id/edit')
  .get(UsersController.edit)
  .post(notYetImplemented)
  .put(notYetImplemented)
  .patch(notYetImplemented)
  .delete(notYetImplemented)

export { usersRouter }
