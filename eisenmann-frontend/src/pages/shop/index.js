import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { PlusIcon } from '@heroicons/react/outline'

// Helpers
import { fetchSinToken } from '../../helpers/fetch';

// Actions
import {
	productStockClearData,
	productStockSetData,
} from '../../actions/productStock';

// Components
import { TableProduct } from '../../components/ProductStock/Table/TableProduct'

export async function getServerSideProps() {
	// TODO: Verify if this service exist

	const resp = await fetchSinToken('product/product_stock_order');
	const initialState = await resp.json();

	return {
		props: { initialState }
	}

}

const ShopProducts = ({ initialState }) => {

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
			<div>
				<TableProduct />
			</div>
		</>
	)
}

const Navigation = () => {
	return (
		<div className="flex justify-between">
			<div>
				<h1 className="text-3xl	font-semibold">Lista de Productos</h1>
			</div>
		</div>
	)
}

export default ShopProducts