import { IconButton, TableCell } from '@mui/material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';

import { getSession } from 'next-auth/react';
import { ProductType } from '@/interfaces/ProductType';
import { deleteProductType } from 'src/services/product-type';
import { DialogCustom } from '@/components/Dialog/DialogCustom';
import { FormEditType } from './FormEditType';
import { useState } from 'react';
import { useProductTypeTable } from '@/reducer/ProductTypeTableReducer/hooks/useProductTypeTable';
import { DialogDelete } from '@/components/Dialog/DialogDelete';

interface Props {
	row: ProductType;
}

export const TableTypeRow = ({ row }: Props) => {

	const { removeProductType } = useProductTypeTable()
	const [openDialog, setOpenDialog] = useState(false);

	const handleOpenDialog = () => setOpenDialog(true);
	const handleCloseDialog = () => setOpenDialog(false);

	/**
	 * Delete a ProductType by ID and update ProductType table.
	 */
	const handleDeleteProductType = async (id: number) => {
		try {
			const session = await getSession()
			if (session) {
				const res = await deleteProductType({ token: session.accessToken, id })
				if (res.status === 204) {
					removeProductType(id)
				}
			}
		} catch (e) {
			console.log(e);
		}
	}

	return (
		<>
			<DialogCustom
				title='Editar Tipo'
				open={openDialog}
				handleClose={handleCloseDialog}
				handleOpen={handleOpenDialog}
			>
				{
					row &&
					<FormEditType productType={row} />
				}
			</DialogCustom>
			<TableCell>{row.name}</TableCell>
			<TableCell>{row.description}</TableCell>
			<TableCell align="center">
				<DialogDelete
					title='Eliminar Tipo de Producto'
					successAction={() => {
						handleDeleteProductType(row.id)
					}}
					openButton={
						(open, close) =>
							<IconButton
								size="small"
								onClick={open}
								disableRipple
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
