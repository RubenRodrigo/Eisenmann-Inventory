import React from 'react'

import { ArrowRightIcon, PencilAltIcon, TrashIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/dist/client/router'
import { useDispatch } from 'react-redux'
import { clientSetActive, clientStartDelete } from '../../../actions/client'
import { uiOpenClientModal } from '../../../actions/ui'

export const TableRow = ({ currentClient, index }) => {

	const dispatch = useDispatch()

	const handleClientEdit = () => {
		dispatch(clientSetActive(currentClient))
		dispatch(uiOpenClientModal())
	}

	const handleClientDelete = () => {
		dispatch(clientStartDelete(currentClient.id))
	}

	return (
		<tr className="hover:bg-gray-50 border-b border-t">
			<td className="text-left p-2">
				{index}
			</td>
			<td className="text-left p-2">
				{currentClient.name}
			</td>
			<td className="text-left p-2">
				{currentClient.identifier}
			</td>
			<td className="text-left p-2">
				{currentClient.total_services}
			</td>
			{/* <td className="text-left p-2">
				<span className="pr-4">
					{moment(currentClient.created_at).format('DD-MM-YYYY')}
				</span>
				<span className="pr-4">
					{moment(currentClient.created_at).format('HH:mm')}
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
						onClick={handleClientEdit}
						className="p-3 hover:bg-gray-100 rounded-full transition duration-300"
					>
						<PencilAltIcon className="h-5" />
					</button>
					<button
						onClick={handleClientDelete}
						className="p-3 hover:bg-gray-100 rounded-full transition duration-300"
					>
						<TrashIcon className="h-5" />
					</button>
				</div>
			</td>
		</tr>
	)
}
