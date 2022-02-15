
import { Product } from '@/interfaces/Products'
import { Checkbox, TableCell } from '@mui/material'
import React from 'react'

interface Props {
	isItemSelected: boolean;
	row: Product;
	handleClick: (event: React.MouseEvent<unknown>, id: number) => void;
	labelId: string;
	children?: JSX.Element
}

export const TableProductRow = ({ isItemSelected, row, handleClick, labelId }: Props) => {
	return (
		<>
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
			<TableCell>{row.type_detail.name}</TableCell>
			<TableCell>{row.unit_detail.name}</TableCell>
			<TableCell align="right">{row.code}</TableCell>
			<TableCell align="right">{row.total_price}</TableCell>
			<TableCell align="right">{row.total_stock}</TableCell>
			<TableCell align="right">{row.created_at}</TableCell>
		</>
	)
}
