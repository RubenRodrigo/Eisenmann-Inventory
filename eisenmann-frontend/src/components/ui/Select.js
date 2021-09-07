import React, { useRef, useState } from 'react'

export const Select = ({ children, name, register, required = false, error = false, ...rest }) => {

	const [activeInput, setActiveInput] = useState(false)
	// const refInput = useRef(null)

	const handleFocus = () => {
		setActiveInput(true)
	}

	const handleBlur = () => {
		setActiveInput(false)
	}

	return (
		(error)
			?
			(
				<div
					className={`
									flex rounded-md 
									${activeInput ? 'border-red-500 border-2' : 'border-red-500 border'}
								`}
				>
					<select
						{...register(name, { required })}
						className="focus:outline-none p-3 placeholder-gray-600 text-md w-full"
						onBlur={handleBlur}
						onFocus={handleFocus}
						{...rest}
					>
						{children}
					</select>
				</div>
			)
			:
			(
				<div
					className={`
									flex rounded-md 									
									${activeInput ? 'border-blue-800 border-2' : 'border-gray-400 border hover:border-gray-800'}
								`}
				>
					<select
						{...register(name, { required, validate: value => parseInt(value) != 0 })}
						className="focus:outline-none p-3 placeholder-gray-600 text-md w-full"
						onBlur={handleBlur}
						onFocus={handleFocus}
						{...rest}
					>
						{children}
					</select>
				</div >
			)
	)
}

