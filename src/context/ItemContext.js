import { Sentry } from 'sentry-expo';
import { AsyncStorage } from 'react-native';
import createDataContext from './createDataContext';
import hi from '../api/hi';
import _ from 'lodash';

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
				store.items.map((item, location) => {
					if (item.location === null) {
						item.location = location;
					}

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
			state ={...state, unassigned: action.payload};
			action.payload.id = (state.unassigned.length + 1).toString();
			state = {...state};
			return state;

		case 'edit_item':
			// debugger;
			return state;

		case 'set_local':
			return action.payload;

		case 'complete_items':
			return {...state, complete: action.payload};

		case 'incomplete_items':
			return {...state, incomplete: action.payload};

		case 'store_data':
			return {...state, storeData: action.payload};

		default:
			return state;
	}
}

const getLocalItems = dispatch => {
	return async () => {
		try {
			// Get items from local storage for faster load times.
			await AsyncStorage.getItem('list');
		} catch (error) {
			console.log(error)
		}
	}
}

const setLocalItems = dispatch => {
	return (state, store, data) => {
		var state = {...state};

		var index = state.stores.findIndex(value => value.id === store.id);

		state.stores[index].items = data;

		dispatch({ type: 'set_local', payload: state})
	}
}

const getItems = dispatch => {
	return async () => {
		try {
			// Get Token
			var token = await AsyncStorage.getItem('token');

			// Get Server List.
			const response = await hi.get('/items', {headers: {"Authorization": `Bearer ${token}`}});
			debugger;
			dataFlow(dispatch, response.data);
			// dispatch({ type: 'get_items', payload: response.data });

		} catch (error) {
			console.log(error);
			Sentry.captureException(error.response);
		}
	};
}

const dataFlow= (dispatch, data) => {
	const complete   = [];
	const incomplete = [];
	const storeData  = [];

	data.stores.map((store)=>{
		// Create the Store Data object for the SectionList on Homescreen.
		storeData.push({title: store.name, data: [store]});

		store.items.map((item, location) => {
			if (item.location === null) {
				item.location = location;
			}

			if (item.complete) {
				complete.push(item);
			} else {
				incomplete.push(item);
			}
		});
	});

	(function completeItems(){
		dispatch({ type: 'complete_items', payload: complete });
	})();

	(function incompleteItems(){
		dispatch({ type: 'incomplete_items', payload: incomplete });
	})();

	(function setStoreData(){
		dispatch({ type: 'store_data', payload: storeData });
	})();
}

const markComplete = dispatch => {
	return (data) => {
		debugger;
		dispatch({ type: 'complete_items', payload: data });
	}
}

const markIncomplete = dispatch => {
	return () => {
		dispatch({ type: 'incomplete_items', payload: incomplete });
	}
}

const setStoreData = dispatch => {
	return () => {
		dispatch({ type: 'store_data', payload: storeData });
	}
}

const addItem = dispatch => {
	return async (item, store, qty) => {
		try {
			if (item && store && qty){		
				const response = await hi.post('/items', {
					item: item,
					store: store,
					qty: qty
				});
			}
		} catch (error) {
			console.log(error)
			Sentry.captureException(error.response)
		}
	}
}

const deleteItem = dispatch => {
	return async (item) => {
		try {
			var itemID = item._id.$oid.toString();
			const response = await hi.delete(`/items/${itemID}`);
		} catch (error) {
			console.log(error.response.data);
			Sentry.captureException(error.response);
		}
	}
}

const editItem = dispatch => {
	return async (item) => {
		try {
			var itemID = item._id.$oid.toString();
			const response = await hi.put(`/items/${itemID}`, { item });
			dispatch({ type: 'edit_item', payload: item });
		} catch (error) {
			console.log("Unable to edit item.");
			Sentry.captureException(error);
		}
	}
}

const newItem = dispatch => {
	return () => {
		const newItem = {
			_id: { $oid: 0 },
			name: 'New Item',
			qty: 1,
			store_id: { $oid: 0},
			store_info: { id: '1', name:'Unassigned' }, 
			complete: false
		}

		dispatch({ type: 'new_item', payload: newItem });
	}
}

export const { Context, Provider } = createDataContext(
	itemReducer, 
	{getItems, addItem, editItem, newItem, deleteItem, getLocalItems, setLocalItems}, 
	{}
);
