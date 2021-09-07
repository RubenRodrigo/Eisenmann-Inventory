import React from 'react'

const Edit = () => {
	return (
		<div>
			EDIT
		</div>
	)
}

export default Edit

// import React, { useEffect } from 'react'
// import { useRouter } from 'next/dist/client/router'

// import { ArrowLeftIcon } from '@heroicons/react/outline'

// import { ProductForm } from '../../../components/Product/productForm/ProductForm'
// import { useDispatch, useSelector } from 'react-redux'
// import { productClearActive, productSetActive, productStartUpdate } from '../../../actions/product'
// import { fetchSinToken } from '../../../helpers/fetch'
// import { typeClearData, typeSetData } from '../../../actions/type'
// import { unitClearData, unitSetData } from '../../../actions/unit'

// export async function getServerSideProps(context) {
// 	const { pid } = context.params

// 	const productFetch = await fetchSinToken(`product/product_stock/${pid}`);
// 	const type = await fetchSinToken('product/type');
// 	const unit = await fetchSinToken('product/unit');

// 	const productData = await productFetch.json();
// 	const units = await unit.json();
// 	const types = await type.json();

// 	return {
// 		props: { productData, types, units }
// 	}
// }

// const ProductEdit = ({ productData, types, units }) => {

// 	const dispatch = useDispatch()
// 	const router = useRouter()
// 	const { pid } = router.query

// 	useEffect(() => {
// 		dispatch(productSetActive(productData))

// 		dispatch(typeSetData(types))
// 		dispatch(unitSetData(units))

// 		return () => {
// 			dispatch(productClearActive())

// 			dispatch(typeClearData())
// 			dispatch(unitClearData())
// 		}
// 	}, [dispatch, productData, types, units])

// 	const { product, loading } = useSelector(state => state.productActive)

// 	const initialValues = {
// 		id: product.id,
// 		type: product.type,
// 		unit: product.unit,
// 		code: product.code,
// 		name: product.name,
// 		description: product.description,
// 	}

// 	const handleSubmitForm = (data) => {
// 		data.id = product.id
// 		dispatch(productStartUpdate(data, router))
// 	}

// 	return (
// 		<>
// 			<Navigation pid={pid} router={router} />
// 			<div className="mt-4 border border-gray-300 rounded-lg py-4 px-6">
// 				{
// 					(!loading) &&
// 					<ProductForm
// 						initialValues={initialValues}
// 						handleSubmitForm={handleSubmitForm}
// 					/>
// 				}
// 			</div >
// 		</>
// 	)
// }

// const Navigation = ({ pid, router }) => {
// 	return (
// 		<div className="flex justify-between">
// 			<div>
// 				<h1 className="text-3xl	font-semibold">Producto {pid}</h1>
// 			</div>
// 			<div>
// 				<button
// 					onClick={() => router.push('/products')}
// 					className="border rounded-lg block border-blue-800 hover:bg-gray-100 transition duration-300 px-3 py-2"
// 				>
// 					<div className="flex text-blue-800  ">
// 						<ArrowLeftIcon className="h-5 w-5 self-center" />
// 						<span className="pl-2 font-semibold">Cancelar</span>
// 					</div>
// 				</button>
// 			</div>
// 		</div>
// 	)
// }

// export default ProductEdit

