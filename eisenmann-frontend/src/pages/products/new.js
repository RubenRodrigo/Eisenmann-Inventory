import React, { useEffect } from 'react'
import { useRouter } from 'next/dist/client/router'
import { useDispatch } from 'react-redux'

import { ArrowLeftIcon } from '@heroicons/react/outline'

import { productStartCreate } from '../../actions/product'
import { fetchSinToken } from '../../helpers/fetch'
import { typeClearData, typeSetData } from '../../actions/type'
import { unitClearData, unitSetData } from '../../actions/unit'
import { ProductForm } from '../../components/Product/Form/ProductForm'

export async function getServerSideProps() {

	const type = await fetchSinToken('product/type');
	const unit = await fetchSinToken('product/unit');

	const types = await type.json();
	const units = await unit.json();

	return {
		props: { types, units }
	}

}

const NewProduct = ({ types, units }) => {

	const dispatch = useDispatch()
	const router = useRouter()

	useEffect(() => {
		dispatch(typeSetData(types))
		dispatch(unitSetData(units))
		return () => {
			dispatch(typeClearData())
			dispatch(unitClearData())
		}
	}, [dispatch, types, units])

	const initialValues = {
		type: 1,
		unit: 1,
		code: '',
		name: '',
		description: '',
	}

	const handleSubmitForm = (data) => {
		dispatch(productStartCreate(data, router));
	}

	return (
		<>
			<Navigation router={router} />
			<div className="mt-4 border border-gray-300 rounded-lg py-4 px-6">
				<ProductForm
					initialValues={initialValues}
					handleSubmitForm={handleSubmitForm}
				/>
			</div>
		</>
	)
}

const Navigation = ({ router }) => {

	return (
		<div className="flex justify-between">
			<div>
				<h1 className="text-3xl	font-semibold">Añadir un nuevo Producto</h1>
			</div>
			<div>
				<button
					onClick={() => router.push('/products')}
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

export default NewProduct
