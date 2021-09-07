import React from 'react'

import { ArrowRightIcon, PencilAltIcon, TrashIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/dist/client/router'
import { useDispatch } from 'react-redux'

import { employeeSetActive, employeeStartDelete } from '../../../actions/employee'
import { uiOpenEmployeeModal } from '../../../actions/ui'

export const TableRow = ({ currentEmployee, index }) => {

	const dispatch = useDispatch()


	const handleEmployeeEdit = () => {
		dispatch(employeeSetActive(currentEmployee))
		dispatch(uiOpenEmployeeModal())
	}

	const handleEmployeeDelete = () => {
		dispatch(employeeStartDelete(currentEmployee.id))
	}

	return (
		<tr className="hover:bg-gray-50 border-b border-t">
			<td className="text-left p-2">
				{index}
			</td>
			<td className="text-left p-2">
				{currentEmployee.name}
			</td>
			{/* <td className="text-left p-2">
				<span className="pr-4">
					{moment(currentEmployee.created_at).format('DD-MM-YYYY')}
				</span>
				<span className="pr-4">
					{moment(currentEmployee.created_at).format('HH:mm')}
				</span>
			</td> */}
			<td className="p-2">
				<div className="flex justify-center p-2">
					<button
						className="p-3 hover:bg-gray-100 rounded-full transition duration-300"
					>
						<ArrowRightIcon className="h-5" />
					</button>
					<button
						onClick={handleEmployeeEdit}
						className="p-3 hover:bg-gray-100 rounded-full transition duration-300"
					>
						<PencilAltIcon className="h-5" />
					</button>
					<button
						onClick={handleEmployeeDelete}
						className="p-3 hover:bg-gray-100 rounded-full transition duration-300"
					>
						<TrashIcon className="h-5" />
					</button>
				</div>
			</td>
		</tr>
	)
}
