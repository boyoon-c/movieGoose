import { Router } from 'express'
import * as moviesCtrl from '../controllers/movies.js'

export {
  router
}

const router = Router()

function isLoggedIn(req, res, next) {
  console.log(req.user)
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/google");
}

router.post('/search', isLoggedIn, moviesCtrl.search)