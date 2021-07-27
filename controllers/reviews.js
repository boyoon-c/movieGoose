import { Movie } from '../models/movie.js'
import { MovieReview } from '../models/movieReview.js'

export{ create }

function create(req,res){
    
}

// function create(req,res){
//     req.body.author=req.user.profile._id
//     req.body.movie = req.params._id
//     MovieReview.create(req.body)
//     .then((review)=>{
//         Movie.findById(req.params.id)
//         .then((movie) =>{
//             movie.reviews.push(review._id)
//             movie.save()
//             .then(()=>{
//                 res.redirect(`/movies/${movie.rawmId}`)
//             })
//         })
//     })
// }

//find the movie by id

//sa