import React, { useEffect } from 'react'
import { useRouter } from 'next/dist/client/router'
import { useDispatch, useSelector } from 'react-redux'
import { ArrowLeftIcon } from '@heroicons/react/outline'


// Helpers
import { fetchSinToken } from '../../helpers/fetch'

// Actions
import {
	productStockClearActive,
	productStockSetActive
} from '../../actions/productStock'

// Components
import { ProductEntryTable } from '../../components/ProductStock/Detail/ProductEntryTable'
import ProductInfo from '../../components/ProductStock/Detail/ProductInfo'

export async function getServerSideProps(context) {
	const { pid } = context.params

	try {
		const resp = await fetchSinToken(`product/product_stock/${pid}`);
		const initialState = await resp.json();
		return {
			props: { initialState }
		}

	} catch (error) {
		console.log(error);
		return {
			props: { initialState: {} }
		}
	}

}

const Product = ({ initialState }) => {

	const dispatch = useDispatch()
	const router = useRouter()
	const { pid } = router.query

	useEffect(() => {
		dispatch(productStockSetActive(initialState))

		return () => {
			dispatch(productStockClearActive())
		}

	}, [dispatch, initialState])

	const { loading } = useSelector(state => state.productStockActive)

	return (
		<>
			<Navigation router={router} />
			{
				(!loading) &&
				<>
					<ProductInfo />
					<ProductEntryTable />
				</>
			}
		</>
	)
}

const Navigation = ({ router }) => {
	const { productStock, loading } = useSelector(state => state.productStockActive)
	return (
		<div className="flex justify-between">
			<div>
				<h1 className="text-3xl	font-semibold">Producto {(!loading) && productStock?.product_detail?.name}</h1>
			</div>
			<div>
				<button
					onClick={() => router.push('/product-stock')}
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

export default Product
