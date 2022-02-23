// Data

// MUI
import { Box, TableRow } from '@mui/material';

// Interfaces
import { ProductEntry } from '@/interfaces/ProductEntry';
import { TableProductEntriesRow } from './TableProductEntriesRow';
import { SimpleTableContainer } from '@/components/SimpleTable/';
import { headCellsProductEntries } from 'src/data/headCells/headCellsProductStock';

interface Props {
	data: ProductEntry[];
}

export const TableProductEntries = ({ data }: Props) => {

	return (
		<Box sx={{ p: '2px 0px' }}>
			<SimpleTableContainer
				headCells={headCellsProductEntries}
			>
				{data && data.map((row) => (
					<TableRow
						key={row.id}
					>
						<TableProductEntriesRow row={row} />
					</TableRow>
				))}
			</SimpleTableContainer>
		</Box>
	)
}
