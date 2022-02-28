import { ProductEntry } from "@/interfaces/ProductEntry";
import { ProductStockAction } from "../action/actions";
import { ProductStockState } from "../interfaces/interfaces";

export const productStockReducer = (state: ProductStockState, action: ProductStockAction): ProductStockState => {
	const { productStock } = state
	const { product_entry } = productStock

	switch (action.type) {
		case 'loaded':
			return {
				...state,
				productStock: action.payload,
			}
		case 'addEntry':
			return {
				...state,
				productStock:
				{
					...productStock,
					product_entry: [
						action.payload,
						...product_entry,
					]
				},
			}
		case 'removeEntry':
			return {
				...state,
				productStock:
				{
					...productStock,
					product_entry: product_entry.filter(e => e.id !== action.payload)
				},
			}
		case 'updateSummaryValues':
			const summary = product_entry.reduce((total, current) => sumTotalValues(total, current), {
				total_stock: 0,
				total_price: 0,
			})
			return {
				...state,
				productStock: {
					...productStock,
					...summary,
					difference_stock: summary.total_stock - productStock.real_stock,
					current_price: product_entry[0] ? product_entry[0].unit_price : 0
				}
			}


		default:
			return state;
	}
}


interface SummaryValues {
	total_stock: number,
	total_price: number,
}
function sumTotalValues(total: SummaryValues, current: ProductEntry) {
	return {
		total_stock: total.total_stock + current.init_stock,
		total_price: total.total_price + parseInt(current.total_cost),
	}
}

