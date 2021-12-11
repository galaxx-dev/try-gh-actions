import { Router } from 'express'
import { checkSchema } from 'express-validator'
import notYetImplemented from '../controllers/NotYetImplementedController'
import UsersController from '../controllers/UsersController'
import { validateSchema } from '../helpers/validateSchema'
import { storeUserSchema } from '../validation/schema/storeUsersSchema'

const usersRouter = Router()

usersRouter
  .route('/')
  .get(UsersController.index) // get all
  .post(checkSchema(storeUserSchema), validateSchema, UsersController.store) // create new one

usersRouter
  .route('/:id')
  .get(UsersController.show) // get one
  .post(notYetImplemented)
  // .patch(UsersController.update) // update one
  // .delete(UsersController.destroy) // delete one

export { usersRouter }
