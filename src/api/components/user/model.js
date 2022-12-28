import mongoose from 'mongoose'
const { Schema, model } = mongoose
const { ObjectId } = Schema.Types

const userSchema = new mongoose.Schema(
	{
		email: { type: String, required: true },
		password: { type: String, required: true },
		ipfs: { type: String },
	},
	{ timestamps: true }
)
const User = model('User', userSchema)

export default User
