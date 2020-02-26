import { useEffect, useState } from 'react';
import hi from '../api/hi';

export default () => {
	const [refreshing, setRefreshing] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	// function wait(timeout) {
	//   return new Promise(resolve => {
	//     setTimeout(resolve, timeout);
	//   });
	// }

	const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    searchAPI();
    wait(2000).then(() => setRefreshing(false));
  }, [refreshing]);

	const searchAPI = async () => {
		console.log("Loaded");
		try {
			const response = await hi.get('/items', {
				// Not yet built in the HI API.
				// params: {

				// }
			});
			setItems(response.data);
		} catch (error) {
			setErrorMessage('Something went wrong')
		}
	};

	useEffect(() => {
		searchAPI();
	}, []);

	return [searchAPI, errorMessage, refreshing, onRefresh]
};
