import { Router } from 'express'
import * as moviesCtrl from '../controllers/movies.js'

export {
  router
}

const router = Router()

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/google");
}

router.post('/search', isLoggedIn, moviesCtrl.search)
router.get('/:id', moviesCtrl.show)
router.post('/:id/addToLikes', isLoggedIn, moviesCtrl.addToLikes)
router.post('/:id/addToDislikes', isLoggedIn, moviesCtrl.addToDislikes)