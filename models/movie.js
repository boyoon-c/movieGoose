import mongoose from 'mongoose'
const Schema = mongoose.Schema;

export {
	Movie,
  MovieReview
}
const movieReviewSchema = new Schema({
  rating: {type: Number, min: 1, max: 10},
  like: {type: Boolean},
  content: String,
  //movie: {type: Schema.Types.ObjectId, ref: "Movie"},
  //authorId: {type: Schema.Types.ObjectId, ref: "Profile"},
  authorId: String,
  author: String,
  //reply: {type: Schema.Types.ObjectId, ref: "Profile"}
},{
  timestamps: true
})

const movieSchema = new Schema({
  title: String,
  rawmId: String,
  image: String,
  //released: Date,
  // genre: String,
  // director: String,
  // plot: String,
  // language: String,
  // awards: String,
  // rating: Number,
  likes: [{ type: Schema.Types.ObjectId, ref: "Profile" }],
  dislikes:[{ type: Schema.Types.ObjectId, ref: "Profile" }],
  collectedBy: [{ type: Schema.Types.ObjectId, ref: "Profile" }],
  //reviews: [{type: Schema.Types.ObjectId, ref: "MovieReview"}],
  reviews: [movieReviewSchema]
},{
  timestamps: true,
});

const Movie = mongoose.model("Movie", movieSchema);
const MovieReview=mongoose.model("MovieReview", movieReviewSchema)