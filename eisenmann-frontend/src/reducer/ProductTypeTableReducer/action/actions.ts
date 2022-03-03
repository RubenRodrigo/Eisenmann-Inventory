import { ProductType } from "@/interfaces/ProductType"

export type ProductTypeAction =
	| { type: 'loaded', payload: ProductType[] }
	| { type: 'loadingProductType', payload: boolean }
	| { type: 'addProductType', payload: ProductType }
	| { type: 'removeProductType', payload: number }
	| { type: 'updateProductType', payload: ProductType }

export const setLoadingStateAction = (value: boolean): ProductTypeAction => ({
	type: 'loadingProductType',
	payload: value
})

export const setLoadedProductTypeAction = (value: ProductType[]): ProductTypeAction => ({
	type: 'loaded',
	payload: value
})

export const addProductTypeAction = (value: ProductType): ProductTypeAction => ({
	type: 'addProductType',
	payload: value
})

export const updateProductTypeAction = (value: ProductType): ProductTypeAction => ({
	type: 'updateProductType',
	payload: value
})

export const removeProductTypeAction = (value: number): ProductTypeAction => ({
	type: 'removeProductType',
	payload: value
})


