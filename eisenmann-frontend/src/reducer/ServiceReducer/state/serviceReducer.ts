import { ServiceProduct } from "@/interfaces/ServiceProduct"
import { ServiceAction } from "../action/actions"
import { ServiceState } from "../interfaces/interfaces"

export const serviceReducer = (state: ServiceState, action: ServiceAction): ServiceState => {
	const { service } = state

	switch (action.type) {
		case 'loaded':
			return {
				...state,
				service: action.payload,
			}
		case 'addServiceProduct':
			return {
				...state,
				service: {
					...service,
					service_product: [
						action.payload,
						...service.service_product
					]
				}
			}
		case 'updateSummaryValues':
			const summary = service.service_product.reduce((total, current) => sumTotalValues(total, current), {
				final_price: 0,
			})
			return {
				...state,
				service: {
					...service,
					...summary,
				}
			}
		default:
			return state;
	}
}

interface SummaryValues {
	final_price: number,
}
function sumTotalValues(total: SummaryValues, current: ServiceProduct) {
	return {
		final_price: total.final_price + current.total_cost,
	}
}


