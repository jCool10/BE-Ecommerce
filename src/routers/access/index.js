const express = require('express')
const accessController = require('../../controllers/access.controller.js')

const { authentication } = require('../../auth/auth.js')
const { asyncHandler } = require('../../helpers/asyncHandler')
const router = express.Router()

router.post('/shop/signup', asyncHandler(accessController.signup))
router.post('/shop/login', asyncHandler(accessController.login))

// Authentication
router.use(authentication)

router.post('/shop/logout', asyncHandler(accessController.logout))
router.post(
  '/shop/handlerRefreshToken',
  asyncHandler(accessController.handlerRefreshToken)
)

module.exports = router
