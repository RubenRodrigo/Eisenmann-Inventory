// Data

// MUI
import { Box, TableRow } from '@mui/material';

// Interfaces
import { TableProductStockRow } from './TableProductStockRow';
import { ProductStock } from '@/interfaces/ProductStock';
import { SimpleTableContainer } from '@/components/SimpleTable/SimpleTableContainer';
import { headCellsProductProduct } from 'src/data/headCells/headCellsProductStock';

interface Props {
	data: ProductStock[];
}

export const TableProductStock = ({ data }: Props) => {

	// Avoid a layout jump when reaching the last page with empty rows.
	const emptyRows = data ? (Math.max(0, 10 - data.length)) : 0;

	return (
		<Box sx={{ p: '2px 0px' }}>
			<SimpleTableContainer
				headCells={headCellsProductProduct}
				emptyRows={emptyRows}
			>
				{data && data.map((row) => (
					<TableRow
						key={row.id}
					>
						<TableProductStockRow row={row} />
					</TableRow>
				))}
			</SimpleTableContainer>
		</Box>
	)
}
