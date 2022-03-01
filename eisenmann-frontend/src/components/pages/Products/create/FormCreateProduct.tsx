import { getSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

import { Form, Formik } from 'formik';
import * as Yup from 'yup'

import { Box, Button, Grid } from '@mui/material';

import { ProductBase } from '@/interfaces/Product';
import { MyCheckbox } from '@/components/Inputs/MyCheckbox';
import { MyInput } from '@/components/Inputs/MyInput';
import { ProductTypeSelect } from '../common/ProductTypeSelect';
import { ProductUnitSelect } from '../common/ProductUnitSelect';
import { createProduct } from 'src/services/products';
import { useLayout } from '@/hooks/useLayout';
import axios from 'axios';

export const FormCreateProduct = () => {

	const { handleOpenToast, handleToastInfo } = useLayout()
	const router = useRouter()

	const createData = async (product: ProductBase) => {
		try {
			const session = await getSession()
			if (session && session.error) {
				signOut()
			}
			if (session?.accessToken) {
				const res = await createProduct({ token: session.accessToken, product })
				console.log(res);
				const data = res.data
				console.log(data);
				if (res.status === 201) {
					handleToastInfo({
						code: res.status,
						message: 'Se creo el Producto correctamente.'
					})
					router.push('/productos')
				}
			}
		} catch (err) {
			if (axios.isAxiosError(err)) {
				handleToastInfo({
					code: err.response ? err.response.status : 500,
					message: 'Hubo un error'
				})
			}
		} finally {
			handleOpenToast();
		}
	}

	return (
		<Formik
			initialValues={{
				name: '',
				code: '',
				type: {
					id: 0,
					name: '',
					description: '',
				},
				unit: {
					id: 0,
					name: '',
					description: '',
					abr: '',
				},
				state: false,
				description: '',
			}}
			onSubmit={(values) => {
				createData({
					type: values.type.id,
					unit: values.unit.id,
					name: values.name,
					code: values.code,
					description: values.description,
					state: values.state,
				})
			}}
			validationSchema={Yup.object({
				name: Yup.string()
					.max(15, 'Debe tener 15 o menos')
					.required('Requerido'),
				code: Yup.string()
					.required('Requerido'),
				type: Yup.object().shape({
					id: Yup.number()
						.notOneOf([0], 'No puede estar vacio')
						.required('Debe seleccionar un valor'),
				}),
				unit: Yup.object().shape({
					id: Yup.number()
						.notOneOf([0], 'No puede estar vacio')
						.required('Debe seleccionar un valor'),
				}),
				state: Yup.boolean()
			})}
		>
			{
				(forms) => (
					<Form>
						<Grid container spacing={2}>
							<Grid item xs={6}>
								<MyInput
									label="Nombre del Producto"
									name="name"
									type='text'
									placeholder='Nombre del Producto'
								/>
							</Grid>
							<Grid item xs={6}>
								<MyInput
									label="Código"
									name="code"
									type='text'
									placeholder='Código del Producto'
								/>
							</Grid>
							<Grid item xs={6}>
								<ProductTypeSelect
									label="Tipo"
									name="type"
									placeholder='Tipo de Producto'
								/>
							</Grid>
							<Grid item xs={6}>
								<ProductUnitSelect
									label="Unidad"
									name="unit"
									placeholder='Unidad de Producto'
								/>
							</Grid>

							<Grid item xs={12}>
								<MyInput
									label="Descripcion"
									name="description"
									multiline
									rows={4}
								/>
							</Grid>
							<Grid item xs={12}>
								<MyCheckbox
									label="Activar producto"
									name="state"
								/>
							</Grid>
							<Grid item xs={12}>
								<Box sx={{
									display: 'flex',
									justifyContent: 'end'
								}}
								>
									<Button
										variant="contained"
										type='submit'
									>
										Crear producto
									</Button>
								</Box>
							</Grid>
						</Grid>
					</Form>
				)
			}
		</Formik>
	)
}
