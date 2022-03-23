import { ServiceContext } from '@/context/ServiceContext'
import { useLayout } from '@/hooks/useLayout'
import { ServiceDetail } from '@/interfaces/Service'
import { ServiceProduct } from '@/interfaces/ServiceProduct'
import { addServiceProductAction, removeServiceProductAction, setLoadedService, updateServiceSummaryValuesAction } from '@/reducer/ServiceReducer/action/actions'
import { serviceReducer } from '@/reducer/ServiceReducer/state/serviceReducer'
import axios from 'axios'
import { getSession } from 'next-auth/react'
import React, { useReducer } from 'react'
import { deleteServiceProduct } from 'src/services/service-product'


const { Provider } = ServiceContext

interface Props {
	children: JSX.Element | JSX.Element[]
	INITIAL_STATE: ServiceDetail
}
export const ServiceProvider = ({ children, INITIAL_STATE }: Props) => {


	const { handleOpenToast, handleToastInfo } = useLayout()
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

	const removeServiceProduct = async (id: number) => {
		try {
			const session = await getSession()
			if (session) {
				const res = await deleteServiceProduct({ token: session.accessToken, id })
				if (res.status === 204) {
					handleToastInfo({
						code: res.status,
						message: 'El producto se elimino correctamente.'
					})
					dispatch(removeServiceProductAction(id))
					updateSummaryValues()
				}
			}
		} catch (err) {
			if (axios.isAxiosError(err)) {
				handleToastInfo({
					code: err.response ? err.response.status : 500,
					message: 'Hubo un error'
				})
			}
			console.log(err);
		} finally {
			handleOpenToast()
		}
	}

	return (
		<Provider value={{
			serviceState,
			loadService,
			addServiceProduct,
			updateSummaryValues,
			removeServiceProduct
		}}>
			{children}
		</Provider>
	)
}
