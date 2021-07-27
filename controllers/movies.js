import { Movie } from '../models/movie.js'
import axios from 'axios'

export {
    search,
    show,
    addToLikes,
    removeFromLikes
}

function addToLikes(req,res){
  req.body.collectedBy=req.user.profile._id
  //req.body.likes=req.user.profile._id
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
      Movie.create(req.body)
      .then(()=>{
        res.redirect(`/profiles/${req.user.profile._id}`)
      })
    }
  })
  .catch(err =>{
    console.log(err)
    res.redirect('/')
  })
}

function removeFromLikes(req,res){
  Movie.findOne({ rawmId: req.params.id })
  .then(movie => {
    // Remove the user's profile id from collectedBy
    movie.collectedBy.remove({_id: req.user.profile._id})
    movie.save()
    .then(() => {
      res.redirect(`/profiles/${req.user.profile._id}`)
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}


function show(req,res){
  axios.get(`http://www.omdbapi.com/?i=${req.params.id}&plot=full&apikey=${process.env.API_KEY}`)
  .then(response =>{
    Movie.findOne({rawmId: response.data.imdbID})
    .populate('collectedBy')
    // .populate({
    //   path:'reviews',
    //   populate:{
    //     path:'author'
    //   }
    // })
    .then(movie =>{
      console.log(movie)
      res.render("movies/show", {
      title: `${response.data.Title} Details`,
      apiResult: response.data,
      movie
      })
    })
  })
  .catch(err =>{
    console.log(err)
    res.redirect('/')
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