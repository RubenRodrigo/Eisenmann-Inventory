// Data
import { headCellsProduct } from 'src/data/headCells/headCells';

// MUI
import { Table, TableBody, TableRow } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

// Components
import { CustomTableContainer } from '../Table/CustomTableContainer';
import { CustomTableHead } from '../Table/CustomTableHead';
import { CustomTablePagination } from '../Table/CustomTablePagination';
import { CustomTableRow } from '../Table/CustomTableRow';
import { CustomTableRowLoading } from '../Table/CustomTableRowLoading';
import { CustomTableToolbar } from '../Table/CustomTableToolbar';

// Interfaces
import { ProductResponse } from '@/interfaces/Products';
import { TableProductRow } from './TableProductRow';

interface Props {
	data: ProductResponse;
	isLoading: boolean,
}

export const TableProduct = ({ data, isLoading }: Props) => {
	return (
		<CustomTableContainer
			orderDefault='created_at'
			data={data}
		>
			{
				({
					emptyRows,
					order,
					orderBy,
					selected,
					handleSelectAllClick,
					handleSelectOneClick,
					handleRequestSort,
					isSelected,
				}) => {
					return (
						<>
							<CustomTableToolbar
								name='Productos'
								numSelected={selected.length}
							/>
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
									headCells={headCellsProduct}
								/>
								<TableBody>
									{
										isLoading
											?
											<CustomTableRowLoading colSpan={6} size={80} />
											:
											data.results.map((row) => {
												const isItemSelected = isSelected(row.id);
												const labelId = `enhanced-table-checkbox-${row.id}`;
												return (
													<CustomTableRow
														key={row.id}
														isItemSelected={isItemSelected}
													>
														<TableProductRow
															isItemSelected={isItemSelected}
															row={row}
															handleClick={handleSelectOneClick}
															labelId={labelId}
														/>
													</CustomTableRow>
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
							<CustomTablePagination
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
		</CustomTableContainer>
	)
}
