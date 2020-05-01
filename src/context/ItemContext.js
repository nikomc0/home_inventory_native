import { AsyncStorage } from 'react-native';
import createDataContext from './createDataContext';
import hi from '../api/hi';

const itemReducer = (state, action) => {
	switch (action.type) {
		case 'get_items':
			state = action.payload;

			var complete = [];
			var incomplete = [];
			var unassigned = [];
			state.storeData = [];

			state.stores.map((store)=>{
				state.storeData.push({title: store.name, data: [store]});
				store.items.map((item) => {
					if (item.complete) {
						complete.push(item);
					} else {
						incomplete.push(item);
					}
				})
			});

			state.complete = complete;
			state.incomplete = incomplete;

			if (state.unassigned && state.unassigned.length > 0) {
				state.unassigned.map((item)=>{unassigned.push(item)})
			} else {
				state.unassigned = unassigned;
			}

			return state;
			
		case 'new_item':
			action.payload.id = (state.unassigned.length + 1).toString();
			state.unassigned = [...state.unassigned, action.payload];
			state = {...state};
			return state;

		default:
			return state;
	}
}

const getItems = dispatch => {
	return async () => {
		try {
			var token = await AsyncStorage.getItem('token');
			const response = await hi.get('/items', {headers: {"Authorization": `Bearer ${token}`}});
			dispatch({ type: 'get_items', payload: response.data })
		} catch (error) {
			console.log(error);
		}
	};
}

const addItem = dispatch => {
	return async (item, store, callback) => {
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

const deleteItem = dispatch => {
	return async (item) => {
		var itemID = item._id.$oid.toString();
		const response = await hi.delete(`/items/${itemID}`);
	}
}

const editItem = dispatch => {
	return async (item) => {
		try {
			var itemID = item._id.$oid.toString();
			const response = await hi.put(`/items/${itemID}`, { item });
		} catch (error) {
			console.log("Unable to edit item.");
		}
	}
}

const newItem = dispatch => {
	return () => {
		dispatch({ 
			type: 'new_item', 
			payload: {
				_id: {
					$oid: '',
				},
				name: 'New Item',
				qty: '1',
				store_info: {
					id: '1',
				 	name:'Unassigned'
				}, 
				complete: false
			}
		});
	}
}

export const { Context, Provider } = createDataContext(
	itemReducer, 
	{getItems, addItem, editItem, newItem, deleteItem}, 
	[]
);
