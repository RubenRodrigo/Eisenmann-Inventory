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
import axios from 'axios';
import { useLayout } from '@/hooks/useLayout';

interface Props {
	productStockId: number
}

export const ActionProductStock = ({ productStockId }: Props) => {
	const { handleOpenToast, handleToastInfo } = useLayout()
	const [openDialogAddEntry, setOpenDialogAddEntry] = useState(false)
	const router = useRouter()

	/**
	 * Deletes a ProductStock by ID and returns to /productos-stock url.
	 * @param onClose function which will be executed at the end. 
	 */
	const handleDeleteProductStock = async (onClose: () => void) => {
		try {
			const session = await getSession()
			if (session) {
				const res = await deleteProductStock({ token: session.accessToken, id: productStockId })
				if (res.status === 204) {
					handleToastInfo({
						code: res.status,
						message: 'Se elimino el ProductoStock correctamente.'
					})
					router.replace('/productos-stock')
				}
			}
		} catch (err) {
			if (axios.isAxiosError(err)) {
				handleToastInfo({
					code: err.response ? err.response.status : 500,
					message: 'Hubo un error'
				})
			}
		} finally {
			onClose()
			handleOpenToast()
		}
	}

	const handleOpenDialog = () => setOpenDialogAddEntry(true);
	const handleCloseDialog = () => setOpenDialogAddEntry(false);

	return (
		<div>
			<DialogCustom
				title='Añadir Entrada'
				open={openDialogAddEntry}
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
							<MenuItem
								onClick={() => {
									handleOpenDialog()
									onClose()
								}}
								disableRipple
							>
								<AddIcon />
								Añadir Entrada
							</MenuItem>
							<MenuItem onClick={() => handleDeleteProductStock(onClose)} disableRipple>
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