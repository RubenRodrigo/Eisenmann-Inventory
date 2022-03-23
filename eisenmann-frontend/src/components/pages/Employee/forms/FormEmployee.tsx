import { Form, Formik } from 'formik'
import * as Yup from 'yup'

import { Box, Button, Grid } from '@mui/material'

import { MyInput } from '@/components/Inputs/MyInput'
import { EmployeeBase, EmployeeFormValues } from '@/interfaces/Employee'

type Props = {
	INITIAL_VALUES: EmployeeFormValues
	saveData: (values: EmployeeBase) => void
}

export const FormEmployee = ({ INITIAL_VALUES, saveData }: Props) => {

	return (
		<Formik
			initialValues={INITIAL_VALUES}
			onSubmit={(values) => {
				saveData(values)
			}}
			validationSchema={Yup.object({
				firts_name: Yup.string()
					.required('El nombre es obligatorio'),
				last_name: Yup.string()
					.required('El apellido es obligatorio'),
			})}
		>
			{
				(forms) => (
					<Form>
						<Grid container spacing={2}>
							<Grid item xs={6}>
								<MyInput
									label="Nombre"
									name="firts_name"
									type='text'
									placeholder='Nombre del empleado'
								/>
							</Grid>
							<Grid item xs={6}>
								<MyInput
									label="Apellido"
									name="last_name"
									type='text'
									placeholder='Apellido del empleado'
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