
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { Table, TableBody, TableRow } from '@mui/material';
import {
	OrderedTableContainer,
	OrderedTableHead,
	OrderedTablePagination,
	OrderedTableRow,
	OrderedTableRowLoading,
	OrderedTableToolbar
} from '@/components/OrderedTable';
import { Service, ServiceResponse } from '@/interfaces/Service';
import { headCellsService } from 'src/data/headCells/headCellsService';
import { TableServiceRow } from './TableServiceRow';

interface Props {
	data: ServiceResponse;
}

export const TableService = ({ data }: Props) => {
	return (
		<OrderedTableContainer
			orderDefault='init_date'
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
							<OrderedTableToolbar name='Productos' />
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
								<OrderedTableHead<Service>
									order={order}
									orderBy={orderBy}
									onRequestSort={handleRequestSort}
									headCells={headCellsService}
								/>
								<TableBody>
									{

										data.results.map((row) => {
											const labelId = `enhanced-table-checkbox-${row.id}`;
											return (
												<OrderedTableRow
													key={row.id}
												>
													<TableServiceRow
														row={row}
														labelId={labelId}
													/>
												</OrderedTableRow>
											);
										})
									}
									{emptyRows > 0 && (
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
								isLoading={false}
							/>
						</>
					)
				}
			}
		</OrderedTableContainer>
	)
}
