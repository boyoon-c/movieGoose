//import { Movie, MovieReview } from '../models/movie.js'
import { Movie } from '../models/movie.js'
import { MovieReview } from '../models/movieReview.js'

export{ 
    create,
    update,
    deleteReview as delete
 }

function update(req,res){
    console.log("reqdotbody",req.body)
    console.log("reqdotparam", req.params)
    // find the prifle id
    // find the movie id
    // then remove the review written by that profile id under that movie id
    Movie.findByIdAndUpdate(req.params.id, req.body.content, {new:true})
    .then((movie)=>{
        res.redirect(`/movies/${movie.imdbID}`)
    })
    .catch((err)=>{
        console.log(err)
        res.redirect("/")
    })
}

function deleteReview(req,res){
    //console.log("req.params", req.params)
    MovieReview.findByIdAndDelete(req.params.id)
    .then(()=>{
        res.redirect('/')
    })
}

// function create(req,res){

// }

function create(req,res){
    //console.log("req.body", req.body)
    //console.log("req.param.id", req.params.id)
    //console.log("req.user.profile", req.user)
    req.body.author=req.user.profile.name
    req.body.authorId=req.user.profile._id
    //console.log("req.body", req.body)
    //req.body.movie = req.params._id
    MovieReview.create(req.body)
    .then((review)=>{
        Movie.findById(req.params.id)
        .then((movie) =>{
            //console.log(review)
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