import { SearchIcon } from '@heroicons/react/outline'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { productStockFilterByValue } from '../../../actions/filters'
import { uiCloseCalendar, uiOpenCalendar } from '../../../actions/ui'
import { Calendar } from '../../ui/Calendar'

export const TableNav = () => {
	const dispatch = useDispatch()
	const { open } = useSelector(state => state.uiCalendar)

	const [focusInput, setFocusInput] = useState(false)
	const [focusSelect, setFocusSelect] = useState(false)

	const handleCalendar = () => {
		if (!open) {
			dispatch(uiOpenCalendar())
		} else {
			dispatch(uiCloseCalendar())
		}
	}

	const filterByValue = (e) => {
		dispatch(productStockFilterByValue(e.target.value))
	}

	return (
		<div className="grid grid-cols-6 gap-6 p-4">
			<div className="col-span-2">
				{/* <div
					className={`
						flex p-3 rounded-xl border
						${focusInput ? 'border-blue-800' : 'border-gray-400 border hover:border-gray-800'}
					`}
				>
					<SearchIcon className="h-5 self-center" />
					<input
						onFocus={() => setFocusInput(true)}
						onBlur={() => setFocusInput(false)}
						// onChange={filterByValue}
						className="focus:outline-none ml-3 placeholder-gray-600 text-lg w-full"
						type="text"
						placeholder="Busca un producto"
					/>
				</div> */}
			</div>
			<div className="col-span-2">
				{/* <div
					className={`
						flex p-3 rounded-xl border
						${focusSelect ? 'border-blue-800' : 'border-gray-400  hover:border-gray-800'}
					`}
				>
					<select
						onFocus={() => setFocusSelect(true)}
						onBlur={() => setFocusSelect(false)}
						className="w-full text-lg h-7"
					>
						<option value="0">Codigo</option>
						<option value="1">Nombre</option>
					</select>
				</div> */}
			</div>
			<div className="col-span-2 justify-self-end relative">
				<button
					onClick={handleCalendar}
					className="bg-blue-800 px-3 py-2 rounded-lg block hover:bg-blue-900 transition duration-300 relative"
				>
					<div className="flex text-white ">
						<span className="pl-2 font-semibold">Ver calendario</span>
					</div>
				</button>
				{open &&
					<div className="absolute top-12 right-0 shadow-md">
						<Calendar />
					</div>
				}
			</div>
		</div >
	)
}
