import express from 'express'
import userRouter from './user/router.js'

const router = express.Router()

//router.use(verifyToken)

router.use('/users', userRouter)

export default router
