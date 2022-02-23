import { Checkbox, IconButton, TableCell } from '@mui/material'
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';

import { NextLinkComposed } from '../../Link'
import { ProductStock } from '@/interfaces/ProductStock';
import { StateButton } from '@/components/StateButton';
import { dateToString } from '@/helpers/utils';

interface Props {
	isItemSelected: boolean;
	row: ProductStock;
	handleClick: (event: React.MouseEvent<unknown>, id: number) => void;
	labelId: string;
	children?: JSX.Element
}

export const TableProductStockRow = ({ isItemSelected, row, handleClick, labelId }: Props) => {
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
			<TableCell align="right">{row.total_stock}</TableCell>
			<TableCell align="right">{row.current_price}</TableCell>
			<TableCell align="right">{row.real_stock}</TableCell>
			<TableCell align="right">{row.difference_stock}</TableCell>
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
