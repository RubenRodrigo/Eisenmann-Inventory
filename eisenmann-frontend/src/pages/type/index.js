import { PlusIcon } from '@heroicons/react/outline'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { typeClearActive, typeClearData, typeSetData } from '../../actions/type';
import { uiOpenTypeModal } from '../../actions/ui';
import { TypeModalForm } from '../../components/Type/Form/TypeModalForm';
import { TableType } from '../../components/Type/Table/TableType';
import { fetchSinToken } from '../../helpers/fetch';

export async function getServerSideProps() {
	const resp = await fetchSinToken(`product/type`);
	const initialState = await resp.json();

	return {
		props: { initialState }
	}

}

const Type = ({ initialState }) => {
	const dispatch = useDispatch()

	// Set data in the store
	useEffect(() => {
		dispatch(typeSetData(initialState))
		return () => {
			dispatch(typeClearData())
		}
	}, [dispatch, initialState])

	return (
		<>
			<Navigation />
			<div>
				<TableType />
			</div>
		</>
	)
}

const Navigation = () => {

	const dispatch = useDispatch()

	const handleOpenModal = () => {
		dispatch(typeClearActive())
		dispatch(uiOpenTypeModal())
	}

	return (
		<div className="flex justify-between">
			<TypeModalForm />
			<div>
				<h1 className="text-3xl	font-semibold">Lista de Tipos</h1>
			</div>
			<div>
				<button
					onClick={handleOpenModal}
					className="bg-blue-800 px-3 py-2 rounded-lg block hover:bg-blue-900 transition duration-300"
				>
					<div className="flex text-white ">
						<PlusIcon className="h-5 w-5 self-center" />
						<span className="pl-2 font-semibold">Nuevo Tipo</span>
					</div>
				</button>
			</div>
		</div>
	)
}

export default Type
