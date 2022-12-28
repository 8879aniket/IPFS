import jwt from 'jsonwebtoken'
import {} from './requestHandlers.js'
import config from '../config/config.js'

const appURI = '/api/v1'
const appSecret = config.jwtSecret
// module.exports.isAuthenticated = async function isAuthenticated(req, res, next) {
// 	const url = req.url.replace(appURI, '').split('?')[0]
// 	let token
// 	if (skipUrls.indexOf(url) !== -1) return next()
// 	if (req.headers.authorization !== undefined) {
// 		token = req.headers.authorization.split(' ')[1]
// 	}
// 	try {
// 		const user = await jwt.verify(token, appSecret)
// 		req.user = await get(user._id, '_id', '+token')
// 		if (!req.user) throw 'Invalid token,No user exists'
// 		if (req.user.token !== token) {
// 			throw 'Your login session has expired'
// 		}
// 		if (user.isDeleted === true) {
// 			throw 'User is deleted'
// 		}
// 		if (user.isBlocked === true) {
// 			throw 'User is blocked'
// 		}
// 		return next()
// 	} catch (err) {
// 		return handleError({ res, err, statusCode: 401 })
// 	}
// }

export const generateJwtToken = async (user) => {
	const token = await jwt.sign({ user }, appSecret, {})
	return token
}

export function verifyToken(req, res, next) {
	try {
		const token = req.headers.authorization?.split(' ')[1]
		if (!token) {
			return handleError({
				res,
				err: 'error, Session expired...Please login.',
				statusCode: 401,
			})
		} else {
			jwt.verify(token, appSecret, (err, decoded) => {
				if (err) {
					return handleError({
						res,
						err: 'error, Session expired...Please login.',
						statusCode: 401,
					})
				}
				req.user = decoded.user
			})
			return next()
		}
	} catch (err) {
		return handleError({ res, err, statusCode: 401 })
	}
}
