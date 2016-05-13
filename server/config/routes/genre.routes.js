import { Router } from 'express'
import * as GenreController from '../../controllers/genre.controller'
const router = new Router()

router.route('/Genres').get(GenreController.getGenres)

export default router
