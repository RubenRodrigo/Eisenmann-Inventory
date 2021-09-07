import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { BriefcaseIcon, CashIcon, KeyIcon, UsersIcon } from '@heroicons/react/outline'

import { TextField } from '../../ui/TextField'
import { TextArea } from '../../ui/TextArea'
import { Switch } from '@headlessui/react'
import { Select } from '../../ui/Select'
import { useSelector } from 'react-redux'

export const ServiceForm = ({ handleSubmitForm, initialValues }) => {

	const { clients } = useSelector(state => state.clientList)
	const { register, handleSubmit, setValue, control, formState: { errors } } = useForm();

	useEffect(() => {
		setValue('name', initialValues.name, { shouldValidate: true })
		setValue('client', initialValues.client, { shouldValidate: true })
		setValue('code', initialValues.code, { shouldValidate: true })
		setValue('estimated_price', initialValues.estimated_price, { shouldValidate: true })
		setValue('observations', initialValues.observations, { shouldValidate: true })
	}, [setValue, initialValues])


	return (
		<form onSubmit={handleSubmit(handleSubmitForm)}>
			<div className="grid grid-cols-2 gap-x-6 gap-y-4">
				<div className="col-span-1">
					<label className="mb-2 block text-md text-gray-600">Servicio</label>
					<TextField
						type="text"
						placeholder="Servicio"
						name="name"
						register={register}
						required
						error={errors.name}
					>
						<BriefcaseIcon className="h-5 self-center pl-2" />
					</TextField>
					{errors.name && <span className="text-red-500 text-sm">Este campo es requerido</span>}
				</div>
				<div className="col-span-1">
					<label className="mb-2 block text-md text-gray-600">Placa</label>
					<TextField
						type="text"
						placeholder="Placa"
						name="code"
						register={register}
						required
						error={errors.code}
					>
						<KeyIcon className="h-5 self-center pl-2" />
					</TextField>
					{errors.code && <span className="text-red-500 text-sm">Este campo es requerido</span>}
				</div>
				<div className="col-span-1">
					<label className="mb-2 block text-md text-gray-600">Cliente</label>
					<Select
						name="client"
						register={register}
						required
						error={errors.client}
					>
						<option
							value={0}
							disabled
						>
							Selecciona una opcion
						</option>
						{
							clients.map((client, index) => (
								<option
									key={client.id}
									value={client.id}
								>
									{client.name}
								</option>
							))
						}
					</Select>
					{errors.client && <span className="text-red-500 text-sm">Este campo es requerido</span>}
				</div>
				<div className="col-span-1">
					<label className="mb-2 block text-md text-gray-600">Precio Estimado</label>
					<TextField
						type="text"
						placeholder="Precio"
						name="estimated_price"
						register={register}
						required
						error={errors.estimated_price}
					>
						<CashIcon className="h-5 self-center pl-2" />
					</TextField>
					{errors.estimated_price && <span className="text-red-500 text-sm">Este campo es requerido</span>}
				</div>
				<div className="col-span-1">
					<Controller
						control={control}
						name="state"
						defaultValue={initialValues.state}
						render={({ field: { onChange, onBlur, value } }) => (
							<Switch
								checked={value}
								onChange={onChange}
								onBlur={onBlur}
								className={`${value ? 'bg-blue-600' : 'bg-gray-200'
									} relative inline-flex items-center h-6 rounded-full w-11`}
							>
								<span className="sr-only">Enable notifications</span>
								<span
									className={`${value ? 'translate-x-6' : 'translate-x-1'
										} inline-block w-4 h-4 transform bg-white rounded-full`}
								/>
							</Switch>
						)}
					/>
				</div>
				<div className="col-span-1">
				</div>
				<div className="col-span-2">
					<label className="mb-2 block text-md text-gray-600">Observaciones</label>
					<TextArea
						cols="30"
						rows="5"
						placeholder="Observaciones"
						name="observations"
						register={register}
					/>
				</div>
			</div >
			<div className="mt-5">
				<button
					type="submit"
					className="rounded-md bg-blue-800 hover:bg-blue-900 transition duration-300 text-white text-lg px-3 py-2"
				>
					Guardar Servicio
				</button>
			</div>
		</form >
	)
}
