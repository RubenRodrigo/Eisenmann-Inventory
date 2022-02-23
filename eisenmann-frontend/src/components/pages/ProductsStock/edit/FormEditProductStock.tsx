import { useContext } from 'react';
import { getSession, signOut } from 'next-auth/react';

import { Form, Formik } from 'formik';
import * as Yup from 'yup'

import { Box, Button, Grid } from '@mui/material';

import { ProductStockBaseEdit, ProductStockDetail } from '@/interfaces/ProductStock';
import { MyCheckbox } from '@/components/Inputs/MyCheckbox';
import { MyInput } from '@/components/Inputs/MyInput';
import { DialogContext } from '@/context/DialogContext';
import { editProductStock } from 'src/services/product-stock';

interface Props {
	productStock: ProductStockDetail
	setProductStock: (value: ProductStockDetail) => void
	handleOpenToast: () => void
}
export const FormEditProductStock = ({ setProductStock, productStock, handleOpenToast }: Props) => {

	const { handleClose } = useContext(DialogContext)

	const editData = async (value: ProductStockBaseEdit) => {
		try {
			const session = await getSession()
			if (session && session.error) {
				signOut()
			}
			if (session?.accessToken) {
				const res = await editProductStock({ token: session.accessToken, id: productStock.id, productStock: value })
				if (res.status === 200) {
					const data = res.data
					setProductStock(data)
				}
			}

		} catch (error) {
			console.log(error);
		} finally {
			handleClose();
			handleOpenToast();
		}
	}

	return (
		<Formik
			initialValues={{
				medium_stock: 0,
				minium_stock: 0,
				state: false,
			}}
			onSubmit={(values) => {
				editData({
					medium_stock: values.medium_stock,
					minium_stock: values.minium_stock,
					state: values.state,
				})
			}}
			validationSchema={Yup.object({
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
										Editar producto
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
