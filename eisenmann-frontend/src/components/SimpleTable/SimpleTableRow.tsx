import { TableRow } from '@mui/material'
import { tableCellClasses } from '@mui/material/TableCell';

interface Props {
	children?: JSX.Element
	isItemSelected: boolean;
}

export const SimpleTableRow = ({ children, isItemSelected }: Props) => {
	return (
		<TableRow
			hover
			role="checkbox"
			aria-checked={isItemSelected}
			tabIndex={-1}
			selected={isItemSelected}
		>
			{children}
		</TableRow>
	)
}