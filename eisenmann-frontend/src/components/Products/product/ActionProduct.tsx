import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'

import { MenuItem } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';

import { ActionMenu } from '@/components/ActionMenu/ActionMenu'
import { deleteProduct } from 'src/services/products'

interface Props {
	productId: number
}

export const ActionProduct = ({ productId }: Props) => {
	const router = useRouter()

	const handleOnClose = async (onClose: () => void) => {
		try {
			const session = await getSession()
			if (session) {
				const res = await deleteProduct({ token: session.accessToken, id: productId })
				console.log(res);
				res.status === 204 && router.replace('/productos')
			}
		} catch (e) {
			console.log(e);
		} finally {
			onClose()
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