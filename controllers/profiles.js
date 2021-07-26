import { Profile } from '../models/profile.js'
import { Movie } from '../models/movie.js'

export {
    index,
    show
}

function show(req,res){
    Profile.findById(req.params.id)
    .then(profile =>{
        Profile.findById(req.user.profile)
        .then(userProfile =>{
            res.render("profile/show", {
                title: `${profile.name}'s profile`,
                profile,
                userProfile
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