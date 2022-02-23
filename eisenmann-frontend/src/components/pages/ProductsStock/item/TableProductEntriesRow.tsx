import { IconButton, TableCell } from '@mui/material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import { StateButton } from '@/components/StateButton'
import { ProductStock } from '@/interfaces/ProductStock'
import { NextLinkComposed } from '../../../Link'
import { ProductEntry } from '@/interfaces/ProductEntry';
interface Props {
	row: ProductEntry;
}

export const TableProductEntriesRow = ({ row }: Props) => {
	return (
		<>
			<TableCell>{row.description}</TableCell>
			<TableCell align="right">{row.init_stock}</TableCell>
			<TableCell align="right">{row.stock}</TableCell>
			<TableCell align="right">{row.unit_price}</TableCell>
			<TableCell align="right">{row.total_cost}</TableCell>
			<TableCell align="right">{row.created_at}</TableCell>
			<TableCell align="center">
				<IconButton size="small">
					<DeleteForeverIcon />
				</IconButton>
			</TableCell>
		</>
	)
}
