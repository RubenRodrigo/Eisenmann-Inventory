import { Product, ProductData } from '@/interfaces/Products';
import { Checkbox, TableRow } from '@mui/material'
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import React from 'react'

interface Props {
	isItemSelected: boolean;
	row: Product;
	handleClick: (event: React.MouseEvent<unknown>, id: number) => void;
	labelId: string;
}

const CustomTableRow = ({ isItemSelected, row, handleClick, labelId }: Props) => {
	return (
		<TableRow
			hover
			role="checkbox"
			aria-checked={isItemSelected}
			tabIndex={-1}
			selected={isItemSelected}
			sx={{

				[`& .${tableCellClasses.body}`]: {
					fontSize: 15
				}
			}}
		>
			<TableCell
				padding="checkbox"
			>
				<Checkbox
					onClick={(event) => handleClick(event, row.id)}
					color="primary"
					checked={isItemSelected}
					inputProps={{
						'aria-labelledby': labelId,
					}}
				/>
			</TableCell>
			<TableCell
				component="th"
				id={labelId}
				scope="row"
				padding="none"
				sx={{
					fontWeight: 'bold'
				}}
			>
				{row.name}
			</TableCell>
			<TableCell align="right">{row.created_at}</TableCell>
			<TableCell align="right">{row.total_price}</TableCell>
		</TableRow>
	)
}

export default CustomTableRow