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
}

function deleteReview(req,res){
    
    MovieReview.findByIdAndDelete(req.params.id)
    .then((review)=>{
        res.redirect(`/movies/${review.movie}`)
    })
}


function create(req,res){
    req.body.author=req.user.profile.name
    req.body.authorId=req.user.profile._id
    req.body.movie = req.params.id
    console.log("req.body", req.body)
    MovieReview.create(req.body)
    .then((review)=>{
        Movie.findOne({rawmId: req.params.id })
        .then((movie) =>{
            movie.reviews.push(review)
            movie.save()
            .then(()=>{
                res.redirect(`/movies/${movie.rawmId}`)
            })
        })
    })
}

