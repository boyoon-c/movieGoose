import { Profile } from '../models/profile.js'
import { Movie } from '../models/movie.js'

export {
    index,
    show,
    deleteLikes as delete,
    edit,
    update
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
      res.render('profiles/edit', {
        title: `Editing ${profile.name}'s profile`,
        profile
      })
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
                res.render('profiles/show', {
                    title: `${profile.name}'s profile`,
                    profile,
                    userProfile,
                    movies
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