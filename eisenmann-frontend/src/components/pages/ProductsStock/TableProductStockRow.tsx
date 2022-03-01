import { Checkbox, IconButton, TableCell } from '@mui/material'
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';

import { NextLinkComposed } from '../../Link'
import { ProductStock } from '@/interfaces/ProductStock';
import { StateButton } from '@/components/StateButton';
import { dateToString } from '@/helpers/utils';

interface Props {
	row: ProductStock;
	labelId: string;
	children?: JSX.Element
}

export const TableProductStockRow = ({ row, labelId }: Props) => {
	return (
		<>
			<TableCell
				component="th"
				id={labelId}
				scope="row"
				sx={{
					fontWeight: 'bold'
				}}
			>
				{row.product_detail.name}
			</TableCell>
			<TableCell>{dateToString(row.created_at)}</TableCell>
			<TableCell >
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
			<TableCell align="right">{row.total_stock ?? 0}</TableCell>
			<TableCell align="right">{row.current_price ?? 0}</TableCell>
			<TableCell align="right">{row.real_stock ?? 0}</TableCell>
			<TableCell align="right">{row.difference_stock ?? 0}</TableCell>
			<TableCell align="center">
				<IconButton
					component={NextLinkComposed}
					size="small"
					to={`/productos-stock/${row.id}`}
				>
					<ArrowForwardOutlinedIcon />
				</IconButton>
			</TableCell>
		</>
	)
}
