import React from 'react'

import { ArrowRightIcon, PencilAltIcon, TrashIcon } from '@heroicons/react/outline'
import { useDispatch } from 'react-redux'
import { uiOpenUnitModal } from '../../../actions/ui'
import { unitSetActive, unitStartDelete } from '../../../actions/unit'


export const TableRow = ({ currentUnit, index }) => {

	const dispatch = useDispatch()

	const handleUnitEdit = () => {
		dispatch(unitSetActive(currentUnit))
		dispatch(uiOpenUnitModal())
	}

	const handleUnitDelete = () => {
		dispatch(unitStartDelete(currentUnit.id))
	}

	return (
		<tr className="hover:bg-gray-50 border-b border-t">
			<td className="text-left p-2">
				{index}
			</td>
			<td className="text-left p-2">
				{currentUnit.name}
			</td>
			<td className="text-left p-2">
				{currentUnit.description}
			</td>
			<td className="text-left p-2">
				{currentUnit.abr}
			</td>
			<td className="p-2">
				<div className="flex justify-center p-2">
					<button
						className="p-3 hover:bg-gray-100 rounded-full transition duration-300"
					>
						<ArrowRightIcon className="h-5" />
					</button>
					<button
						onClick={handleUnitEdit}
						className="p-3 hover:bg-gray-100 rounded-full transition duration-300"
					>
						<PencilAltIcon className="h-5" />
					</button>
					<button
						onClick={handleUnitDelete}
						className="p-3 hover:bg-gray-100 rounded-full transition duration-300"
					>
						<TrashIcon className="h-5" />
					</button>
				</div>
			</td>
		</tr>
	)
}
