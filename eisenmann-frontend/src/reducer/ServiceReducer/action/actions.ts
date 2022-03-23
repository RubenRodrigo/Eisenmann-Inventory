import { ServiceDetail } from "@/interfaces/Service"
import { ServiceProduct } from "@/interfaces/ServiceProduct"

export type ServiceAction =
	| { type: 'loaded', payload: ServiceDetail }
	| { type: 'addServiceProduct', payload: ServiceProduct }
	| { type: 'removeServiceProduct', payload: number }
	| { type: 'updateSummaryValues' }

export const setLoadedService = (value: ServiceDetail): ServiceAction => ({
	type: 'loaded',
	payload: value
})

export const addServiceProductAction = (value: ServiceProduct): ServiceAction => ({
	type: 'addServiceProduct',
	payload: value
})

export const updateServiceSummaryValuesAction = (): ServiceAction => ({
	type: 'updateSummaryValues',
})

export const removeServiceProductAction = (value: number): ServiceAction => ({
	type: 'removeServiceProduct',
	payload: value
})