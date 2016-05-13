import MovieGenre from '../models/movieGenre'

export function getGenres (req, res) {
  MovieGenre.find().sort({ 'name': 1 }).exec()
    .then((genres) => res.json({ genres }))
    .catch((err) => res.status(500).send(err))
}
