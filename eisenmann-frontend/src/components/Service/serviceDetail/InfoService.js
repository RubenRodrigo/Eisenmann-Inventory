import { useRouter } from 'next/dist/client/router'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { serviceStartUpdateState } from '../../../actions/service'
import { ServiceStateModal } from '../serviceForm/ServiceStateModal'

export const InfoService = ({ handleDelete, handleReport }) => {

	const dispatch = useDispatch()
	const { service } = useSelector(state => state.serviceActive)
	const {
		name,
		client_detail,
		code,
		estimated_price,
		final_price,
		init_date,
		end_date,
		state,
		observations,
		service_products,
	} = { ...service }

	const [open, setOpen] = useState(false)

	const handleSubmitForm = (data) => {
		if (data.state !== state) {
			data.id = service.id
			dispatch(serviceStartUpdateState(data));
		}
		setOpen(false)
	}

	return (
		<div className="shadow-md p-4 my-5">
			<ServiceStateModal
				open={open}
				setOpen={setOpen}
				handleSubmitForm={handleSubmitForm}
			/>
			<div className="grid grid-cols-2 gap-4 mt-5">
				<div className="col-span-1 border border-gray-300 rounded-lg">
					<div className="border-b border-gray-300 p-2">
						<h3 className="text-lg font-bold">
							Informacion del Servicio
						</h3>
					</div>
					<div className="p-2">
						<div className="flex p-2">
							<h3 className="font-bold">Servicio:</h3>
							<p className="ml-2">{name}</p>
						</div>
						<div className="flex p-2">
							<h3 className="font-bold">Cliente:</h3>
							<p className="ml-2">{client_detail?.name}</p>
						</div>
						<div className="flex p-2">
							<h3 className="font-bold">Placa:</h3>
							<p className="ml-2">{code}</p>
						</div>
						<div className="flex p-2">
							<h3 className="font-bold">Observaciones:</h3>
							<p className="ml-2">{observations}</p>
						</div>
					</div>
				</div>
				<div className="col-span-1 border border-gray-300 rounded-lg">
					<div className="border-b border-gray-300 p-2">
						<h3 className="text-lg font-bold">
							Estado del Servicio
						</h3>
					</div>
					<div className="p-2">
						<div className="flex p-2">
							<h3 className="font-bold">Estado:</h3>
							<div
								className="cursor-pointer"
								onClick={() => setOpen(true)}
							>
								{
									(state)
										?
										<p className="ml-2 bg-red-500 text-white px-3 rounded-full">
											Completado
										</p>
										:
										<p className="ml-2 bg-green-500 text-white px-3 rounded-full">
											En progreso
										</p>
								}
							</div>
						</div>
						<div className="flex p-2">
							<h3 className="font-bold">Fecha de Inicio:</h3>
							<p className="ml-2">{init_date}</p>
						</div>
						<div className="flex p-2">
							<h3 className="font-bold">Fecha de Fin:</h3>
							<p className="ml-2">{end_date}</p>
						</div>
						<div className="flex p-2">
							<h3 className="font-bold">Precio Inicial:</h3>
							<p className="ml-2">S/ {estimated_price}</p>
						</div>
						<div className="flex p-2">
							<h3 className="font-bold">Precio Final:</h3>
							<p className="ml-2">S/ {final_price}</p>
						</div>
					</div>
				</div>

				<div className="col-span-1 border border-gray-300 rounded-lg p-4">
					<div className="flex flex-col gap-4">
						<button
							onClick={handleReport}
							className="p-2 bg-green-500 text-white rounded hover:bg-green-600">
							Ver reporte
						</button>
						{
							(service_products.length <= 0 && !state)
								?
								<button
									onClick={handleDelete}
									className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
								>
									Eliminar servicio
								</button>
								:
								<button
									className="p-2 bg-red-400 text-white rounded cursor-not-allowed"
									disabled
								>
									Eliminar servicio (No)
								</button>

						}

					</div>
				</div>
			</div>
		</div>
	)
}
