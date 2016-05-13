import Movie from '../models/movie'
// import MovieGenre from '../models/movieGenre'

function fetchMovies (
  req, res,
  {
    query = {},
    sort = [['imdb.rank', 1], ['imdb.score', -1]],
    limit = 20
  }
) {
  return Movie.find(query)
           .limit(limit)
           .sort(sort)
           .populate({ path: 'genres', select: { name: 1 } })
           .exec()
           .then((movies) => {
             let genresObj = {}
             movies.forEach((movie) => {
               movie.genres.forEach((genre) => {
                 genresObj[genre.name] = genre.name
               })
             })
             let genres = []
             for (let i in genresObj) {
               genres.push(i)
             }
             res.json({ movies, genres })
           })
           .catch((err) => {
             return res.status(500).send(err)
           })
}

export function getMovies (req, res) {
  if (req.query) {
    let per_page = req.query.per_page
    let query = {}
    if (req.query.q) {
      let _q = req.query.q.split(',')
      _q[0] = parseInt(_q[0], 10)
      _q[1] = parseFloat(_q[1])
      query = {
        'imdb.rank': {$gt: _q[0]},
        $and: [
          {
            'imdb.score': {$lte: _q[1]}
          }
        ]
      }
    }
    fetchMovies(req, res, {
      query,
      limit: per_page
    })
  } else {
    fetchMovies(req, res)
  }
}
