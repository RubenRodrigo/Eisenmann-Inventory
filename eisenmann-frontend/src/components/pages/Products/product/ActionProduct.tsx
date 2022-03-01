import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'

import { MenuItem } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';

import { ActionMenu } from '@/components/ActionMenu/ActionMenu'
import { deleteProduct } from 'src/services/products'
import { useLayout } from '@/hooks/useLayout';
import axios from 'axios';

interface Props {
	productId: number
}

export const ActionProduct = ({ productId }: Props) => {

	const { handleOpenToast, handleToastInfo } = useLayout()
	const router = useRouter()

	const handleOnClose = async (onClose: () => void) => {
		try {
			const session = await getSession()
			if (session) {
				const res = await deleteProduct({ token: session.accessToken, id: productId })
				console.log(res);
				if (res.status === 204) {
					handleToastInfo({
						code: res.status,
						message: 'Se elimino el Producto correctamente.'
					})
					router.replace('/productos')
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
			handleOpenToast();
		}
	}

	return (
		<ActionMenu>
			{
				({ onClose }) => (
					<MenuItem onClick={() => handleOnClose(onClose)} disableRipple>
						<DeleteIcon />
						Eliminar Producto
					</MenuItem>
				)
			}
		</ActionMenu>
	)
}