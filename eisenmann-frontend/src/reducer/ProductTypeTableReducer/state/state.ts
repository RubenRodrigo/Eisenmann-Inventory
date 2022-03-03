import { ProductTypeAction } from "../action/actions";
import { ProductTypeTableState } from "../interfaces/interfaces";

export const productTypeTableReducer = (state: ProductTypeTableState, action: ProductTypeAction): ProductTypeTableState => {
	switch (action.type) {
		case 'loaded':
			return {
				...state,
				productType: action.payload,
			}
		case 'loadingProductType':
			return {
				...state,
				isLoading: action.payload
			}
		case 'addProductType':
			return {
				...state,
				productType: [...state.productType, action.payload]
			}
		case 'updateProductType':
			return {
				...state,
				productType: state.productType.map(e => (e.id === action.payload.id) ? action.payload : e)
			}
		case 'removeProductType':
			return {
				...state,
				productType: state.productType.filter(e => e.id !== action.payload)
			}

		default:
			return state;
	}
}
