// Mui
import Box from '@mui/material/Box';
import TableContainer from '@mui/material/TableContainer';
// Interfaces
import { Pagination } from '@/interfaces/Pagination';
import { TableContainerHandler } from '@/interfaces/TableInterface';
// Custom Hooks
import { useOrderTable } from '@/hooks/useOrderTable';
import { useSelectRowTable } from '@/hooks/useSelectRowTable';

interface Props<T> {
	orderDefault: keyof T;
	data: Data<T>;
	children?: (args: TableContainerHandler<T>) => JSX.Element
}
interface Data<T> extends Pagination {
	results: T[]
}

export const OrderedTableContainer = <T extends { id: number },>({ orderDefault, children, data }: Props<T>) => {

	const { order, orderBy, handleRequestSort } = useOrderTable<T>(orderDefault)
	// const { selected, handleSelectAllClick, handleSelectOneClick, isSelected } = useSelectRowTable<T>(data.results)

	// // Avoid a layout jump when reaching the last page with empty rows.
	const emptyRows =
		data.current - 1 > 0 ? Math.max(0, data.current * data.countItemsOnPage - data.count) : 0;

	return (
		<Box sx={{ width: '100%' }}>
			<TableContainer>
				{
					children && children(
						{
							emptyRows,
							order,
							orderBy,
							handleRequestSort,
						}
					)
				}
			</TableContainer>
		</Box>
	);
}