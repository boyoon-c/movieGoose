//import { Movie, MovieReview } from '../models/movie.js'
import { Movie } from '../models/movie.js'
import { MovieReview } from '../models/movieReview.js'

export{ 
    create,
    update,
    deleteReview as delete
 }

function update(req,res){
    console.log("reqdotbody", req.body)
    console.log("reqdotparam", req.params)
    // find the prifle id
    // find the movie id
    // then remove the review written by that profile id under that movie id
    MovieReview.findOne({_id:req.params.id})
    .then((review)=>{
        review.content=req.body.content
        review.rating=req.body.rating
        console.log(review)
        review.save()
        .then(()=>{
            res.redirect(`/movies/${review.movie}`)
        })
    })

    // MovieReview.findByIdAndUpdate(req.params.id, req.body.content, {new:true})
    // .then(()=>{
    //     res.redirect('/')
    //     res.redirect(`/movies/${movie.imdbID}`)
    //})
    // .catch((err)=>{
    //     console.log(err)
    //     res.redirect("/")
    // })
}

function deleteReview(req,res){
    //console.log("reqdotbody", req.body)
    //console.log("reqdotparam", req.params)
    //MovieReview.findByIdAndDelete(req.params.id)
    
    MovieReview.findByIdAndDelete(req.params.id)
    .then((review)=>{
        //console.log("this is the review to be deleted",review)
        res.redirect(`/movies/${review.movie}`)
    })
}


function create(req,res){
    //console.log("req.body", req.body)
    //console.log("req.param.id", req.params.id)
    //console.log("req.user.profile", req.user)
    req.body.author=req.user.profile.name
    req.body.authorId=req.user.profile._id
    req.body.movie = req.params.id
    console.log("req.body", req.body)
    MovieReview.create(req.body)
    .then((review)=>{
        //Movie.findById(req.params.id)
        Movie.findOne({rawmId: req.params.id })
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