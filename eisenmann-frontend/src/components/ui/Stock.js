import React from 'react'

export const Stock = ({ value, range = [] }) => {
	if (value >= range[0]) {
		return (
			<span
				className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-full"
			>
				{value} en stock
			</span>
		)
	} else if (value >= range[1]) {
		return (
			<span
				className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-full"
			>
				{value} en stock
			</span>
		)
	} else {
		return (
			<span
				className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full"
			>
				{value} en stock
			</span>
		)
	}

}