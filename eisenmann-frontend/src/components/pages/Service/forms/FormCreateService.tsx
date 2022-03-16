import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { Box, Button, Grid } from '@mui/material'

import { MyInput } from '@/components/Inputs/MyInput'
import { ProductSelect } from '../../ProductsStock/common/ProductSelect'
import { MyCheckbox } from '@/components/Inputs/MyCheckbox'
import { MyDatePicker } from '@/components/Inputs/MyDatePicker'

type Props = {}

export const FormCreateService = (props: Props) => {
	return (
		<Formik
			initialValues={{
				// client: {
				// 	id: 0,
				// 	name: '',
				// },
				code: "150015",
				estimated_price: "5000",
				init_date: new Date(),
				end_date: new Date(),
				observations: "",
				name: "Corte en CNC",
				state: false,
			}}
			onSubmit={(values) => {
				console.log(values);

			}}
			validationSchema={Yup.object({
				// client: Yup.object().shape({
				// 	id: Yup.number()
				// 		.notOneOf([0], 'No puede estar vacio')
				// 		.required('Debe seleccionar un valor'),
				// }),
				name: Yup.string()
					.required('Este campo no puede estar vacio'),
				code: Yup.string()
					.required('Este campo no puede estar vacio'),
				estimated_price: Yup.number()
					.required('Este campo no puede estar vacio'),
				init_date: Yup.date()
					.required('Este campo no puede estar vacio'),
				end_date: Yup.date()
					.required('Este campo no puede estar vacio'),
				state: Yup.boolean()
					.required('Este campo no puede estar vacio'),
			})}
		>
			{
				(forms) => (
					<Form>
						<Grid container spacing={2}>
							{/* <Grid item xs={6}>
								<ProductSelect
									label="Producto"
									name="product"
									placeholder='Producto'
								/>
							</Grid> */}
							<Grid item xs={6}>
								<MyInput
									label="Nombre"
									name="name"
									type='text'
									placeholder='Nombre del servicio'
								/>
							</Grid>
							<Grid item xs={6}>
								<MyInput
									label="Codigo"
									name="code"
									type='text'
									placeholder='Stock mínimo'
								/>
							</Grid>
							<Grid item xs={6}>
								<MyInput
									label="Precio estimado"
									name="estimated_price"
									type='text'
									placeholder='Estimado'
								/>
							</Grid>
							<Grid item xs={6}>
								<MyDatePicker
									label="Fecha de inicio"
									name="init_date"
									value={forms.values.init_date}
								/>
							</Grid>
							<Grid item xs={6}>
								<MyDatePicker
									label="Fecha de Termino"
									name="end_date"
									value={forms.values.end_date}
								/>
							</Grid>
							<Grid item xs={12}>
								<MyCheckbox
									label="Activar servicio"
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