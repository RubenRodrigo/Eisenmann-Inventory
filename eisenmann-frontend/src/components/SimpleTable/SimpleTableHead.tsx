// Mui
import { Box, Checkbox, TableHead, TableRow, TableSortLabel } from "@mui/material";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { alpha } from '@mui/material/styles';
import { visuallyHidden } from '@mui/utils';
// Interfaces
import { HeadCell } from '@/interfaces/TableInterface';

interface Props<T> {
	headCells: readonly HeadCell<T>[]
}

export const SimpleTableHead = <T,>(props: Props<T>) => {

	const {
		headCells,
	} = props;

	return (
		<TableHead>
			<TableRow>
				{headCells.map((headCell) => (
					<TableCell
						key={headCell.id}
						align={headCell.isAction ? 'center' : headCell.numeric ? 'right' : 'left'}
						padding={headCell.disablePadding ? 'none' : 'normal'}
					>
						{headCell.label}
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}