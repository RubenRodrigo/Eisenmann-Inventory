import { PlusIcon } from '@heroicons/react/outline'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { uiOpenUnitModal } from '../../actions/ui';
import { unitClearActive, unitClearData, unitSetData } from '../../actions/unit';
import { UnitModalForm } from '../../components/Unit/Form/UnitModalForm';
import { TableUnit } from '../../components/Unit/Table/TableUnit';
import { fetchSinToken } from '../../helpers/fetch';

export async function getServerSideProps() {
	const resp = await fetchSinToken(`product/unit`);
	const initialState = await resp.json();

	return {
		props: { initialState }
	}

}

const Unit = ({ initialState }) => {
	const dispatch = useDispatch()

	// Set data in the store
	useEffect(() => {
		dispatch(unitSetData(initialState))
		return () => {
			dispatch(unitClearData())
		}
	}, [dispatch, initialState])

	return (
		<>
			<Navigation />
			<div>
				<TableUnit />
			</div>
		</>
	)
}

const Navigation = () => {

	const dispatch = useDispatch()

	const handleOpenModal = () => {
		dispatch(unitClearActive())
		dispatch(uiOpenUnitModal())
	}

	return (
		<div className="flex justify-between">
			<UnitModalForm />
			<div>
				<h1 className="text-3xl	font-semibold">Lista de Unidades</h1>
			</div>
			<div>
				<button
					onClick={handleOpenModal}
					className="bg-blue-800 px-3 py-2 rounded-lg block hover:bg-blue-900 transition duration-300"
				>
					<div className="flex text-white ">
						<PlusIcon className="h-5 w-5 self-center" />
						<span className="pl-2 font-semibold">Nueva Unidad</span>
					</div>
				</button>
			</div>
		</div>
	)
}

export default Unit
