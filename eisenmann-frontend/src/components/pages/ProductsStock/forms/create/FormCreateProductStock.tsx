import axios from 'axios';

import { getSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

import { Form, Formik } from 'formik';
import * as Yup from 'yup'

import { Box, Button, Grid } from '@mui/material';

import { MyCheckbox } from '@/components/Inputs/MyCheckbox';
import { MyInput } from '@/components/Inputs/MyInput';
import { ProductSelect } from '../../common/ProductSelect';
import { ProductStockBase } from '@/interfaces/ProductStock';
import { createProductStock } from 'src/services/product-stock';
import { useLayout } from '@/hooks/useLayout';

export const FormCreateProductStock = () => {

	const { handleOpenToast, handleToastInfo } = useLayout()
	const router = useRouter()

	const createData = async (productStock: ProductStockBase) => {
		try {
			const session = await getSession()
			if (session && session.error) {
				signOut()
			}
			if (session?.accessToken) {
				const res = await createProductStock({ token: session.accessToken, productStock })
				const data = res.data
				console.log(data);
				if (res.status === 201) {
					router.push('/productos-stock')
					handleToastInfo({
						code: res.status,
						message: 'El ProductStock se creo correctamente.'
					})
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
			handleOpenToast()
		}
	}

	return (
		<Formik
			initialValues={{
				product: {
					id: 0,
					name: '',
				},
				medium_stock: 0,
				minium_stock: 0,
				state: false,
			}}
			onSubmit={(values) => {
				createData({
					product: values.product.id,
					medium_stock: values.medium_stock,
					minium_stock: values.minium_stock,
					state: values.state,
				})
			}}
			validationSchema={Yup.object({
				product: Yup.object().shape({
					id: Yup.number()
						.notOneOf([0], 'No puede estar vacio')
						.required('Debe seleccionar un valor'),
				}),
				medium_stock: Yup.number()
					.required('Este campo no puede estar vacio'),
				minium_stock: Yup.number()
					.required('Este campo no puede estar vacio'),
				state: Yup.boolean()
			})}
		>
			{
				(forms) => (
					<Form>
						<Grid container spacing={2}>
							<Grid item xs={6}>
								<ProductSelect
									label="Producto"
									name="product"
									placeholder='Producto'
								/>
							</Grid>
							<Grid item xs={6}>
								<MyInput
									label="Stock mínimo permitido"
									name="minium_stock"
									type='text'
									placeholder='Stock mínimo'
								/>
							</Grid>
							<Grid item xs={6}>
								<MyInput
									label="Stock medio permitido"
									name="medium_stock"
									type='text'
									placeholder='Stock medio'
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
