import { types } from "../types/types"
const FILTER_BY_VALUE = "FILTER_BY_VALUE";
export const productStockList = (state = { productStocks: [], appliedFilters: [] }, action) => {

	switch (action.type) {

		case types.productStockSetData:
			return {
				...state,
				productStocks: [...action.payload]
			}

		case types.productStockAddNew:
			return {
				...state,
				productStocks: [action.payload, ...state.productStocks]
			}

		case types.productStockDeleted:
			return {
				...state,
				productStocks: state.productStocks.filter(e => e.id !== action.payload)
			}

		case types.productStockUpdated:
			return {
				...state,
				productStocks: state.productStocks.map((e) => (e.id === action.payload.id) ? action.payload : e)
			}

		// // Filters
		// case types.productStockFilterByValue:
		// 	//clone the state
		// 	let newState = Object.assign({}, state);
		// 	//the value received from our presentational component
		// 	let value = action.payload;
		// 	let filteredValues = state.productStocks.filter(product => {
		// 		//look for objects with the received value in their ‘code’ field
		// 		return product.product_detail.code.toLowerCase().includes(value) || product.product_detail.name.toLowerCase().includes(value)
		// 	});

		// 	let appliedFilters = state.appliedFilters;
		// 	//if the value from the input box is not empty
		// 	if (value) {
		// 		appliedFilters = addFilterIfNotExists(types.productStockFilterByValue, appliedFilters);

		// 		newState.filteredProducts = filteredValues;
		// 	} else {
		// 		appliedFilters = removeFilter(types.productStockFilterByValue, appliedFilters);

		// 		if (appliedFilters.length === 0) {
		// 			newState.filteredProducts = newState.productStocks;
		// 		}
		// 	}
		// 	return newState;


		case types.productStockClearData:
			return { productStocks: [] }


		default:
			return state

	}
}

export const productStockActive = (state = { productStock: null, loading: true }, action) => {

	switch (action.type) {

		case types.productStockSetActive:
			return {
				...state,
				loading: false,
				productStock: action.payload
			}

		case types.productStockClearActive:
			return { productStock: null, loading: true }


		default:
			return state

	}
}

function addFilterIfNotExists(filter, appliedFilters) {
	let index = appliedFilters.indexOf(filter);
	if (index === -1) appliedFilters.push(filter);

	return appliedFilters;
}

function removeFilter(filter, appliedFilters) {
	let index = appliedFilters.indexOf(filter);
	appliedFilters.splice(index, 1);
	return appliedFilters;
}
