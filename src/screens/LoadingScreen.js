import React, { useEffect, useContext } from 'react';
import { Context as AuthContext } from '../context/AuthContext';

const LoadingScreen = () => {
	const {getToken} = useContext(AuthContext);

	useEffect(() => {
		getToken();
	}, []);
	return null;
}

export default LoadingScreen;
