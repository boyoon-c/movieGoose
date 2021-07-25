import { Profile } from '../models/profile.js'
import { Movie } from '../models/movie.js'

export {
    index
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