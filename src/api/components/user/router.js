import express from 'express'
import { registerController, login, uploadIPFSFile, getDocument } from './userController.js'
import { verifyToken } from '../../middleware/authCheck.js'
import multer from 'multer'

const userRouter = express.Router()
const upload = multer()
//const { isAuthenticated } = require('../common/middlewares/authCheck');

//router.get('/login', login);
userRouter.post('/register', registerController)
userRouter.post('/login', login)
userRouter.post('/uploadFile', verifyToken, upload.single('file'), uploadIPFSFile)
userRouter.get('/getDocument', verifyToken, getDocument)

export default userRouter
