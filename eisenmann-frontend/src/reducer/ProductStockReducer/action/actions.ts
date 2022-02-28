import { ProductEntry } from "@/interfaces/ProductEntry"
import { ProductStockDetail } from "@/interfaces/ProductStock"

export type ProductStockAction =
	| { type: 'loaded', payload: ProductStockDetail }
	| { type: 'addEntry', payload: ProductEntry }
	| { type: 'removeEntry', payload: number }
	| { type: 'updateSummaryValues' }

export const setLoadedProductStock = (value: ProductStockDetail): ProductStockAction => ({
	type: 'loaded',
	payload: value
})

export const addProductEntryAction = (value: ProductEntry): ProductStockAction => ({
	type: 'addEntry',
	payload: value
})

export const removeProductEntryAction = (value: number): ProductStockAction => ({
	type: 'removeEntry',
	payload: value
})

export const updateSummaryValuesAction = (): ProductStockAction => ({
	type: 'updateSummaryValues',
})