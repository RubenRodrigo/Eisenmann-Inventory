import React from 'react'

import { ArrowRightIcon, PencilAltIcon, TrashIcon } from '@heroicons/react/outline'
import { useDispatch } from 'react-redux'
import { typeSetActive, typeStartDelete } from '../../../actions/type'
import { uiOpenTypeModal } from '../../../actions/ui'


export const TableRow = ({ currentType, index }) => {

	const dispatch = useDispatch()

	const handleTypeEdit = () => {
		dispatch(typeSetActive(currentType))
		dispatch(uiOpenTypeModal())
	}

	const handleTypeDelete = () => {
		dispatch(typeStartDelete(currentType.id))
	}

	return (
		<tr className="hover:bg-gray-50 border-b border-t">
			<td className="text-left p-2">
				{index}
			</td>
			<td className="text-left p-2">
				{currentType.name}
			</td>
			<td className="text-left p-2">
				{currentType.description}
			</td>
			<td className="p-2">
				<div className="flex justify-center p-2">
					<button
						className="p-3 hover:bg-gray-100 rounded-full transition duration-300"
					>
						<ArrowRightIcon className="h-5" />
					</button>
					<button
						onClick={handleTypeEdit}
						className="p-3 hover:bg-gray-100 rounded-full transition duration-300"
					>
						<PencilAltIcon className="h-5" />
					</button>
					<button
						onClick={handleTypeDelete}
						className="p-3 hover:bg-gray-100 rounded-full transition duration-300"
					>
						<TrashIcon className="h-5" />
					</button>
				</div>
			</td>
		</tr>
	)
}
