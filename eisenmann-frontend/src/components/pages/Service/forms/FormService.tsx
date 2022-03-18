import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { format } from 'date-fns'

import { Box, Button, Grid } from '@mui/material'

import { MyInput } from '@/components/Inputs/MyInput'
import { MyCheckbox } from '@/components/Inputs/MyCheckbox'
import { MyDatePicker } from '@/components/Inputs/MyDatePicker'
import { SelectClient } from '@/components/CustomFields/SelectClient'
import { ServiceBase, ServiceFormValues } from '@/interfaces/Service'

type Props = {
	INITIAL_VALUES: ServiceFormValues
	saveData: (values: ServiceBase) => Promise<void>
}

export const FormService = ({ INITIAL_VALUES, saveData }: Props) => {

	return (
		<Formik
			initialValues={INITIAL_VALUES}
			onSubmit={(values) => {
				saveData({
					...values,
					init_date: format(values.init_date, 'yyyy-MM-dd'),
					end_date: format(values.end_date, 'yyyy-MM-dd'),
					client: values.client?.id ?? 0
				})
			}}
			validationSchema={Yup.object({
				client: Yup.object()
					.required('Debe escoger un cliente')
					.shape({
						id: Yup.number()
							.required('Requerido')
					})
					.nullable(),
				name: Yup.string()
					.required('El nombre es obligatorio'),
				estimated_price: Yup.number()
					.required('El precio estimado es obligatorio'),
				init_date: Yup.date()
					.required('Este campo no puede estar vacio'),
				end_date: Yup.date()
					.required('Este campo no puede estar vacio'),
			})}
		>
			{
				(forms) => (
					<Form>
						<Grid container spacing={2}>
							<Grid item xs={6}>
								<SelectClient
									label='Cliente'
									name="client"
									placeholder="Cliente"
								/>
							</Grid>
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
								<MyInput
									label="Observaciones"
									name="observations"
									multiline
									rows={4}
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
										Guardar Datos
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