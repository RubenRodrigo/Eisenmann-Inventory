import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { PlusIcon } from '@heroicons/react/outline'
import Link from 'next/link'

// Helpers
import { fetchSinToken } from '../../helpers/fetch';

// Actions
import {
	productClearData,
	productSetData
} from '../../actions/product';

// Components
import { TableProduct } from '../../components/Product/Table/TableProduct'

export async function getServerSideProps() {
	// TODO: Verify if this service exist

	const resp = await fetchSinToken('product/');
	const initialState = await resp.json();

	return {
		props: { initialState }
	}

}

const Products = ({ initialState }) => {

	const dispatch = useDispatch()

	// Set data in the store
	useEffect(() => {
		dispatch(productSetData(initialState))
		return () => {
			dispatch(productClearData())
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
			<div>
				<Link href="/products/new">
					<a
						className="bg-blue-800 px-3 py-2 rounded-lg block hover:bg-blue-900 transition duration-300"
					>
						<div className="flex text-white ">
							<PlusIcon className="h-5 w-5 self-center" />
							<span className="pl-2 font-semibold">Nuevo Producto</span>
						</div>
					</a>
				</Link>
			</div>
		</div>
	)
}

export default Products