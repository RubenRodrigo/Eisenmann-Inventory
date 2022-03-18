import { MenuItem } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

import { ActionMenu } from '@/components/ActionMenu/ActionMenu'
import React, { useState } from 'react'
import { DialogCustom } from '@/components/Dialog/DialogCustom';
import { FormServiceProduct } from '../forms/FormServiceProduct';
import { useService } from '@/reducer/ServiceReducer/hooks/useService';
import { getSession, signOut } from 'next-auth/react';
import { createServiceProduct } from 'src/services/service-product';
import { ServiceProductBase } from '@/interfaces/ServiceProduct';
import { useLayout } from '@/hooks/useLayout';
import axios from 'axios';
import { deleteService } from 'src/services/service';
import { useRouter } from 'next/router';

export const ActionService = () => {


	const router = useRouter()
	const { handleOpenToast, handleToastInfo } = useLayout()
	const { service, addServiceProduct, updateSummaryValues } = useService()
	const [openDialogAddProduct, setOpenDialogAddProduct] = useState(false)

	const handleOpenDialogProduct = () => setOpenDialogAddProduct(true);
	const handleCloseDialogProduct = () => setOpenDialogAddProduct(false);

	const handleAddProductToService = async (values: ServiceProductBase) => {
		try {
			const session = await getSession()
			if (session && session.error) {
				signOut()
			}
			if (session) {
				const res = await createServiceProduct({ token: session.accessToken, serviceProduct: values })
				if (res.status === 201) {
					addServiceProduct(res.data)
					updateSummaryValues()
					handleToastInfo({
						code: res.status,
						message: 'Se agrego el producto correctamente.'
					})
				}
			}
		} catch (err) {
			if (axios.isAxiosError(err)) {
				handleToastInfo({
					code: err.response ? err.response.status : 500,
					message: err.response ? (err.response.status === 400 && err.response.data.quantity) : 'Hubo un error'
				})
			}
			console.log(err);
		} finally {
			handleOpenToast()
			handleCloseDialogProduct()
		}
	}

	const handleDeleteService = async () => {
		try {
			const session = await getSession()
			if (session && session.error) {
				signOut()
			}
			if (session) {
				const res = await deleteService({ token: session.accessToken, id: service.id })
				if (res.status === 204) {
					router.push('/servicios')
					handleToastInfo({
						code: res.status,
						message: 'Se elimino el servicio correctamente.'
					})
				}
			}
		} catch (err) {
			if (axios.isAxiosError(err)) {
				handleToastInfo({
					code: err.response ? err.response.status : 500,
					message: 'Hubo un error'
				})
			}
			console.log(err);
		} finally {
			handleOpenToast()
			handleCloseDialogProduct()
		}
	}

	return (
		<div>
			<DialogCustom
				title='Añadir Producto'
				open={openDialogAddProduct}
				handleClose={handleCloseDialogProduct}
				handleOpen={handleOpenDialogProduct}
			>
				<FormServiceProduct
					service={service}
					saveData={handleAddProductToService}
				/>
			</DialogCustom>
			<ActionMenu>
				{
					({ onClose }) => (
						<div>
							<MenuItem
								onClick={() => {
									handleOpenDialogProduct()
									onClose()
								}}
								disableRipple
							>
								<AddIcon />
								Añadir Producto
							</MenuItem>
							<MenuItem onClick={
								() => {
									onClose()
									handleDeleteService()
								}}
								disableRipple
							>
								<DeleteIcon />
								Eliminar Servicio
							</MenuItem>
						</div>
					)
				}
			</ActionMenu >
		</div>
	)
}
