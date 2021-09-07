import React, { useEffect } from 'react'
import { useRouter } from 'next/dist/client/router'
import { useDispatch } from 'react-redux'

import { ArrowLeftIcon } from '@heroicons/react/outline'
import { serviceAddNew, serviceClearActive, serviceSetActive, serviceStartUpdate } from '../../../actions/service'
import { useSelector } from 'react-redux'
import { ServiceForm } from '../../../components/Service/serviceForm/ServiceForm'
import { fetchSinToken } from '../../../helpers/fetch'
import { clientClearData, clientSetData } from '../../../actions/client'
import Error from 'next/error'

export async function getServerSideProps(context) {
	try {
		const { pid } = context.params

		const serviceFetch = await fetchSinToken(`service/${pid}`);
		const errorCode = serviceFetch.ok ? false : res.statusCode
		const client = await fetchSinToken('client');

		const serviceData = await serviceFetch.json();
		const clients = await client.json();

		return {
			props: { errorCode: errorCode, serviceData: serviceData, clients: clients }
		}

	} catch (e) {
		console.log(e);
		return {
			props: { errorCode: 500, serviceData: {}, clients: [] }
		}
	}

}

const ServiceEdit = ({ errorCode, serviceData, clients }) => {

	const dispatch = useDispatch()
	const router = useRouter()

	useEffect(() => {
		dispatch(serviceSetActive(serviceData))
		dispatch(clientSetData(clients))
		return () => {
			dispatch(serviceClearActive())
			dispatch(clientClearData())
		}
	}, [dispatch, serviceData, clients])

	const { service, loading } = useSelector(state => state.serviceActive)
	const initialValues = {
		id: service.id,
		name: service.name,
		client: service.client,
		code: service.code,
		estimated_price: service.estimated_price,
		observations: service.observations,
		state: service.state,
	}

	const handleSubmitForm = (data) => {
		data.id = service.id
		dispatch(serviceStartUpdate(data, router));
	}

	if (errorCode) {
		return <Error statusCode={errorCode} />
	}

	return (
		<>
			<Navigation router={router} />
			<div className="mt-4 border border-gray-300 rounded-lg py-4 px-6">
				{
					(!loading) &&
					<ServiceForm
						handleSubmitForm={handleSubmitForm}
						initialValues={initialValues}
					/>
				}
			</div >
		</>
	)
}

const Navigation = ({ router }) => {

	return (
		<div className="flex justify-between">
			<div>
				<h1 className="text-3xl	font-semibold">Editar el Servicio</h1>
			</div>
			<div>
				<button
					onClick={() => router.back()}
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

export default ServiceEdit
