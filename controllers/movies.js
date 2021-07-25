import { Movie } from '../models/movie.js'
import axios from 'axios'

export {
    search
}

function search(req, res) {
    axios
    //get(`https://api.rawg.io/api/games?page_size=10&search=${req.body.search}&key=${process.env.API_KEY}`)
    .get(`http://www.omdbapi.com/?t=${req.body.search}&apikey=${process.env.API_KEY}`)
    .then((response) => {
      console.log(response.data)
      //res.redirect("/")
      res.render("movies/new", {
        title: "Search Results",
        results: response.data,
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect('/')
    })
  }