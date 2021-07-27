import { Movie, MovieReview } from '../models/movie.js'
//import { MovieReview } from '../models/movieReview.js'

export{ create }

// function create(req,res){

// }

function create(req,res){
    console.log("req.body", req.body)
    console.log("req.param.id", req.params.id)
    req.body.author=req.user.profile._id
    console.log("req.body.author", req.body.author)
    //req.body.movie = req.params._id
    MovieReview.create(req.body)
    .then((review)=>{
        Movie.findById(req.params.id)
        .then((movie) =>{
            movie.reviews.push(review)
            movie.save()
            .then(()=>{
                res.redirect(`/movies/${movie.rawmId}`)
            })
        })
    })
}

//find the movie by id

//sa