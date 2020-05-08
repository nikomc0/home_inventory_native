import axios from 'axios';

export default axios.create({
	baseURL: 'https://home-inventory-api.herokuapp.com',
	// baseURL: 'https://8c9089ab.ngrok.io',
	headers: {
	}
});
