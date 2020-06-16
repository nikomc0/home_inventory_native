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
					if (item) {
						item.location = location;
						if (item.complete) {
							complete.push(item);
						} else {
							incomplete.push(item);
						}
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

		case 'edit_item':
			// debugger;
			return state;

		case 'set_local':
			return action.payload;

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
		
		debugger;

		var index = state.stores.findIndex(value => value.id === store.id);

		state.stores[index].items = data;

		dispatch({ type: 'set_local', payload: state})
	}
	// return async (data, store) => {
		// try { 
		// 	var list = JSON.parse(await AsyncStorage.getItem('list'));
		// 	var currentStoreIndex = null;

		// 	if (list){
		// 		var currentStore = list.stores.find(function(store, index){
		// 			if (store.name === store.name){
		// 				currentStoreIndex = index;
		// 				return store;
		// 			}
		// 		});

		// 		list.stores[currentStoreIndex].items = data;
		// 		await AsyncStorage.setItem('list', JSON.stringify(list));
		// 	}

		// } catch (error) {

		// }
	// }
}

const getCurrentList = async () => {
	return JSON.parse(await AsyncStorage.getItem('list'));
} 

const getCurrentServerDiff = (currentList, serverList) => {
		console.log({currentList, serverList});
		debugger;	
		// If they are different find out how.
		if (!_.isEqual(currentList.stores, serverList.stores)) {
			/*
			* Compare two objects by reducing an array of keys in obj1, having the
			* keys in obj2 as the intial value of the result.
			*/
			function getObjectDiff(obj1, obj2) {
			    const diff = Object.keys(obj1).reduce((result, key, value) => {
			        if (!obj2.hasOwnProperty(key)) {
			            result.push(key);
			        } else if (_.isEqual(obj1[key], obj2[key])) {
			            const resultKeyIndex = result.indexOf(key);
			            result.splice(resultKeyIndex, 1);
			        }
			        return result;
			    }, Object.keys(obj2));
			    return diff;
			}

			const diff = getObjectDiff(currentList.stores, serverList.stores).map((i) => parseInt(i));
			// Find the changes.					
			diff.forEach((index) => {
				var currentListItems = currentList.stores[index].items;
				var serverItems = serverList.stores[index].items;
				
				// Is the server response missing items that the current list has?
				if (currentListItems.length > serverItems.length) {
					var itemToRemove = _.differenceWith(currentListItems, serverItems, _.isEqual);
					
					itemToRemove.map((item) => {
						var itemIndex = _.findIndex(currentListItems, item);
						currentListItems[itemIndex] = null;
					});

					currentList.stores[index].items = currentListItems.filter((obj) => obj);
				} else if (currentListItems.length < serverItems.length ) { // Is currentList missing items that the server has? Then you add items to the currentList.
					currentList.stores[index].items = _.merge(currentListItems, serverItems);
				} 
			});
		}

		// console.log(currentList);

		// // // Load the changes into Local Storage.
		// await AsyncStorage.setItem('list', JSON.stringify(currentList));

		return currentList;
}

const compareLists = (currentList, serverList) => {
	console.log({ currentList, serverList });
	serverList.stores.map((store) => {
		store.items.map((item) => {
			console.log({store, item});
		})
	})
}

const getItems = dispatch => {
	return async () => {
		try {
			// Get Token
			var token = await AsyncStorage.getItem('token');

			// Get Server List.
			const response = await hi.get('/items', {headers: {"Authorization": `Bearer ${token}`}});
			dispatch({ type: 'get_items', payload: response.data });
			// // Get Current List from storage.
			// var currentList = await getCurrentList();
			
			// if (currentList) {
			// 	await AsyncStorage.setItem('list', JSON.stringify(response.data));
			// 	dispatch({ type: 'get_items', payload: response.data });
			// } 
				// else if (currentList && response.data) {
				// var comparedList = compareLists(currentList, response.data);
				// // Load the changes into Local Storage.
				// await AsyncStorage.setItem('list', JSON.stringify(comparedList));
				// // Load the changes into State.
				// dispatch({ type: 'get_items', payload: comparedList });
				// }
			// else {
			// 	dispatch({ type: 'get_items', payload: currentList})
			// }

		} catch (error) {
			console.log(error);
			Sentry.captureException(error.response);
		}
	};
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
	[]
);
