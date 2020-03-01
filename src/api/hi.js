import axios from 'axios';

export default axios.create({
	baseURL: "http://home-inventory-api.herokuapp.com/api/v1",
	// baseURL: "https://f22c5794.ngrok.io/api/v1",
	headers: {
		// Authorization: 'Bearer [API_KEY]'
	}
});


