import axios from 'axios';

export default axios.create({
	baseURL: "http://home-inventory-api.herokuapp.com/api/v1",
	// baseURL: "https://0cf85911.ngrok.io/api/v1",
	headers: {
		// Authorization: 'Bearer [API_KEY]'
	}
});


