import { Router } from 'express'
import { checkSchema } from 'express-validator'
import { validateSchema } from '../helpers/validateSchema'
import notYetImplemented from '../controllers/NotYetImplementedController'
import UsersController from '../controllers/UsersController'
import { storeUsersSchema } from '../validation/schema/storeUsersSchema'

const usersRouter = Router()

usersRouter
  .route('/')
  .get(UsersController.index) // get all
  .post(checkSchema(storeUsersSchema), validateSchema, UsersController.store) // create new one

usersRouter
  .route('/:id')
  .get(UsersController.show) // get one
  .post(notYetImplemented)
  // .patch(UsersController.update) // update one
  // .delete(UsersController.destroy) // delete one

export { usersRouter }
