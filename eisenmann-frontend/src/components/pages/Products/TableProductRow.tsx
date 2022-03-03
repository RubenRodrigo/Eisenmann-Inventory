import { Checkbox, IconButton, TableCell } from '@mui/material'
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';

import { Product } from '@/interfaces/Product'
import { NextLinkComposed } from '../../Link'
import { StateButton } from '@/components/StateButton';

interface Props {
	row: Product;
	labelId: string;
	children?: JSX.Element
}

export const TableProductRow = ({ row, labelId }: Props) => {
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
				{row.name}
			</TableCell>
			<TableCell>{row.type_detail?.name}</TableCell>
			<TableCell>{row.unit_detail?.name}</TableCell>
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
			<TableCell align="right">{row.code}</TableCell>
			<TableCell align="right">{row.created_at}</TableCell>
			<TableCell align="center">
				<IconButton
					component={NextLinkComposed}
					size="small"
					to={`/productos/${row.id}`}
				>
					<ArrowForwardOutlinedIcon />
				</IconButton>
			</TableCell>
		</>
	)
}
