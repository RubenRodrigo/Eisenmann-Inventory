import { Product } from '@/interfaces/Product'
import { Button, Checkbox, TableCell } from '@mui/material'
import React from 'react'
import { NextLinkComposed } from '../Link'

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
			<TableCell align="right">{row.created_at}</TableCell>
			<TableCell align="center">
				<Button
					component={NextLinkComposed}
					to={`/productos/${row.id}`}
				>
					Ir
				</Button>
				<Button
					component={NextLinkComposed}
					to={`/productos/${row.id}/edit`}
				>
					Editar
				</Button>
			</TableCell>
		</>
	)
}
