import { Router } from 'express'
import * as MovieController from '../../controllers/movie.controller'
const router = new Router()

router.route('/Movies').get(MovieController.getMovies)

export default router
