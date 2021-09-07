import { CalculatorIcon } from '@heroicons/react/outline'
import { TextField } from '../../ui/TextField'
import Modal from '../../Modal/Modal'

export const ServiceStateModal = ({ open, setOpen, handleSubmitForm }) => {

	return (
		<div>
			<Modal open={open} setOpen={setOpen} >
				{/* Modal Header */}
				<div className="bg-gray-50 px-4 py-3 sm:px-6 ">
					<h3 className="text-2xl">Cambiar estado</h3>
				</div>

				{/* Modal Body */}
				<div className="bg-white px-6 py-4">
					<div className="flex justify-around text-white">
						<button
							onClick={() => handleSubmitForm({ state: false })}
							className="focus:outline-none p-3 bg-green-500 hover:bg-green-600 rounded"
						>
							Activar
						</button>
						<button
							onClick={() => handleSubmitForm({ state: true })}
							className="focus:outline-none p-3 bg-red-500 hover:bg-red-600 rounded"
						>
							Desactivar
						</button>
					</div>
				</div>

				{/* Modal Footer */}
				<div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
					<button
						type="button"
						className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
						onClick={() => setOpen(false)}
					>
						Cancel
					</button>
				</div>
			</Modal>
		</div >
	)
}
