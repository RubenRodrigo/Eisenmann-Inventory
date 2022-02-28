import { IconButton, TableCell } from '@mui/material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import { ProductEntry } from '@/interfaces/ProductEntry';
import { dateToString } from '@/helpers/utils';
import { getSession } from 'next-auth/react';
import { deleteProductEntry } from 'src/services/product-entry';
import { useProductStock } from '@/reducer/ProductStockReducer/hooks/useProductStock';

interface Props {
	row: ProductEntry;
}

export const TableProductEntriesRow = ({ row }: Props) => {

	const { removeProductEntry, updateSummaryValues } = useProductStock()

	/**
	 * Delete a ProductEntry by ID and update ProductStockDetail.
	 */
	const handleDeleteProductStock = async (id: number) => {
		try {
			const session = await getSession()
			if (session) {
				const res = await deleteProductEntry({ token: session.accessToken, id })
				if (res.status === 204) {
					removeProductEntry(id)
					updateSummaryValues()
				}
			}
		} catch (e) {
			console.log(e);
		}
	}
	return (
		<>
			<TableCell>{row.description}</TableCell>
			<TableCell align="right">{row.init_stock}</TableCell>
			<TableCell align="right">{row.stock}</TableCell>
			<TableCell align="right">{row.unit_price}</TableCell>
			<TableCell align="right">{row.total_cost}</TableCell>
			<TableCell align="right">{dateToString(row.created_at)}</TableCell>
			<TableCell align="center">
				<IconButton
					size="small"
					onClick={() => handleDeleteProductStock(row.id)}
				>
					<DeleteForeverIcon />
				</IconButton>
			</TableCell>
		</>
	)
}
