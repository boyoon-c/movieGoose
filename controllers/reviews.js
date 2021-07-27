import { Movie, MovieReview } from '../models/movie.js'
//import { MovieReview } from '../models/movieReview.js'

export{ create }

// function create(req,res){

// }

function create(req,res){
    console.log("req.body", req.body)
    console.log("req.param.id", req.params.id)
    console.log("req.user.profile", req.user)
    req.body.author=req.user.profile.name
    console.log("req.body", req.body)
    //req.body.movie = req.params._id
    MovieReview.create(req.body)
    .then((review)=>{
        Movie.findById(req.params.id)
        .then((movie) =>{
            console.log(review)
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