import { IconButton, TableCell } from '@mui/material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import { ServiceProduct } from '@/interfaces/ServiceProduct'
import { dateToString } from '@/helpers/utils';

interface Props {
	row: ServiceProduct
}

export const ServiceProductRow = ({ row }: Props) => {
	return (
		<>
			<TableCell>{row.product_stock_detail.product_detail.name}</TableCell>
			<TableCell>{row.employee_detail.firts_name}</TableCell>
			<TableCell>{row.description}</TableCell>
			<TableCell align="right">{row.quantity}</TableCell>
			<TableCell align="right">{row.product_stock_detail.current_price}</TableCell>
			<TableCell align="right">{row.total_cost}</TableCell>
			<TableCell>{dateToString(row.created_at)}</TableCell>
			<TableCell align="center">
				<IconButton
					size="small"
				>
					<DeleteForeverIcon />
				</IconButton>
			</TableCell>
		</>
	)
}