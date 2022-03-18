import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { Box, Button, Grid, TextField } from '@mui/material'
import { MyInput } from '@/components/Inputs/MyInput'
import { ServiceDetail } from '@/interfaces/Service'
import { SelectEmployee } from '@/components/CustomFields/SelectEmployee'
import { ServiceProductBase, ServiceProductFormValues } from '@/interfaces/ServiceProduct'
import { SelectProductStock } from '@/components/CustomFields/SelectProductStock'

const INITIAL_VALUES: ServiceProductFormValues = {
	employee: null,
	product_stock: null,
	description: '',
	quantity: 0
}

interface Props {
	service: ServiceDetail
	saveData: (values: ServiceProductBase) => void
}

export const FormServiceProduct = ({ service, saveData }: Props) => {
	return (
		<Formik
			initialValues={INITIAL_VALUES}
			onSubmit={(values) => {
				saveData({
					service: service.id,
					employee: values.employee?.id ?? 0,
					description: values.description,
					quantity: values.quantity,
					product_stock: values.product_stock?.id ?? 0
				});
			}}
			validationSchema={Yup.object({
				quantity: Yup.number()
					.required('Este campo no puede estar vacio'),
				product_stock: Yup.object()
					.required('Debe escoger un producto')
					.shape({
						id: Yup.number()
							.required('Requerido')
					})
					.nullable(),
				employee: Yup.object()
					.required('Debe escoger un empleado')
					.shape({
						id: Yup.number()
							.required('Requerido')
					})
					.nullable(),
			})}
		>
			{
				(forms) => (
					<Form>
						<Grid container spacing={2}>
							<Grid item xs={6}>
								<SelectEmployee
									label="Empleado"
									name="employee"
									placeholder='Empleado'
								/>
							</Grid>
							<Grid item xs={6}>
								<SelectProductStock
									label="Producto"
									name="product_stock"
									placeholder='Producto'
								/>
							</Grid>
							<Grid item xs={6}>
								<MyInput
									label="Cantidad"
									name="quantity"
									type='text'
									placeholder='Cantidad'
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
										Añadir producto
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