import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'

import { MenuItem } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

import { ActionMenu } from '@/components/ActionMenu/ActionMenu'
import { useState } from 'react';
import { DialogCustom } from '@/components/Dialog/DialogCustom';
import { FormCreateProductEntry } from './ProductEntry/FormCreateProductEntry';
import { deleteProductStock } from 'src/services/product-stock';

interface Props {
	productStockId: number
}

export const ActionProductStock = ({ productStockId }: Props) => {
	const [openDialog, setOpenDialog] = useState(false)
	const router = useRouter()

	const handleDelete = async (onClose: () => void) => {
		try {
			const session = await getSession()
			if (session) {
				const res = await deleteProductStock({ token: session.accessToken, id: productStockId })
				console.log(res);
				res.status === 204 && router.replace('/productos-stock')
			}
		} catch (e) {
			console.log(e);
		} finally {
			onClose()
		}
	}

	const handleOpenDialog = () => setOpenDialog(true);
	const handleCloseDialog = () => setOpenDialog(false);

	return (
		<div>
			<DialogCustom
				title='Añadir Entrada'
				open={openDialog}
				handleClose={handleCloseDialog}
				handleOpen={handleOpenDialog}
			>
				{
					<FormCreateProductEntry
						productStockId={productStockId}
					/>
				}
			</DialogCustom>
			<ActionMenu>
				{
					({ onClose }) => (
						<div>
							<MenuItem onClick={handleOpenDialog} disableRipple>
								<AddIcon />
								Añadir Entrada
							</MenuItem>
							<MenuItem onClick={() => handleDelete(onClose)} disableRipple>
								<DeleteIcon />
								Eliminar Producto Stock
							</MenuItem>
						</div>
					)
				}
			</ActionMenu>
		</div>
	)
}