import mongoose from 'mongoose'
const Schema = mongoose.Schema

export {
    MovieReview
}

const movieReviewSchema = new Schema({
    rating: {type: Number, min: 1, max: 10},
    like: {type: Boolean},
    content: String,
    movie: {type: Schema.Types.ObjectId, ref: "Movie"},
    author: {type: Schema.Types.ObjectId, ref: "Profile"},
    reply: {type: Schema.Types.ObjectId, ref: "Profile"}
},{
    timestamps: true
})

const MovieReview = mongoose.model("MovieReview", movieReviewSchema)