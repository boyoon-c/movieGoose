import mongoose from 'mongoose'
const Schema = mongoose.Schema;

export {
	Movie,
}

const movieSchema = new Schema({
  title: String,
  rawmId: String,
  image: String,
  // This is for later exercise
  //likes: [{ type: Schema.Types.ObjectId, ref: "Profile" }],
  //dislikes:[{ type: Schema.Types.ObjectId, ref: "Profile" }],
  collectedBy: [{ type: Schema.Types.ObjectId, ref: "Profile" }],
  reviews: [{type: Schema.Types.ObjectId, ref: "MovieReview"}],
},{
  timestamps: true,
});

const Movie = mongoose.model("Movie", movieSchema);
