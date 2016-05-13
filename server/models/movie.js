import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const MovieSchema = new Schema({
  title: { type: String, required: true },
  cnTitle: [String],
  director: { type: [String], required: true },
  imdb: {
    id: {
      type: String,
      unique: true
    },
    url: String,
    score: Number,
    rank: Number
  },
  genres: [{
    type: ObjectId,
    ref: 'MovieGenre'
  }],
  duration: String,
  year: { type: String, required: true },
  stars: [String],
  doubanScore: Number,
  tomatoes: [String],
  cuid: { type: String, required: true },
  trailer: [String],
  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  }
})

MovieSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  } else {
    this.meta.updateAt = Date.now()
  }

  next()
})

export default mongoose.model('Movie', MovieSchema)
