import { Router } from 'express'
import * as indexCtrl from '../controllers/index.js'
export {
  router
}

const router = Router()

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/google");
}

router.get('/', isLoggedIn, indexCtrl.index)
