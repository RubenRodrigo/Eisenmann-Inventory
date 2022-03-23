import { Box, Button, Paper } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';

import { Header } from '@/components/Header'
import { NextLinkComposed } from '@/components/Link';
import { EmployeeTable } from './tables/EmployeeTable';
import { DialogCustom } from '@/components/Dialog/DialogCustom';
import { FormEmployee } from './forms/FormEmployee';
import { useEmployee } from '@/reducer/EmployeeReducer/hooks/useEmployee';
import { useState } from 'react';
import { EmployeeBase, EmployeeFormValues } from '@/interfaces/Employee';

const INITIAL_VALUES: EmployeeFormValues = {
	firts_name: '',
	last_name: ''
}

export const EmployeeContainer = () => {

	const { addEmployee } = useEmployee()
	const [openDialog, setOpenDialog] = useState(false);

	const handleOpenDialog = () => setOpenDialog(true);
	const handleCloseDialog = () => setOpenDialog(false);

	const createEmployee = async (value: EmployeeBase) => {
		addEmployee(value)
			.then((res) => {
				handleCloseDialog()
			})
			.catch((err) => {
				console.log(err);
			})
	}

	return (
		<Box>
			<DialogCustom
				title='Crear empleado'
				open={openDialog}
				handleClose={handleCloseDialog}
				handleOpen={handleOpenDialog}
			>
				{
					<FormEmployee INITIAL_VALUES={INITIAL_VALUES} saveData={createEmployee} />
				}
			</DialogCustom>
			<Header title="Empleados">
				<Button
					variant="contained"
					startIcon={<AddIcon />}
					sx={{
						fontWeight: 'bold',
						textTransform: 'none',
						boxShadow: 0,
					}}
					onClick={handleOpenDialog}
				>Nuevo Empleado</Button>
			</Header>
			<Box>
				<Paper
					elevation={1}
					sx={{
						p: 2,
					}}
				>
					<EmployeeTable />
				</Paper>
			</Box>
		</Box>
	)
}
