import { IconButton, TableCell } from '@mui/material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';

import { Employee, EmployeeBase } from '@/interfaces/Employee';
import { dateToString } from '@/helpers/utils';
import { useState } from 'react';
import { useEmployee } from '@/reducer/EmployeeReducer/hooks/useEmployee';
import { DialogCustom } from '@/components/Dialog/DialogCustom';
import { FormEmployee } from '../forms/FormEmployee';
import { DialogDelete } from '@/components/Dialog/DialogDelete';

interface Props {
	row: Employee;
}

export const EmployeeRow = ({ row }: Props) => {
	const { updateEmployee, removeEmployee } = useEmployee()
	const [openDialog, setOpenDialog] = useState(false);

	const handleOpenDialog = () => setOpenDialog(true);
	const handleCloseDialog = () => setOpenDialog(false);

	const handleUpdateEmployee = (value: EmployeeBase) => {
		updateEmployee(value, row.id)
			.then((res) => {
				handleCloseDialog()
			})
			.catch((err) => {
				console.log(err);
			})
	}

	const handleDeleteEmployee = () => {
		removeEmployee(row.id)
	}


	return (
		<>
			<DialogCustom
				title='Editar empleado'
				open={openDialog}
				handleClose={handleCloseDialog}
				handleOpen={handleOpenDialog}
			>
				{
					<FormEmployee
						INITIAL_VALUES={{
							firts_name: row.firts_name,
							last_name: row.last_name
						}}
						saveData={handleUpdateEmployee}
					/>
				}
			</DialogCustom>
			<TableCell>{row.firts_name}</TableCell>
			<TableCell>{row.last_name}</TableCell>
			<TableCell>{dateToString(row.created_at)}</TableCell>
			<TableCell align="center">
				<DialogDelete
					title='Eliminar Empleado'
					successAction={() => {
						handleDeleteEmployee()
					}}
					openButton={
						(open, close) =>
							<IconButton
								size="small"
								onClick={open}
							>
								<DeleteForeverIcon />
							</IconButton>
					}
				/>
				<IconButton
					size="small"
					onClick={handleOpenDialog}
				>
					<EditIcon />
				</IconButton>
			</TableCell>
		</>
	)
}
