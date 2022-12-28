import dotenv from 'dotenv'

dotenv.config()
export default {
	apiVersionUrl: '/api/v1',
	env: process.env.NODE_ENV,
	jwtSecret: process.env.JWT_SECRET,
	jwtExpiresIn: '24h',
	db: {
		str: process.env.MONGO_URI,
		options: {
			useNewUrlParser: true,
			readPreference: 'primaryPreferred',
			useUnifiedTopology: true,
		},
	},
	pinata_api_key: process.env.PINATA_API_Key,
	pinata_api_secret: process.env.PINATA_API_Secret,
	polygonURL: process.env.POLYGON_WEBSOCKET_URL,
	contractAddress: {
		ipfs: process.env.IPFS,
	},
}
