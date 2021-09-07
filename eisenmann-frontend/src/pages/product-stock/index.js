import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { PlusIcon } from '@heroicons/react/outline'

// Helpers
import { fetchSinToken } from '../../helpers/fetch';

// Actions
import {
	productStockClearActive,
	productStockClearData,
	productStockSetData,
} from '../../actions/productStock';

import {
	uiOpenProductStockModal
} from '../../actions/ui';

// Components
import { ProductStockModalForm } from '../../components/ProductStock/Form/ProductStockModalForm';
import { TableProduct } from '../../components/ProductStock/Table/TableProduct'
import moment from 'moment';
import { productStartLoadingData } from '../../actions/product';

export async function getServerSideProps() {
	// TODO: Verify if this service exist

	const year = moment().year();
	const month = moment().month() + 1;

	const resp = await fetchSinToken(`product/product_stock/?year=${year}&month=${month}`);
	const initialState = await resp.json();

	return {
		props: { initialState }
	}

}

const ProductsStock = ({ initialState }) => {

	const dispatch = useDispatch()

	// Set data in the store
	useEffect(() => {
		dispatch(productStockSetData(initialState))
		return () => {
			dispatch(productStockClearData())
		}
	}, [dispatch, initialState])

	return (
		<>
			<Navigation />
			<div className="relative">
				<TableProduct />
			</div>
		</>
	)
}

const Navigation = () => {
	const dispatch = useDispatch()

	// Set current product to state. This is to set data in modal
	const handleOpenModal = () => {
		dispatch(productStartLoadingData())
		dispatch(productStockClearActive())
		dispatch(uiOpenProductStockModal())
	}

	return (
		<div className="flex justify-between">
			<ProductStockModalForm />
			<div>
				<h1 className="text-3xl	font-semibold">Stock de productos</h1>
			</div>
			<div>
				<button
					onClick={handleOpenModal}
					className="bg-blue-800 px-3 py-2 rounded-lg block hover:bg-blue-900 transition duration-300"
				>
					<div className="flex text-white ">
						<PlusIcon className="h-5 w-5 self-center" />
						<span className="pl-2 font-semibold">Nuevo Producto</span>
					</div>
				</button>
			</div>
		</div>
	)
}

export default ProductsStock