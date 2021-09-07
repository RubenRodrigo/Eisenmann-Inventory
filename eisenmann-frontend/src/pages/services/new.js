import React, { useEffect } from 'react'
import Error from 'next/error'
import { useRouter } from 'next/dist/client/router'
import { useDispatch } from 'react-redux'

import { ArrowLeftIcon } from '@heroicons/react/outline'

import { ServiceForm } from '../../components/Service/serviceForm/ServiceForm'
import { serviceStartCreate } from '../../actions/service'
import { clientClearData, clientSetData } from '../../actions/client'
import { fetchSinToken } from '../../helpers/fetch'

const Navigation = ({ router }) => {

	return (
		<div className="flex justify-between">
			<div>
				<h1 className="text-3xl	font-semibold">Añadir un nuevo Servicio</h1>
			</div>
			<div>
				<button
					onClick={() => router.push('/services')}
					className="border rounded-lg block border-blue-800 hover:bg-gray-100 transition duration-300 px-3 py-2"
				>
					<div className="flex text-blue-800  ">
						<ArrowLeftIcon className="h-5 w-5 self-center" />
						<span className="pl-2 font-semibold">Cancelar</span>
					</div>
				</button>
			</div>
		</div>
	)
}

export async function getServerSideProps() {
	// TODO: Verify if this service exist

	try {
		const resp = await fetchSinToken('client');
		const errorCode = resp.ok ? false : resp.statusCode
		const clients = await resp.json();
		return {
			props: { errorCode: errorCode, clients: clients }
		}
	} catch (e) {
		console.log(e);
		return {
			props: { errorCode: 500, clients: [] }
		}
	}

}
const NewService = ({ errorCode, clients }) => {

	const dispatch = useDispatch()
	const router = useRouter()

	useEffect(() => {
		dispatch(clientSetData(clients))
		return () => {
			dispatch(clientClearData())
		}
	}, [dispatch, clients])

	const initialValues = {
		name: 'Nombre',
		client: '0',
		code: '0',
		estimated_price: '0',
		observations: '',
		state: false,
	}

	const handleSubmitForm = (data) => {
		console.log(data)
		dispatch(serviceStartCreate(data, router));
	}

	if (errorCode) {
		return <Error statusCode={errorCode} />
	}

	return (
		<>
			<Navigation router={router} />
			<div className="mt-4 border border-gray-300 rounded-lg py-4 px-6">
				<ServiceForm
					handleSubmitForm={handleSubmitForm}
					initialValues={initialValues}
				/>
			</div >
		</>
	)
}

export default NewService
