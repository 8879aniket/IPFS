import Model from './model.js'

export const register = async (body) => {
	try {
		const userData = await Model.create(body)
		if (!userData) {
			return false
		}
		return userData
	} catch (err) {
		throw err
	}
}

export const getUser = async (email) => {
	try {
		const userData = await Model.findOne({ email })
		if (!userData) {
			return false
		}
		return userData
	} catch (err) {
		throw err
	}
}

export const getUserById = async (_id) => {
	try {
		const userData = await Model.findById(_id)
		if (!userData) {
			return false
		}
		return userData
	} catch (err) {
		throw err
	}
}

export const uploadFile = async (_id, file) => {
	try {
		const updatedData = await Model.findOneAndUpdate(_id, { ipfs: file })
		if (!updatedData) {
			return false
		}
		return updatedData
	} catch (err) {
		throw err
	}
}
