import { StateButton } from '@/components/StateButton'
import { ProductStock } from '@/interfaces/ProductStock'
import { Button, IconButton, TableCell } from '@mui/material'
import React from 'react'
import { NextLinkComposed } from '../../Link'
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';

interface Props {
	row: ProductStock;
}

export const TableProductStockRow = ({ row }: Props) => {
	return (
		<>
			<TableCell >{row.created_at}</TableCell>
			<TableCell align="right">{row.init_stock}</TableCell>
			<TableCell align="right">{row.real_stock}</TableCell>
			<TableCell align="center">
				<StateButton
					state={row.state}
					buttonSx={{
						px: 1,
						py: 0.5
					}}
					textSx={{
						fontSize: 12,
					}}
				/>
			</TableCell>
			<TableCell align="right">{row.medium_stock}</TableCell>
			<TableCell align="right">{row.minium_stock}</TableCell>
			<TableCell align="right">{row.total_stock}</TableCell>
			<TableCell align="right">{row.total_price}</TableCell>
			<TableCell align="right">{row.difference_stock}</TableCell>
			<TableCell align="right">{row.current_price}</TableCell>
			<TableCell align="center">
				<IconButton
					component={NextLinkComposed}
					size="small"
					to={`/product_stock/${row.id}`}
				>
					<ArrowForwardOutlinedIcon />
				</IconButton>
			</TableCell>
		</>
	)
}
