const { registerUser, loginUser } = require('../controllers/userControllers')

const userRouter = require('express').Router()


userRouter.route('/register').post(registerUser)
userRouter.route('/login').post(loginUser)


module.exports = userRouter