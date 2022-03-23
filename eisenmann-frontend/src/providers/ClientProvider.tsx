import { ClientContext } from '@/context/ClientContext'
import { Client, ClientBase } from '@/interfaces/Client'
import { clientReducer } from '@/reducer/ClientReducer/state/clientReducer'
import { addClientAction, removeClientAction, setLoadedClientAction, updateClientAction } from "@/reducer/ClientReducer/action/actions"
import React, { useReducer } from 'react'
import { getSession } from 'next-auth/react'
import { useLayout } from '@/hooks/useLayout'
import { createClientService, deleteClientService, updateClientService } from 'src/services/client'
import axios from 'axios'

const { Provider } = ClientContext

interface Props {
	children: JSX.Element | JSX.Element[];
	INITIAL_STATE: Client[]
}
export const ClientProvider = ({ children, INITIAL_STATE }: Props) => {

	const { handleOpenToast, handleToastInfo } = useLayout()
	const [clientState, dispatch] = useReducer(clientReducer, {
		clients: INITIAL_STATE,
	})

	const setLoadedClients = (value: Client[]) => {
		dispatch(setLoadedClientAction(value))
	}
	const addClient = async (value: ClientBase) => {
		try {
			const session = await getSession()
			if (session) {
				const res = await createClientService({ token: session.accessToken, client: value })
				if (res.status === 201) {
					handleToastInfo({
						code: res.status,
						message: 'El cliente se creo correctamente.'
					})
					dispatch(addClientAction(res.data))
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
	const updateClient = async (value: ClientBase, id: number) => {
		try {
			const session = await getSession()
			if (session) {
				const res = await updateClientService({ token: session.accessToken, id: id, client: value })
				if (res.status === 200) {
					handleToastInfo({
						code: res.status,
						message: 'El cliente se actualizo correctamente.'
					})
					dispatch(updateClientAction(res.data))
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
	const removeClient = async (value: number) => {
		try {
			const session = await getSession()
			if (session) {
				const res = await deleteClientService({ token: session.accessToken, id: value })
				if (res.status === 204) {
					handleToastInfo({
						code: res.status,
						message: 'El cliente se elimino correctamente.'
					})
					dispatch(removeClientAction(value))
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
			clientState,
			setLoadedClients,
			addClient,
			updateClient,
			removeClient,
		}}>
			{children}
		</Provider>
	)
}