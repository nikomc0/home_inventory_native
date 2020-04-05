import axios from 'axios';

export default axios.create({
	baseURL: "https://home-inventory-api.herokuapp.com/api/v1",
	// baseURL: "https://0881967b.ngrok.io/api/v1",
	headers: {
		// Authorization: 'Bearer [API_KEY]'
	}
});


