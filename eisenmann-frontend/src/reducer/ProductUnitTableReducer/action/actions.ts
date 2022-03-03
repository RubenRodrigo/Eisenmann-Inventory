import { ProductUnit } from "@/interfaces/ProductUnit"

export type ProductUnitAction =
	| { type: 'loaded', payload: ProductUnit[] }
	| { type: 'loadingProductUnit', payload: boolean }
	| { type: 'addProductUnit', payload: ProductUnit }
	| { type: 'removeProductUnit', payload: number }
	| { type: 'updateProductUnit', payload: ProductUnit }

export const setLoadingStateAction = (value: boolean): ProductUnitAction => ({
	type: 'loadingProductUnit',
	payload: value
})

export const setLoadedProductUnitAction = (value: ProductUnit[]): ProductUnitAction => ({
	type: 'loaded',
	payload: value
})

export const addProductUnitAction = (value: ProductUnit): ProductUnitAction => ({
	type: 'addProductUnit',
	payload: value
})

export const updateProductUnitAction = (value: ProductUnit): ProductUnitAction => ({
	type: 'updateProductUnit',
	payload: value
})

export const removeProductUnitAction = (value: number): ProductUnitAction => ({
	type: 'removeProductUnit',
	payload: value
})


