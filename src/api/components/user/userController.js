import bcrypt, { hash } from 'bcrypt'
import multer from 'multer'
import { create } from 'ipfs-http-client'
import Web3 from 'web3'
import Web3WsProvider from 'web3-providers-ws'
import { handleResponse, handleError } from '../../middleware/requestHandlers.js'
import { generateJwtToken } from '../../middleware/authCheck.js'
import { register, getUser, uploadFile, getUserById } from './userService.js'
import logger from '../../config/logger.js'
import pinJSONToIPFS from '../../helpers/pinata.js'
import config from '../../config/config.js'

// const web3Object = new Web3(new Web3WsProvider(config.polygonURL))
// const IPFSInstance = new web3Object.eth.Contract(IPFS.abi, config.contractAddress.ipfs)

//const client = create()
let client = create({ url: 'http://127.0.0.1:5002/api/v0' })
const upload = multer()

export const registerController = async (req, res) => {
	logger.info('Inside Registeration Controller')
	try {
		const { email, password, confirmPassword } = req.body
		if (!email || !password) {
			return handleError({ res, err: `Please enter email and password` })
		}
		if (password !== confirmPassword) {
			return handleError({ res, err: `Password doesn't match` })
		}
		const user = await getUser(email)
		if (user) {
			return handleError({ res, err: `User already exist` })
		}
		const encryptPassword = await hash(password, 10)
		const userData = await register({ email, password: encryptPassword })
		return handleResponse({
			res,
			msg: `User registered successfully, you may login`,
			data: userData,
		})
	} catch (err) {
		return handleError({ res, err })
	}
}

export const login = async (req, res) => {
	logger.info('Inside Login Controller')
	try {
		const { email, password } = req.body
		if (!email || !password) {
			return handleError({ res, err: `Please enter email and password` })
		}
		const user = await getUser(email)
		if (!user) {
			return handleError({ res, err: `User does not exist` })
		}
		const compareData = await bcrypt.compare(password, user.password)
		if (!compareData) {
			return handleError({ res, err: `Password is incorrect` })
		}
		const tokenData = await generateJwtToken(user)
		return handleResponse({
			res,
			msg: `Login successful`,
			data: tokenData,
		})
	} catch (err) {
		return handleError({ res, err })
	}
}

export const uploadIPFSFile = async (req, res) => {
	logger.info('Inside Upload File Controller')
	try {
		const { _id } = req.user
		const file = req.file
		if (!file) {
			return handleError({ res, err: `Please upload file` })
		}
		const user = await getUserById(_id)
		if (!user) {
			return handleError({ res, err: `User does not exist` })
		}
		const hash = await pinJSONToIPFS(file)
		const fileData = hash.IpfsHash
		const updatedData = await uploadFile(_id, fileData)
		if (!updatedData) {
			return handleError({ res, err: `Something went wrong` })
		}
		//await IPFSInstance.methods.setHash(fileData)
		return handleResponse({
			res,
			msg: `File uploded successfully`,
			data: updatedData,
		})
	} catch (err) {
		return handleError({ res, err })
	}
}

export const getDocument = async (req, res) => {
	logger.info('Inside get Document Controller')
	try {
		const { _id } = req.user
		const baseURL = 'https://ipfs.mypinata.cloud/ipfs'
		const user = await getUserById(_id)
		if (!user) {
			return handleError({ res, err: `User does not exist` })
		}
		if (!user.ipfs) {
			return handleError({ res, err: `No documents found` })
		}
		return handleResponse({
			res,
			msg: `File uploded successfully`,
			data: `${baseURL}/${user.ipfs}`,
		})
	} catch (err) {
		return handleError({ res, err })
	}
}
