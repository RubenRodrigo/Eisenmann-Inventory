// Data

// MUI
import { Table, TableBody, TableRow } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

// Components
import {
	OrderedTableContainer,
	OrderedTableHead,
	OrderedTablePagination,
	OrderedTableRow,
	OrderedTableRowLoading,
	OrderedTableToolbar,
} from '../../OrderedTable'

// Interfaces
import { TableProductStockRow } from './TableProductStockRow';
import { ProductStock, ProductStockResponse } from '@/interfaces/ProductStock';
import { headCellsProductStock } from 'src/data/headCells/headCellsProductStock';
import { CalendarPicker } from './CalendarPicker';

interface Props {
	data: ProductStockResponse;
	isLoading: boolean;
	handleUpdateProduct: (productStock: ProductStock) => void;
}

export const TableProductStock = ({ handleUpdateProduct, data, isLoading }: Props) => {
	return (
		<OrderedTableContainer
			orderDefault='created_at'
			data={data}
		>
			{
				({
					emptyRows,
					order,
					orderBy,
					handleRequestSort,
				}) => {
					return (
						<>
							<OrderedTableToolbar
								name='Productos'
							>
								<CalendarPicker />
							</OrderedTableToolbar>
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
								<OrderedTableHead<ProductStock>
									order={order}
									orderBy={orderBy}
									onRequestSort={handleRequestSort}
									headCells={headCellsProductStock}
								/>
								<TableBody>
									{
										isLoading
											?
											<OrderedTableRowLoading colSpan={8} size={80} />
											:
											data.results.map((row) => {
												const labelId = `enhanced-table-checkbox-${row.id}`;
												return (
													<OrderedTableRow
														key={row.id}
													>
														<TableProductStockRow
															handleUpdateProduct={handleUpdateProduct}
															row={row}
															labelId={labelId}
														/>
													</OrderedTableRow>
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
							<OrderedTablePagination
								rowsPerPageOptions={[5, 10, 15]}
								count={data.count}
								rowsPerPage={data.countItemsOnPage}
								page={data.current - 1}
								isLoading={isLoading}
							/>
						</>
					)
				}
			}
		</OrderedTableContainer>
	)
}
