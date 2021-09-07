import { ArrowRightIcon, PencilAltIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/dist/client/router'
import React from 'react'

export const TableRow = ({ currentService }) => {
	const { id, name, client_detail, code, estimated_price, init_date, end_date, state, } = currentService
	const router = useRouter()

	const handleServiceClick = () => {

		router.push({
			pathname: '/services/[pid]',
			query: { pid: id },
		})

	}

	const handleServiceEditClick = () => {

		router.push({
			pathname: '/services/edit/[pid]',
			query: { pid: id },
		})

	}

	return (
		<tr className="hover:bg-gray-50 border-b border-t">
			<td className="text-left p-2">
				{name}
			</td>
			<td className="text-left p-2">
				{client_detail.name}
			</td>
			<td className="text-left p-2">
				{code}
			</td>
			<td className="text-left p-2">
				S/ {estimated_price}
			</td>
			<td className="text-left p-2">
				{init_date}
			</td>
			<td className="text-left p-2">
				{end_date}
			</td>
			<td className="text-left p-2">
				{
					(state)
						?
						<span className="bg-red-500 text-white px-3 py-1 rounded-full">
							Completado
						</span>
						:
						<span className="bg-green-500 text-white px-3 py-1 rounded-full">
							En progreso
						</span>
				}
			</td>
			<td className="p-2">
				<div className="flex justify-center p-2 gap-x-2">
					<button
						className="p-3 hover:bg-gray-100 rounded-full transition duration-300"
						onClick={handleServiceClick}
					>
						<ArrowRightIcon className="h-5" />
					</button>
					<button
						className="p-3 hover:bg-gray-100 rounded-full transition duration-300"
						onClick={handleServiceEditClick}
					>
						<PencilAltIcon className="h-5" />
					</button>
				</div>
			</td>
		</tr>
	)
}
