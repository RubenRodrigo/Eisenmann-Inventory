import { ProductUnitAction } from "../action/actions";
import { ProductUnitTableState } from "../interfaces/interfaces";

export const productUnitTableReducer = (state: ProductUnitTableState, action: ProductUnitAction): ProductUnitTableState => {
	switch (action.type) {
		case 'loaded':
			return {
				...state,
				productUnit: action.payload,
			}
		case 'loadingProductUnit':
			return {
				...state,
				isLoading: action.payload
			}
		case 'addProductUnit':
			return {
				...state,
				productUnit: [...state.productUnit, action.payload]
			}
		case 'updateProductUnit':
			return {
				...state,
				productUnit: state.productUnit.map(e => (e.id === action.payload.id) ? action.payload : e)
			}
		case 'removeProductUnit':
			return {
				...state,
				productUnit: state.productUnit.filter(e => e.id !== action.payload)
			}

		default:
			return state;
	}
}
