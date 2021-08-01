import { Profile } from '../models/profile.js'
import { Movie } from '../models/movie.js'
import { MovieReview } from '../models/movieReview.js'

export {
    index,
    show,
    addToLikes,
    deleteLikes as delete,
    edit,
    update
}

function addToLikes(req,res){
  console.log("reqdotbody", req.body)
  console.log(req.params.id)

  req.body.collectedBy=req.user.profile._id
  Movie.findOne({rawmId: req.params.id})
  .then((movie)=>{
    if (movie){
      if (!movie.collectedBy.includes(req.user.profile._id)){
      movie.collectedBy.push(req.user.profile._id)
      } 
      movie.save()
      .then(()=>{
        res.redirect(`/profiles/${req.user.profile._id}`)
      }) 
    } else {
      
        res.redirect(`/profiles/${req.user.profile._id}`)
      
    }
  })
  .catch(err =>{
    console.log(err)
    res.redirect('/')
  })
}


function update(req, res) {
    Profile.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then((profile) => {
      res.redirect(`/profiles/${profile._id}`)
    })
    .catch((err) => {
      console.log(err)
      res.redirect('/')
    })
  }

function edit(req, res) {
    Profile.findById(req.params.id)
    .then(profile => {
      if (req.user.profile._id.toString()=== profile._id.toString()){
      res.render('profiles/edit', {
        title: `Editing ${profile.name}'s profile`,
        profile
      })
    } else {
      res.redirect(`/profile/${profile._id}`)
    }
    })
    .catch(err => {
      console.log(err)
      res.redirect('/')
    })
  }

function deleteLikes(req, res){
    Movie.findOne({rawmId: req.body.title})
    .then(movie=>{
        movie.collectedBy.remove({_id: req.params.id})
        movie.save()
        .then(()=>{
            res.redirect(`/profiles/${req.params.id}`)
        })
    })
    .catch(err => {
      console.log(err)
      res.redirect('/')
    }) 
}

function show(req,res){
    Profile.findById(req.params.id)
    .then(profile =>{
        Movie.find({collectedBy: profile._id })
        .then((movies)=>{
            Profile.findById(req.user.profile)        
            .then(userProfile =>{
              MovieReview.find({authorId: req.params.id})
              .then(reviews =>{
                console.log(reviews)
                res.render('profiles/show', {
                    title: `${profile.name}'s profile`,
                    profile,
                    userProfile,
                    movies,
                    reviews
                })
              })
            })
        })
    })
    .catch(err =>{
        console.log(err)
        res.redirect("/")
    })
}

function index(req, res) {
    Profile.find({})
    .then(profiles => {
      res.render('profiles/index', {
        title: "Movie Goose Profiles",
        profiles,
      })
    })
  }