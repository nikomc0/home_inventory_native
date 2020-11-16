import axios from 'axios';

export default axios.create({
	baseURL: 'https://home-inventory-api.herokuapp.com',
	// baseURL: 'https://1456481cd96d.ngrok.io',
	headers: {
	}
});
