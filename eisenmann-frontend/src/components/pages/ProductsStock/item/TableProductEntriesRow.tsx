import { IconButton, TableCell } from '@mui/material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import { ProductEntry } from '@/interfaces/ProductEntry';
import { dateToString } from '@/helpers/utils';
import { getSession } from 'next-auth/react';
import { deleteProductEntry } from 'src/services/product-entry';
import { useProductStock } from '@/reducer/ProductStockReducer/hooks/useProductStock';
import { DialogDelete } from '@/components/Dialog/DialogDelete';

interface Props {
	row: ProductEntry;
}

export const TableProductEntriesRow = ({ row }: Props) => {

	const { removeProductEntry, updateSummaryValues } = useProductStock()

	/**
	 * Delete a ProductEntry by ID and update ProductStockDetail.
	 */
	const handleDeleteProductEntry = async () => {
		try {
			const session = await getSession()
			if (session) {
				const res = await deleteProductEntry({ token: session.accessToken, id: row.id })
				if (res.status === 204) {
					removeProductEntry(row.id)
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
				<DialogDelete
					title='Eliminar Producto Stock'
					successAction={() => {
						handleDeleteProductEntry()
					}}
					openButton={
						(open, close) =>
							<IconButton
								size="small"
								onClick={open}
							>
								<DeleteForeverIcon />
							</IconButton>
					}
				/>
			</TableCell>
		</>
	)
}
