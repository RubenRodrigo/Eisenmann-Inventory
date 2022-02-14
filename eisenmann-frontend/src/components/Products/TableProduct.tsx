import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { CustomTableToolbar } from '../Table/CustomTableToolbar';
import { HeadCell } from '@/interfaces/TableInterface';
import { CustomTableHead } from '../Table/CustomTableHead';
import { Product } from '@/interfaces/Products';
import CustomTableRow from '../Table/CustomTableRow';
import { useOrderTable } from '@/hooks/useOrderTable';
import { useSelectRowTable } from '@/hooks/useSelectRowTable';
import { ProductContext } from '@/context/ProductContext';
import { useContext } from 'react';
import { CustomTablePagination } from '../Table/CustomTablePagination';
import { CircularProgress } from '@mui/material';

interface Props {
	headCells: readonly HeadCell<Product>[];
}

export const TableProduct = ({ headCells }: Props) => {
	const { products: data, isLoading } = useContext(ProductContext)

	const { order, orderBy, handleRequestSort } = useOrderTable<Product>('created_at')
	const { selected, handleSelectAllClick, handleSelectOneClick, isSelected } = useSelectRowTable<Product>(data.results)

	// // Avoid a layout jump when reaching the last page with empty rows.
	const emptyRows =
		data.current - 1 > 0 ? Math.max(0, data.current * data.countItemsOnPage - data.count) : 0;


	return (
		<Box sx={{ width: '100%' }}>
			<CustomTableToolbar numSelected={selected.length} />
			<TableContainer>
				<Table
					sx={{
						minWidth: 750,
						[`& .${tableCellClasses.root}`]: {
							borderBottom: 0
						}
					}}
					aria-labelledby="tableTitle"
					size='medium'
				>
					<CustomTableHead
						numSelected={selected.length}
						order={order}
						orderBy={orderBy}
						onSelectAllClick={handleSelectAllClick}
						onRequestSort={handleRequestSort}
						rowCount={data.results.length}
						headCells={headCells}
					/>
					<TableBody>
						{
							isLoading
								?
								<TableRow>
									<TableCell colSpan={6}>
										<Box
											sx={{
												display: 'flex',
												justifyContent: 'center'
											}}
										>
											<CircularProgress size={80} />
										</Box>
									</TableCell>
								</TableRow>
								:
								data.results.map((row) => {
									const isItemSelected = isSelected(row.id);
									const labelId = `enhanced-table-checkbox-${row.id}`;
									return (
										<CustomTableRow
											key={row.id}
											isItemSelected={isItemSelected}
											labelId={labelId}
											row={row}
											handleClick={handleSelectOneClick}
										/>
									);
								})
						}
						{!isLoading && emptyRows > 0 && (
							<TableRow
								style={{
									height: 53 * emptyRows,
								}}
							>
								<TableCell colSpan={6} />
							</TableRow>
						)}
					</TableBody>
				</Table>
			</TableContainer>
			<CustomTablePagination />
		</Box>
	);
}