import { ServiceContext } from '@/context/ServiceContext'
import { ServiceDetail } from '@/interfaces/Service'
import { ServiceProduct } from '@/interfaces/ServiceProduct'
import { addServiceProductAction, setLoadedService, updateServiceSummaryValuesAction } from '@/reducer/ServiceReducer/action/actions'
import { serviceReducer } from '@/reducer/ServiceReducer/state/serviceReducer'
import React, { useReducer } from 'react'


const { Provider } = ServiceContext

interface Props {
	children: JSX.Element | JSX.Element[]
	INITIAL_STATE: ServiceDetail
}
export const ServiceProvider = ({ children, INITIAL_STATE }: Props) => {

	const [serviceState, dispatch] = useReducer(serviceReducer, {
		service: INITIAL_STATE
	})

	const loadService = (value: ServiceDetail) => {
		dispatch(setLoadedService(value))
	}

	const addServiceProduct = (value: ServiceProduct) => {
		dispatch(addServiceProductAction(value))
	}

	const updateSummaryValues = () => {
		dispatch(updateServiceSummaryValuesAction())
	}

	return (
		<Provider value={{
			serviceState,
			loadService,
			addServiceProduct,
			updateSummaryValues,
		}}>
			{children}
		</Provider>
	)
}
