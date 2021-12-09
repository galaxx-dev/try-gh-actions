import { Router } from 'express'
import HealthController from '../controllers/HealthController'

const router = Router()

router.route('/').get(HealthController.get)

export { router as healthRouter }
