import axios from 'axios';
import { getSession, signOut } from 'next-auth/react';

import { Form, Formik } from 'formik';
import * as Yup from 'yup'

import { Box, Button, Grid } from '@mui/material';

import { MyInput } from '@/components/Inputs/MyInput';
import { useLayout } from '@/hooks/useLayout';
import { ProductType, ProductTypeBase } from '@/interfaces/ProductType';
import { editProductType } from 'src/services/product-type';
import { useDialog } from '@/hooks/useDialog';
import { useProductTypeTable } from '@/reducer/ProductTypeTableReducer/hooks/useProductTypeTable';

interface Props {
	productType: ProductType
}

export const FormEditType = ({ productType }: Props) => {

	const { updateProductType } = useProductTypeTable()
	const { handleOpenToast, handleToastInfo } = useLayout()
	const { handleClose } = useDialog()

	const editData = async (value: ProductTypeBase) => {
		try {
			const session = await getSession()
			if (session && session.error) {
				signOut()
			}
			if (session?.accessToken) {
				const res = await editProductType({ token: session.accessToken, id: productType.id, productType: value })
				console.log(res);
				const data = res.data
				if (res.status === 200) {
					updateProductType(data)
					handleToastInfo({
						code: res.status,
						message: 'Se actualizo el Tipo correctamente.'
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
				name: productType.name,
				description: productType.description,
			}}
			onSubmit={(values) => {
				editData({
					name: values.name,
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
							<Grid item xs={12}>
								<MyInput
									label="Tipo de Producto"
									name="name"
									type='text'
									placeholder='Tipo'
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
