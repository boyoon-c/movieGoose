import { Movie } from '../models/movie.js'
import axios from 'axios'

export {
    search
}

function search(req, res) {
    axios.get(`http://www.omdbapi.com/?t=${req.body.search}&apikey=${process.env.API_KEY}`)
    .then((response) => {
      //console.log(response.data)
      //res.redirect("/")
      res.render("movies/new", {
        title: "Search Results",
        results: response.data,
        user: req.user ? req.user : null
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect('/')
    })
  }