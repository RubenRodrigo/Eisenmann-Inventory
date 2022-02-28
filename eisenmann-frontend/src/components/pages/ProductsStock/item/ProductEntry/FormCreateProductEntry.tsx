import { useContext } from 'react';
import { getSession, signOut } from 'next-auth/react';

import { Form, Formik } from 'formik';
import * as Yup from 'yup'

import { Box, Button, Grid } from '@mui/material';

import { MyInput } from '@/components/Inputs/MyInput';
import { DialogContext } from '@/context/DialogContext';
import { ProductEntryBase } from '@/interfaces/ProductEntry';
import { createProductEntry } from 'src/services/product-entry';
import { useProductStock } from '@/reducer/ProductStockReducer/hooks/useProductStock';

interface Props {
	productStockId: number
}
export const FormCreateProductEntry = ({ productStockId }: Props) => {

	const { handleClose } = useContext(DialogContext)
	const { addProductEntry, updateSummaryValues } = useProductStock()

	const createData = async (value: ProductEntryBase) => {
		try {
			const session = await getSession()
			if (session && session.error) {
				signOut()
			}
			if (session?.accessToken) {
				const res = await createProductEntry({ token: session.accessToken, productEntry: value })
				if (res.status === 201) {
					const data = res.data
					addProductEntry(data)
					updateSummaryValues()
				}
			}

		} catch (error) {
			console.log(error);
		} finally {
			handleClose();
		}
	}

	return (
		<Formik
			initialValues={{
				stock: 0,
				unit_price: 0,
				description: '',
			}}
			onSubmit={(values) => {
				createData({
					product_stock: productStockId,
					stock: values.stock,
					unit_price: values.unit_price,
					description: values.description,
				})
			}}
			validationSchema={Yup.object({
				stock: Yup.number()
					.required('Este campo no puede estar vacio'),
				unit_price: Yup.number()
					.required('Este campo no puede estar vacio'),
			})}
		>
			{
				(forms) => (
					<Form>
						<Grid container spacing={2}>
							<Grid item xs={6}>
								<MyInput
									label="Stock"
									name="stock"
									type='text'
									placeholder='Stock'
								/>
							</Grid>
							<Grid item xs={6}>
								<MyInput
									label="Precio Unitario"
									name="unit_price"
									type='text'
									placeholder='Precio unitario'
								/>
							</Grid>
							<Grid item xs={12}>
								<MyInput
									label="Descripcion"
									name="description"
									multiline
									rows={3}
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
										Crear Entrada
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
