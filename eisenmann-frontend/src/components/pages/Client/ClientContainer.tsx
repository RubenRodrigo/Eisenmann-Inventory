import { useState } from 'react';
import { Box, Button, Paper } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';

import { Header } from '@/components/Header'
import { ClientTable } from './tables/ClientTable';
import { DialogCustom } from '@/components/Dialog/DialogCustom';
import { FormClient } from './forms/FormClient';
import { ClientBase, ClientFormValues } from '@/interfaces/Client';
import { useClient } from '@/reducer/ClientReducer/hooks/useClient';

const INITIAL_VALUES: ClientFormValues = {
	document_type: null,
	name: '',
	identifier: ''
}

export const ClientContainer = () => {

	const { addClient } = useClient()
	const [openDialog, setOpenDialog] = useState(false);

	const handleOpenDialog = () => setOpenDialog(true);
	const handleCloseDialog = () => setOpenDialog(false);

	const createClient = async (value: ClientBase) => {
		addClient(value)
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
				title='Crear cliente'
				open={openDialog}
				handleClose={handleCloseDialog}
				handleOpen={handleOpenDialog}
			>
				{
					<FormClient INITIAL_VALUES={INITIAL_VALUES} saveData={createClient} />
				}
			</DialogCustom>
			<Header title="Clientes">
				<Button
					variant="contained"
					startIcon={<AddIcon />}
					onClick={handleOpenDialog}
					sx={{
						fontWeight: 'bold',
						textTransform: 'none',
						boxShadow: 0,
					}}
				>Nuevo Cliente</Button>
			</Header>
			<Box>
				<Paper
					elevation={1}
					sx={{
						p: 2,
					}}
				>
					<ClientTable />
				</Paper>
			</Box>
		</Box>
	)
}
