import { getSession, signOut } from 'next-auth/react';

import { Form, Formik } from 'formik';
import * as Yup from 'yup'

import { Box, Button, Grid } from '@mui/material';

import { ProductBase, ProductDetail } from '@/interfaces/Product';
import { MyCheckbox } from '@/components/Inputs/MyCheckbox';
import { MyInput } from '@/components/Inputs/MyInput';
import { ProductTypeSelect } from '../common/ProductTypeSelect';
import { ProductUnitSelect } from '../common/ProductUnitSelect';
import { editProduct } from 'src/services/products';
import { useContext } from 'react';
import { DialogContext } from '@/context/DialogContext';

interface Props {
	product: ProductDetail
	setProduct: (value: ProductDetail) => void
	handleOpenToast: () => void
}
export const FormEditProduct = ({ setProduct, product, handleOpenToast }: Props) => {

	const { handleClose } = useContext(DialogContext)

	const editData = async (value: ProductBase) => {
		try {
			const session = await getSession()
			if (session && session.error) {
				signOut()
			}
			if (session?.accessToken) {
				const res = await editProduct({ token: session.accessToken, id: product.id, product: value })
				if (res.status === 200) {
					const data = res.data
					setProduct(data)
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
				name: product.name,
				code: product.code,
				type: product.type_detail ? product.type_detail : {
					id: 0,
					name: '',
					description: '',
				},
				unit: product.unit_detail ? product.unit_detail : {
					id: 0,
					name: '',
					description: '',
					abr: '',
				},
				state: product.state,
				description: product.description,
			}}
			onSubmit={(values) => {
				editData({
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
