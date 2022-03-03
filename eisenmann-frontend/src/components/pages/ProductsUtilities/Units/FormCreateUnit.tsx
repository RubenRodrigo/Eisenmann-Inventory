import axios from 'axios';
import { getSession, signOut } from 'next-auth/react';

import { Form, Formik } from 'formik';
import * as Yup from 'yup'

import { Box, Button, Grid } from '@mui/material';

import { MyInput } from '@/components/Inputs/MyInput';
import { useLayout } from '@/hooks/useLayout';
import { useDialog } from '@/hooks/useDialog';
import { ProductUnitBase } from '@/interfaces/ProductUnit';
import { createProductUnit } from 'src/services/product-unit';
import { useProductUnitTable } from '@/reducer/ProductUnitTableReducer/hooks/useProductUnitTable';

export const FormCreateUnit = () => {

	const { addProductUnit } = useProductUnitTable()
	const { handleOpenToast, handleToastInfo } = useLayout()
	const { handleClose } = useDialog()

	const createData = async (productUnit: ProductUnitBase) => {
		try {
			const session = await getSession()
			if (session && session.error) {
				signOut()
			}
			if (session?.accessToken) {
				const res = await createProductUnit({ token: session.accessToken, productUnit })
				const data = res.data
				if (res.status === 201) {
					addProductUnit(data)
					handleToastInfo({
						code: res.status,
						message: 'Se creo la Unidad correctamente.'
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
			handleClose();
			handleOpenToast();
		}
	}

	return (
		<Formik
			initialValues={{
				name: '',
				description: '',
				abr: '',
			}}
			onSubmit={(values) => {
				createData({
					name: values.name,
					description: values.description,
					abr: values.abr
				})
			}}
			validationSchema={Yup.object({
				name: Yup.string()
					.required('Requerido')
			})}
		>
			{
				(forms) => (
					<Form>
						<Grid container spacing={2}>
							<Grid item xs={6}>
								<MyInput
									label="Unidad de Producto"
									name="name"
									type='text'
									placeholder='Unidad'
								/>
							</Grid>
							<Grid item xs={6}>
								<MyInput
									label="Abreviatura"
									name="abr"
									type='text'
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
								<Box sx={{
									display: 'flex',
									justifyContent: 'end'
								}}
								>
									<Button
										variant="contained"
										type='submit'
									>
										Crear Tipo
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
