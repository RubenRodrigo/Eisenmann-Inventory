// Mui
import Box from '@mui/material/Box';
import TableContainer from '@mui/material/TableContainer';
import { Table, TableBody, TableCell, TableRow } from '@mui/material';
// Interfaces
import { HeadCell } from '@/interfaces/TableInterface';
import { SimpleTableHead } from './SimpleTableHead';

interface Props<T> {
	emptyRows?: number;
	headCells: readonly HeadCell<T>[];
	children: JSX.Element | JSX.Element[] | undefined;
	toolbarComponent?: JSX.Element;
}

export const SimpleTableContainer = <T extends { id: number },>({ emptyRows, headCells, children, toolbarComponent }: Props<T>) => {
	return (
		<Box sx={{ width: '100%' }}>
			<TableContainer>
				{
					toolbarComponent && toolbarComponent
				}
				<Table sx={{ minWidth: 650 }} aria-label="simple table">
					<SimpleTableHead headCells={headCells} />
					<TableBody>
						{children}
						{
							emptyRows ?
								<TableRow
									style={{
										height: 53 * emptyRows,
									}}
								>
									<TableCell colSpan={headCells.length} sx={{
										borderBottom: 0
									}} />
								</TableRow>
								:
								<></>
						}
					</TableBody>
				</Table>
			</TableContainer>
		</Box >
	);
}