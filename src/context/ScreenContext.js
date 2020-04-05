import createDataContext from './createDataContext';

const screenReducer = (state, action) => {
	switch (action.type) {
		case 'refresh':
			return state.refreshing = action.payload;
		case 'wait':
			return state.refreshing = action.payload;
		default:
			return state;
	}
}

const onRefresh = dispatch => {
	return (callback) => {

		dispatch({ type: 'refresh', payload: true });
	}
};

const wait = dispatch => {
	return (timeout) => {
		dispatch({ type: 'wait', payload: false})
	}
}

// function wait(timeout) {
//   return new Promise(resolve => {
//     setTimeout(resolve, timeout);
//   });
// }

export const { Context, Provider } = createDataContext (
	screenReducer,
	{onRefresh},
	[]
);
