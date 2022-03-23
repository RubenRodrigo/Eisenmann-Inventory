import { Form, Formik } from 'formik'
import * as Yup from 'yup'

import { Box, Button, Grid } from '@mui/material'

import { MyInput } from '@/components/Inputs/MyInput'
import { ClientBase, ClientFormValues } from '@/interfaces/Client'
import { SelectDocumentType } from '@/components/CustomFields/SelectDocumentType'

type Props = {
	INITIAL_VALUES: ClientFormValues
	saveData: (values: ClientBase) => void
}

export const FormClient = ({ INITIAL_VALUES, saveData }: Props) => {

	return (
		<Formik
			initialValues={INITIAL_VALUES}
			onSubmit={(values) => {
				saveData({
					...values,
					document_type: values.document_type?.id ?? null
				})
			}}
			validationSchema={Yup.object({
				document_type: Yup.object()
					.required('Debe escoger un documento')
					.shape({
						id: Yup.number()
							.required('Requerido')
					})
					.nullable(),
				name: Yup.string()
					.required('El nombre es obligatorio'),
			})}
		>
			{
				(forms) => (
					<Form>
						<Grid container spacing={2}>
							<Grid item xs={6}>
								<SelectDocumentType
									label='Documento'
									name="document_type"
									placeholder="Tipo de Documento"
								/>
							</Grid>
							<Grid item xs={6}>
								<MyInput
									label="Nombre"
									name="name"
									type='text'
									placeholder='Nombre del cliente'
								/>
							</Grid>
							<Grid item xs={6}>
								<MyInput
									label="Identificador"
									name="identifier"
									type='text'
									placeholder='Identificador'
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