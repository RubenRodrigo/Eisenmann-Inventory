import { IconButton, TableCell } from '@mui/material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';

import { Client, ClientBase } from '@/interfaces/Client'
import { dateToString } from '@/helpers/utils';
import { DialogCustom } from '@/components/Dialog/DialogCustom';
import { FormClient } from '../forms/FormClient';
import { useState } from 'react';
import { useClient } from '@/reducer/ClientReducer/hooks/useClient';
import { DialogDelete } from '@/components/Dialog/DialogDelete';

interface Props {
	row: Client;
}

export const ClientRow = ({ row }: Props) => {

	const { updateClient, removeClient } = useClient()
	const [openDialog, setOpenDialog] = useState(false);

	const handleOpenDialog = () => setOpenDialog(true);
	const handleCloseDialog = () => setOpenDialog(false);

	const handleUpdateClient = (value: ClientBase) => {
		updateClient(value, row.id)
			.then((res) => {
				handleCloseDialog()
			})
			.catch((err) => {
				console.log(err);
			})
	}

	const handleDeleteClient = () => {
		removeClient(row.id)
	}

	return (
		<>
			<DialogCustom
				title='Editar cliente'
				open={openDialog}
				handleClose={handleCloseDialog}
				handleOpen={handleOpenDialog}
			>
				{
					<FormClient
						INITIAL_VALUES={{
							document_type: row.document_type_detail,
							name: row.name,
							identifier: row.identifier
						}}
						saveData={handleUpdateClient}
					/>
				}
			</DialogCustom>
			<TableCell>{row.name}</TableCell>
			<TableCell>{row.document_type_detail?.name}</TableCell>
			<TableCell>{row.identifier}</TableCell>
			<TableCell>{dateToString(row.created_at)}</TableCell>
			<TableCell align="center">
				<DialogDelete
					title='Eliminar Cliente'
					successAction={() => {
						handleDeleteClient()
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
