import React from 'react'

import { ArrowRightIcon, PencilAltIcon, TrashIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/dist/client/router'
import { useDispatch } from 'react-redux'
import { productStartDelete } from '../../../actions/product'

import moment from 'moment'

export const TableRow = ({ currentProduct }) => {

	const dispatch = useDispatch()
	const router = useRouter()


	const handleProductEdit = () => {

		router.push({
			pathname: '/products/edit/[pid]',
			query: { pid: currentProduct.id },
		})

	}

	const handleProductDelete = () => {
		dispatch(productStartDelete(currentProduct.id))
	}

	return (
		<tr className="hover:bg-gray-50 border-b border-t">
			<td className="text-left p-2">
				{currentProduct.code}
			</td>
			<td className="text-left p-2">
				{currentProduct.name}
			</td>
			<td className="text-left p-2">
				{currentProduct.description}
			</td>
			<td className="text-left p-2">
				{currentProduct.type_detail.name}
			</td>
			<td className="text-left p-2">
				{currentProduct.unit_detail.name}
			</td>
			<td className="text-left p-2">
				<span className="pr-4">
					{moment(currentProduct.created_at).format('DD-MM-YYYY')}
				</span>
				<span className="pr-4">
					{moment(currentProduct.created_at).format('HH:mm')}
				</span>
			</td>
			<td className="p-2">
				<div className="flex justify-center p-2">
					<button
						className="p-3 hover:bg-gray-100 rounded-full transition duration-300"
						onClick={() => router.push({ pathname: '/products/[pid]', query: { pid: currentProduct.id } })}
					>
						<ArrowRightIcon className="h-5" />
					</button>
					<button
						onClick={handleProductEdit}
						className="p-3 hover:bg-gray-100 rounded-full transition duration-300"
					>
						<PencilAltIcon className="h-5" />
					</button>
					<button
						onClick={handleProductDelete}
						className="p-3 hover:bg-gray-100 rounded-full transition duration-300"
					>
						<TrashIcon className="h-5" />
					</button>
				</div>
			</td>
		</tr>
	)
}
