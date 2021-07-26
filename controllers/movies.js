import { Movie } from '../models/movie.js'
import axios from 'axios'

export {
    search,
    show
}

function show(req,res){
  axios.get(`http://www.omdbapi.com/?i=${req.params.id}&plot=full&apikey=${process.env.API_KEY}`)
  .then(response =>{
    console.log(response.data)
    res.render("movies/show", {
      title: `${response.data.Title} Details`,
      apiResult: response.data
    })
  })
}

function search(req, res) {
    axios.get(`http://www.omdbapi.com/?s=${req.body.search}&apikey=${process.env.API_KEY}`)
    .then((response) => {
      console.log(response.data.Search)
      //res.redirect("/")
      res.render("movies/new", {
        title: `Search Results for ${req.body.search}`,
        results: response.data.Search,
        user: req.user ? req.user : null
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect('/')
    })
  }