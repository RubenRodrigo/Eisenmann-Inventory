import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { AnnotationIcon } from '@heroicons/react/outline'

import { TextField } from '../../ui/TextField'
import { TextArea } from '../../ui/TextArea'
import { Select } from '../../ui/Select'
import { useSelector } from 'react-redux'

export const ProductForm = ({ handleSubmitForm, initialValues }) => {

	const { types } = useSelector(state => state.typeList)
	const { units } = useSelector(state => state.unitList)
	const { register, handleSubmit, setValue, formState: { errors } } = useForm();

	useEffect(() => {
		setValue('name', initialValues.name, { shouldValidate: true })
		setValue('type', initialValues.type, { shouldValidate: true })
		setValue('unit', initialValues.unit, { shouldValidate: true })
		setValue('code', initialValues.code, { shouldValidate: true })
		setValue('description', initialValues.description, { shouldValidate: true })
	}, [setValue, initialValues])

	return (
		<form onSubmit={handleSubmit(handleSubmitForm)}>
			<div className="grid grid-cols-2 gap-x-6 gap-y-4">
				<div className="col-span-1">
					<label className="mb-2 block text-md text-gray-600">Nombre</label>
					<TextField
						autoComplete="off"
						type="text"
						placeholder="Nombre"
						name="name"
						register={register}
						required
						error={errors.name}
					>
						<AnnotationIcon className="h-5 self-center pl-2" />
					</TextField>
					{errors.name && <span className="text-red-500 text-sm">Este campo es requerido</span>}
				</div>
				<div className="col-span-1">
					<label className="mb-2 block text-md text-gray-600">Codigo</label>
					<TextField
						autoComplete="off"
						type="text"
						placeholder="Codigo"
						name="code"
						register={register}
						required
						error={errors.code}
					/>
					{errors.code && <span className="text-red-500 text-sm">Este campo es requerido</span>}
				</div>
				<div className="col-span-1">
					<label className="mb-2 block text-md text-gray-600">Tipo de producto</label>
					<Select
						name="type"
						register={register}
						required
						error={errors.type}
					>
						{
							types.map((type, index) => (

								<option
									key={type.id}
									value={type.id}
								>
									{type.name}
								</option>
							))
						}
					</Select>
					{errors.type && <span className="text-red-500 text-sm">Este campo es requerido</span>}
				</div>
				<div className="col-span-1">
					<label className="mb-2 block text-md text-gray-600">Unidad de medida</label>
					<Select
						name="unit"
						register={register}
						required
						error={errors.unit}
					>
						{
							units.map((unit, index) => (

								<option
									key={unit.id}
									value={unit.id}
								>
									{unit.name}
								</option>
							))
						}
					</Select>
					{errors.unit && <span className="text-red-500 text-sm">Este campo es requerido</span>}
				</div>
				<div className="col-span-2">
					<label className="mb-2 block text-md text-gray-600">Descripcion</label>
					<TextArea
						cols="30"
						rows="5"
						placeholder="Descripcion del producto"
						name="description"
						register={register}
					/>
				</div>
			</div >
			<div className="mt-5">
				<button
					type="submit"
					className="rounded-md bg-blue-800 hover:bg-blue-900 transition duration-300 text-white text-lg px-3 py-2"
				>
					Guardar Producto
				</button>
			</div>
		</form >
	)
}
