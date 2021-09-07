import { PlusIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { clientClearActive, clientClearData, clientSetData, clientStartCreate } from '../../actions/client';
import { uiCloseClientModal, uiOpenClientModal } from '../../actions/ui';
import { ClientModalForm } from '../../components/Client/Form/ClientModalForm';
import { TableClient } from '../../components/Client/Table/TableClient';
import { fetchSinToken } from '../../helpers/fetch';

export async function getServerSideProps() {
	const resp = await fetchSinToken(`client`);
	const initialState = await resp.json();

	return {
		props: { initialState }
	}

}

const Client = ({ initialState }) => {
	const dispatch = useDispatch()

	// Set data in the store
	useEffect(() => {
		dispatch(clientSetData(initialState))
		return () => {
			dispatch(clientClearData())
		}
	}, [dispatch, initialState])

	return (
		<>
			<Navigation />
			<div>
				<TableClient />
			</div>
		</>
	)
}

const Navigation = () => {
	const dispatch = useDispatch()

	const handleOpenModal = () => {
		dispatch(clientClearActive())
		dispatch(uiOpenClientModal())
	}

	return (
		<div className="flex justify-between">
			<ClientModalForm />
			<div>
				<h1 className="text-3xl	font-semibold">Lista de Clientes</h1>
			</div>
			<div>
				<button
					onClick={handleOpenModal}
					className="bg-blue-800 px-3 py-2 rounded-lg block hover:bg-blue-900 transition duration-300"
				>
					<div className="flex text-white ">
						<PlusIcon className="h-5 w-5 self-center" />
						<span className="pl-2 font-semibold">Nuevo Cliente</span>
					</div>
				</button>
			</div>
		</div >
	)
}
export default Client
