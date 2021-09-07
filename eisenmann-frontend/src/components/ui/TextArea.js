import React, { useState } from 'react'

export const TextArea = ({ children, name, register, required = false, error = false, ...rest }) => {

	const [activeInput, setActiveInput] = useState(false)

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
				< div
					className={`
									flex p-3 rounded-md 
									${activeInput ? 'border-red-500 border-2' : 'border-red-500 border'}
								`}
				>
					{children}
					<textarea
						{...register(name, { required })}
						className="focus:outline-none ml-3 placeholder-gray-600 text-md w-full"
						onBlur={handleBlur}
						onFocus={handleFocus}
						{...rest}
					/>
				</div>
			)
			:
			(
				< div
					className={`
									flex p-3 rounded-md 
									${activeInput ? 'border-blue-800 border-2' : 'border-gray-400 border hover:border-gray-800'}
								`}
				>
					{children}
					<textarea
						{...register(name, { required })}
						className="focus:outline-none ml-3 placeholder-gray-600 text-md w-full"
						onBlur={handleBlur}
						onFocus={handleFocus}
						{...rest}
					/>
				</div >
			)
	)
}


// import React, { useState } from 'react'

// export const TextArea = ({ children, ...rest }) => {

// 	const [focusInput, setFocusInput] = useState(false)

// 	return (
// 		<div
// 			className={`
// 									flex p-3 rounded-md 
// 									${focusInput ? 'border-blue-800 border-2' : 'border-gray-400 border hover:border-gray-800'}
// 								`}
// 		>
// 			{children}
// 			<textarea
// 				onFocus={() => setFocusInput(true)}
// 				onBlur={() => setFocusInput(false)}
// 				className="focus:outline-none ml-3 placeholder-gray-600 text-md w-full resize-none"
// 				{...rest}
// 			/>
// 		</div>
// 	)
// }

