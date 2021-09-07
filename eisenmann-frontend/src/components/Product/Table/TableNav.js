import { SearchIcon } from '@heroicons/react/outline'
import React, { useState } from 'react'

export const TableNav = () => {
	const [focusInput, setFocusInput] = useState(false)
	const [focusSelect, setFocusSelect] = useState(false)

	return (
		<div className="grid grid-cols-6 gap-6 p-4">
			<div className="col-span-2">
				{/* <div

					className={`
						flex p-3 rounded-xl 
						${focusInput ? 'border-blue-800 border-2' : 'border-gray-400 border hover:border-gray-800'}
					`}
				>
					<SearchIcon className="h-5 self-center" />
					<input
						onFocus={() => setFocusInput(true)}
						onBlur={() => setFocusInput(false)}
						className="focus:outline-none ml-3 placeholder-gray-600 text-lg w-full"
						type="text"
						placeholder="Busca un producto"
					/>
				</div> */}
			</div>
			<div className="col-span-2">
				{/* <div
					className={`
						flex p-3 rounded-xl 
						${focusSelect ? 'border-blue-800 border-2' : 'border-gray-400 border hover:border-gray-800'}
					`}
				>
					<select
						onFocus={() => setFocusSelect(true)}
						onBlur={() => setFocusSelect(false)}
						className="w-full text-lg h-7"
					>
						<option value="0">Ultima actualizacion</option>
						<option value="1">Ultima actualizacion</option>
						<option value="2">Ultima actualizacion</option>
					</select>
				</div> */}
			</div>
		</div >
	)
}
