
import { Box, CircularProgress, TableCell, TableRow } from '@mui/material'

interface Props {
	colSpan: number;
	size: number;
}
export const OrderedTableRowLoading = ({ colSpan, size }: Props) => {
	return (
		<TableRow>
			<TableCell colSpan={colSpan}>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'center'
					}}
				>
					<CircularProgress size={size} />
				</Box>
			</TableCell>
		</TableRow>
	)
}
