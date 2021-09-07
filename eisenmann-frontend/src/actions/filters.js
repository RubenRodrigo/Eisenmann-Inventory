import { types } from "../types/types"

// PRODUCT STOCK FILTERS
export const productStockFilterByValue = (input) => ({
	type: types.productStockFilterByValue,
	payload: input
})

export const productStockFilterByCode = (input) => ({
	type: types.productStockFilterByCode,
	payload: input
})

export const productStockFilterByName = (input) => ({
	type: types.productStockFilterByName,
	payload: input
})