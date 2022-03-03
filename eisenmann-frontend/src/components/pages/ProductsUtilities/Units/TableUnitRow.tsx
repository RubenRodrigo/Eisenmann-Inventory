import { useState } from 'react';
import { getSession } from 'next-auth/react';

import { IconButton, TableCell } from '@mui/material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';

import { ProductUnit } from '@/interfaces/ProductUnit';
import { DialogCustom } from '@/components/Dialog/DialogCustom';
import { deleteProductUnit } from 'src/services/product-unit';
import { FormEditUnit } from './FormEditUnit';
import { useProductUnitTable } from '@/reducer/ProductUnitTableReducer/hooks/useProductUnitTable';

interface Props {
	row: ProductUnit;
}

export const TableUnitRow = ({ row }: Props) => {

	const { removeProductUnit } = useProductUnitTable()
	const [openDialog, setOpenDialog] = useState(false);

	const handleOpenDialog = () => setOpenDialog(true);
	const handleCloseDialog = () => setOpenDialog(false);

	/**
	 * Delete a ProductType by ID and update ProductUnit table.
	 */
	const handleDeleteProductUnit = async (id: number) => {
		try {
			const session = await getSession()
			if (session) {
				const res = await deleteProductUnit({ token: session.accessToken, id })
				if (res.status === 204) {
					removeProductUnit(id)
				}
			}
		} catch (e) {
			console.log(e);
		}
	}

	return (
		<>
			<DialogCustom
				title='Editar Unidad'
				open={openDialog}
				handleClose={handleCloseDialog}
				handleOpen={handleOpenDialog}
			>
				{
					row &&
					<FormEditUnit productUnit={row} />
				}
			</DialogCustom>
			<TableCell>{row.name}</TableCell>
			<TableCell>{row.description}</TableCell>
			<TableCell>{row.abr}</TableCell>
			<TableCell align="center">
				<IconButton
					size="small"
					onClick={() => handleDeleteProductUnit(row.id)}
				>
					<DeleteForeverIcon />
				</IconButton>
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
