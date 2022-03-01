import { TableRow } from '@mui/material'
import { tableCellClasses } from '@mui/material/TableCell';

interface Props {
	children?: JSX.Element
}

export const OrderedTableRow = ({ children }: Props) => {
	return (
		<TableRow
			hover
			role="checkbox"
			tabIndex={-1}
			sx={{
				[`& .${tableCellClasses.body}`]: {
					fontSize: 15
				},
			}}
		>
			{children}
		</TableRow>
	)
}