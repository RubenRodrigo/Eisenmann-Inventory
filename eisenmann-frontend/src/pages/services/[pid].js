import React, { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/dist/client/router'

import { ArrowLeftIcon, PencilAltIcon } from '@heroicons/react/outline'

import { InfoService } from '../../components/Service/serviceDetail/InfoService'
import { TableServiceProducts } from '../../components/Service/serviceDetail/TableServiceProducts'
import { fetchSinToken } from '../../helpers/fetch'
import { useDispatch, useSelector } from 'react-redux'
import { serviceClearActive, serviceSetActive, serviceStartDelete } from '../../actions/service'
import { productStockClearData, productStockSetData } from '../../actions/productStock'
import Error from 'next/error'

export async function getServerSideProps(context) {
	try {
		const { pid } = context.params
		const resp = await fetchSinToken(`service/${pid}`);
		const initialState = await resp.json();
		const errorCode = resp.ok ? false : res.statusCode

		const product = await fetchSinToken('product/product_stock');
		const products = await product.json();

		return {
			props: { errorCode: errorCode, initialState, products }
		}
	} catch (e) {
		console.log(e);
		return {
			props: { errorCode: 500, initialState: {}, products: [] }
		}
	}

}

const Service = ({ errorCode, initialState, products }) => {
	const router = useRouter()
	const { pid } = router.query

	const dispatch = useDispatch()
	const { loading } = useSelector(state => state.serviceActive)

	useEffect(() => {
		dispatch(serviceSetActive(initialState))
		dispatch(productStockSetData(products))
		return () => {
			dispatch(serviceClearActive())
			dispatch(productStockClearData())
		}
	}, [dispatch, initialState, products])

	const handleDelete = () => {
		dispatch(serviceStartDelete(pid, router));
	}

	const handleReport = () => {
		console.log('Report');
	}

	if (errorCode) {
		return <Error statusCode={errorCode} />
	}

	return (
		<>
			<Navigation pid={pid} router={router} />
			{
				(!loading) &&
				(
					<>
						<InfoService handleDelete={handleDelete} handleReport={handleReport} />
						<TableServiceProducts />
					</>
				)
			}
		</>
	)
}

const Navigation = ({ router }) => {
	const { service } = useSelector(state => state.serviceActive)

	return (
		<div className="flex justify-between">
			<div>
				<h1 className="text-3xl	font-semibold mb-4">Servicio {service.code} </h1>
				<button
					onClick={() => router.back()}
					className="border rounded-lg block border-blue-800 hover:bg-gray-100 transition duration-300 px-3 py-2"
				>
					<div className="flex text-blue-800">
						<ArrowLeftIcon className="h-5 w-5 self-center" />
						<span className="pl-2 font-semibold">Cancelar</span>
					</div>
				</button>
			</div>
			<div>
				<Link href={`/services/edit/${service.id}`}>
					<a className="bg-blue-800 px-3 py-2 rounded-lg block hover:bg-blue-900 transition duration-300">
						<div className="flex text-white ">
							<PencilAltIcon className="h-5 w-5 self-center" />
							<span className="pl-2 font-semibold">Editar Servicio</span>
						</div>
					</a>
				</Link>
			</div>
		</div>
	)
}

export default Service
