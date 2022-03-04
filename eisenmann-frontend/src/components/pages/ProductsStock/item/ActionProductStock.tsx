import { getSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/router'

import { MenuItem } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

import { ActionMenu } from '@/components/ActionMenu/ActionMenu'
import { useState } from 'react';
import { DialogCustom } from '@/components/Dialog/DialogCustom';
import { createProductStockByReal, deleteProductStock, editProductRealStock } from 'src/services/product-stock';
import axios from 'axios';
import { useLayout } from '@/hooks/useLayout';
import { FormCreateProductEntry } from './ProductEntry/FormCreateProductEntry';
import { FormSetRealStock } from '../forms/realStock/FormSetRealStock';
import { useProductStock } from '@/reducer/ProductStockReducer/hooks/useProductStock';

export const ActionProductStock = () => {

	const { productStock, loadProductStock } = useProductStock()
	const { handleOpenToast, handleToastInfo } = useLayout()
	const [openDialogAddEntry, setOpenDialogAddEntry] = useState(false)
	const [openDialogSetReal, setOpenDialogSetReal] = useState(false)
	const router = useRouter()

	const handleOpenDialogEntry = () => setOpenDialogAddEntry(true);
	const handleCloseDialogEntry = () => setOpenDialogAddEntry(false);

	const handleOpenDialogReal = () => setOpenDialogSetReal(true);
	const handleCloseDialogReal = () => setOpenDialogSetReal(false);

	/**
	 * Deletes a ProductStock by ID and returns to /productos-stock url.
	 * @param onClose function which will be executed at the end. 
	 */
	const handleDeleteProductStock = async () => {
		try {
			const session = await getSession()
			if (session && session.error) {
				signOut()
			}
			if (session) {
				const res = await deleteProductStock({ token: session.accessToken, id: productStock.id })
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
			handleOpenToast()
		}
	}

	const handleSetRealStock = async (realStock: number, state: boolean) => {
		try {
			const session = await getSession()
			if (session && session.error) {
				signOut()
			}
			if (session?.accessToken) {
				const res = await editProductRealStock({ token: session.accessToken, id: productStock.id, realStock })
				if (res.status === 200) {
					const data = res.data
					loadProductStock(data)
					handleToastInfo({
						code: res.status,
						message: 'Se actualizo el Stock Real correctamente '
					})
					if (state) {
						const resRealStock = await createProductStockByReal({ token: session.accessToken, id: data.id })
						console.log(resRealStock.data)
					}
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
			handleOpenToast()
			handleCloseDialogReal()
		}
	}


	return (
		<div>
			<DialogCustom
				title='Añadir Entrada'
				open={openDialogAddEntry}
				handleClose={handleCloseDialogEntry}
				handleOpen={handleOpenDialogEntry}
			>
				<FormCreateProductEntry
					productStockId={productStock.id}
				/>
			</DialogCustom>
			<DialogCustom
				title='Ingresar Valor Real'
				open={openDialogSetReal}
				handleClose={handleCloseDialogReal}
				handleOpen={handleOpenDialogReal}
			>
				<FormSetRealStock
					realStock={productStock.real_stock}
					setRealStock={handleSetRealStock}
				/>
			</DialogCustom>
			<ActionMenu>
				{
					({ onClose }) => (
						<div>
							<MenuItem
								onClick={() => {
									handleOpenDialogReal()
									onClose()
								}}
								disableRipple
							>
								<AddIcon />
								Ingresar valor real
							</MenuItem>
							<MenuItem
								onClick={() => {
									handleOpenDialogEntry()
									onClose()
								}}
								disableRipple
							>
								<AddIcon />
								Añadir Entrada
							</MenuItem>
							<MenuItem onClick={
								() => {
									handleDeleteProductStock()
									onClose()
								}}
								disableRipple
							>
								<DeleteIcon />
								Eliminar Producto Stock
							</MenuItem>
						</div>
					)
				}
			</ActionMenu >
		</div >
	)
}