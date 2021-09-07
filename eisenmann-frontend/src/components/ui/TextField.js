import React, { useRef, useState } from 'react'

export const TextField = ({ children, name, register, required = false, error = false, ...rest }) => {

	const [activeInput, setActiveInput] = useState(false)
	const refInput = useRef(null)

	const handleFocus = () => {
		setActiveInput(true)
	}

	const handleBlur = () => {
		setActiveInput(false)
	}

	// TODO:
	// const handleClickContainer = () => {
	// 	setActiveInput(true)
	// 	refInput.current.focus()
	// }

	return (
		(error)
			?
			(
				< div
					className={`
									flex rounded-md 
									${activeInput ? 'border-red-500 border-2' : 'border-red-500 border'}
								`}
				>
					{children}
					<input
						{...register(name, { required })}
						className="p-3 focus:outline-none placeholder-gray-600 text-md w-full"
						onBlur={handleBlur}
						onFocus={handleFocus}
						{...rest}
					// ref={refInput}
					/>
				</div>
			)
			:
			(
				< div
					className={`
									flex rounded-md 
									${activeInput ? 'border-blue-800 border-2' : 'border-gray-400 border hover:border-gray-800'}
								`}
				>
					{children}
					<input
						{...register(name, { required })}
						className="p-3 focus:outline-none placeholder-gray-600 text-md w-full"
						onBlur={handleBlur}
						onFocus={handleFocus}
						{...rest}
					// ref={refInput}
					/>
				</div >
			)
	)
}
