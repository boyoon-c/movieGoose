import mongoose from 'mongoose'
const Schema = mongoose.Schema;

export {
	Movie
}

const movieSchema = new Schema({
  title: String,
  rawmId: Number,
  released: Date,
  genre: String,
  director: String,
  plot: String,
  language: String,
  awards: String,
  rating: Number,
  collectedBy: [{ type: Schema.Types.ObjectId, ref: "Profile" }],
  // To be filled in later
  // reviews: [reference GameReview],
},{
  timestamps: true,
});

const Movie = mongoose.model("Movie", movieSchema);