import { IconButton, TableCell } from '@mui/material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import { ServiceProduct } from '@/interfaces/ServiceProduct'
import { dateToString } from '@/helpers/utils';
import { useService } from '@/reducer/ServiceReducer/hooks/useService';
import { DialogDelete } from '@/components/Dialog/DialogDelete';

interface Props {
	row: ServiceProduct
}

export const ServiceProductRow = ({ row }: Props) => {

	const { removeServiceProduct } = useService()

	const handleDeleteServiceProduct = () => {
		removeServiceProduct(row.id)
	}

	return (
		<>
			<TableCell>{row.product_stock_detail?.product_detail?.name}</TableCell>
			<TableCell>{row.employee_detail.firts_name}</TableCell>
			<TableCell>{row.description}</TableCell>
			<TableCell align="right">{row.quantity}</TableCell>
			<TableCell align="right">{row.product_stock_detail?.current_price}</TableCell>
			<TableCell align="right">S/ {row.total_cost}</TableCell>
			<TableCell>{dateToString(row.created_at)}</TableCell>
			<TableCell align="center">
				<DialogDelete
					title='Eliminar Producto del servicio'
					successAction={handleDeleteServiceProduct}
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
			</TableCell>
		</>
	)
}