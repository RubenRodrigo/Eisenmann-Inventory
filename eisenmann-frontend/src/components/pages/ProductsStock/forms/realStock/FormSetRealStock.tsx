import { Form, Formik } from 'formik';
import * as Yup from 'yup'

import { Box, Button, Grid } from '@mui/material';

import { MyInput } from '@/components/Inputs/MyInput';
import { MyCheckbox } from '@/components/Inputs/MyCheckbox';

interface Props {
	setRealStock: (realStock: number, state: boolean) => Promise<void>;
	realStock: number
}

export const FormSetRealStock = ({ realStock, setRealStock }: Props) => {

	return (
		<Formik
			initialValues={{
				realStock: realStock,
				state: true
			}}
			onSubmit={(values) => {
				setRealStock(values.realStock, values.state)
			}}
			validationSchema={Yup.object({
				realStock: Yup.number()
					.required('Este campo no puede estar vacio'),
			})}
		>
			{
				(forms) => (
					<Form>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<MyInput
									label="Stock Real"
									name="realStock"
									type='text'
									placeholder='Real'
								/>
							</Grid>
							<Grid item xs={12}>
								<MyCheckbox
									label="Crear un nuevo stock para el siguiente mes."
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
										Ingresar Stock Real
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
