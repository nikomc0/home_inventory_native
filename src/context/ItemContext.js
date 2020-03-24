import createDataContext from './createDataContext';
import hi from '../api/hi';

const itemReducer = (state, action) => {
	switch (action.type) {
		case 'get_items':
			const data = action.payload;
			var complete = [];
			var incomplete = [];

			data.items.filter(item => {
				if (item.complete) {
					complete.push(item);
				} else {
					incomplete.push(item);
				}
			})

			data.complete = complete;
			data.incomplete = incomplete;

			return data;
		case 'mark_complete':
			if (state.completed) {
				return [...state.completed, action.payload];
			} else {
				return state.completed = action.payload;
			}
		default:
			return state;
	}
}

const getItems = dispatch => {
	return async () => {
		try {
			const response = await hi.get('/items');
			dispatch({ type: 'get_items', payload: response.data })

			
		} catch (error) {
			console.log(error);
		}
	};
}

const addItem = dispatch => {
	return async (item, store) => {
		try {
			if (item && store){		
				const response = await hi.post('/items', {
					item: item,
					store: store
				});
			}
		} catch (error) {
			console.log(error)
		}
	}
}

const deleteData = dispatch => {
	async (item) => {
		try {
			const response = await hi.delete(`/items/${item.id}`);
		} catch (error){
			// setErrorMessage('Failed to Delete Item')
		}
	}
}

const editItem = dispatch => {
	return async (item) => {
		try {
			const response = await hi.put(`/items/${item.id}`, { item });
		} catch (error) {
			console.log("Unable to edit item.");
		}
	}
}

export const { Context, Provider } = createDataContext(
	itemReducer, 
	{getItems, addItem, editItem}, 
	[]
);
