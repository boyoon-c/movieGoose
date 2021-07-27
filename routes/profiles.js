import { Router } from 'express'
import * as profilesCtrl from '../controllers/profiles.js'
import { Profile } from '../models/profile.js'

export{
    router
}

const router = Router()

router.get('/', isLoggedIn, profilesCtrl.index)
router.get('/:id', isLoggedIn, profilesCtrl.show)
router.delete('/:id', isLoggedIn, profilesCtrl.delete)

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/auth/google");
  }