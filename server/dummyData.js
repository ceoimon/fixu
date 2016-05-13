import Movie from './models/movie'
import MovieGenre from './models/movieGenre'
import top250Data from './initData/top250Data.json'
import best2015 from './initData/best2015.json'
import cuid from 'cuid'

const data = Array.concat(top250Data, best2015)

const GENRES = [
  'Action',
  'Adventure',
  'Animation',
  'Biography',
  'Comedy',
  'Crime',
  'Documentary',
  'Drama',
  'Family',
  'Fantasy',
  'Film-Noir',
  'History',
  'Horror',
  'Music',
  'Musical',
  'Mystery',
  'Romance',
  'Sci-Fi',
  'Sport',
  'Thriller',
  'War',
  'Western'
]
const GENRESID = {}

export default () => {
  MovieGenre.count().exec()
    .then((count) => {
      if (count > 0) {
        throw new Error('break')
      }
      return Promise.all(GENRES.map(genre => {
        const _genre = new MovieGenre({
          name: genre,
          movies: []
        })
        return _genre.save()
      }))
    })
    .then((genres) => {
      genres.forEach((genre, index) => {
        GENRESID[GENRES[index]] = genre._id
      })
      Movie.count().exec()
    })
    .then((count) => {
      if (count > 0) {
        throw new Error('break')
      }
      data.forEach(movie => {
        const _movie = new Movie({
          title: movie.title,
          cnTitle: movie.cnTitle,
          director: movie.director,
          imdb: {
            id: movie.imdbId,
            url: `http://www.imdb.com/title/${movie.imdbId}`,
            score: movie.imdbScore ? parseFloat(movie.imdbScore) : 0,
            rank: movie.imdbRank[0] ? parseInt(movie.imdbRank[0], 10) : 999
          },
          genres: [],
          duration: movie.duration,
          year: movie.year,
          stars: movie.stars,
          doubanScore: movie.doubanScore ? parseFloat(movie.doubanScore) : 0,
          tomatoes: movie.tomatoes,
          trailer: movie.trailer,
          cuid: cuid()
        })
        movie.genre.forEach((genre) => {
          const genreID = GENRESID[genre]
          if (genreID) {
            _movie.genres.push(genreID)
          }
        })
        _movie.save()
          .then((movie) => {
            return Promise.all(movie.genres.map((genre) => {
              return MovieGenre.findByIdAndUpdate(genre, { '$set': { 'meta.updateAt': Date.now() }, '$pushAll': { movies: [movie._id] }, '$inc': { __v: 1 } }).exec()
            }))
          })
      })
    })
    .catch((err) => {
      if (err.message === 'break') {
        console.log(`Having initial data already.`)
        return
      }
      console.log(`Something went wrong: ${err}`)
    })
}
