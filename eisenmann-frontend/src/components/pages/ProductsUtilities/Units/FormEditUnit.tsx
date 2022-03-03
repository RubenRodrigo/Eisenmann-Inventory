import axios from 'axios';
import { getSession, signOut } from 'next-auth/react';

import { Form, Formik } from 'formik';
import * as Yup from 'yup'

import { Box, Button, Grid } from '@mui/material';

import { MyInput } from '@/components/Inputs/MyInput';
import { useLayout } from '@/hooks/useLayout';
import { ProductUnit, ProductUnitBase } from '@/interfaces/ProductUnit';
import { createProductUnit, editProductUnit } from 'src/services/product-unit';
import { useDialog } from '@/hooks/useDialog';
import { useProductUnitTable } from '@/reducer/ProductUnitTableReducer/hooks/useProductUnitTable';

interface Props {
	productUnit: ProductUnit
}

export const FormEditUnit = ({ productUnit }: Props) => {

	const { updateProductUnit } = useProductUnitTable()
	const { handleOpenToast, handleToastInfo } = useLayout()
	const { handleClose } = useDialog()

	const editData = async (value: ProductUnitBase) => {
		try {
			const session = await getSession()
			if (session && session.error) {
				signOut()
			}
			if (session?.accessToken) {
				const res = await editProductUnit({ token: session.accessToken, id: productUnit.id, productUnit: value })
				const data = res.data
				if (res.status === 200) {
					updateProductUnit(data)
					handleToastInfo({
						code: res.status,
						message: 'Se actualizo la Unidad correctamente.'
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
				name: productUnit.name,
				abr: productUnit.abr,
				description: productUnit.description,
			}}
			onSubmit={(values) => {
				editData({
					name: values.name,
					abr: values.abr,
					description: values.description,
				})
			}}
			validationSchema={Yup.object({
				name: Yup.string()
					.required('Requerido'),
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
										Actualizar Tipo
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
