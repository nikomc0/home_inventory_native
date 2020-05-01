import axios from 'axios';

export default axios.create({
	baseURL: 'https://home-inventory-api.herokuapp.com',
	headers: {
	}
});
