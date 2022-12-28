import axios from 'axios'
import config from '../config/config.js'

const pinJSONToIPFS = async (data) => {
	const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`
	try {
		const response = await axios.post(
			url,
			{
				...data,
			},
			{
				headers: {
					pinata_api_key: config.pinata_api_key,
					pinata_secret_api_key: config.pinata_api_secret,
				},
			}
		)
		return response.data
	} catch (error) {
		console.log(error)
	}
}
export default pinJSONToIPFS
