import { IconButton, TableCell } from '@mui/material'
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';

import { Service } from '@/interfaces/Service';
import { NextLinkComposed } from '@/components/Link';
import { StateButton } from '@/components/StateButton';

interface Props {
	row: Service;
	labelId: string;
	children?: JSX.Element
}

export const TableServiceRow = ({ row, labelId }: Props) => {
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
			<TableCell>{row.client_detail.name}</TableCell>
			<TableCell align='center'>
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
			<TableCell align="right">{row.estimated_price}</TableCell>
			<TableCell align="right">{row.init_date}</TableCell>
			<TableCell align="right">{row.end_date}</TableCell>
			<TableCell align="center">
				<IconButton
					component={NextLinkComposed}
					size="small"
					to={`/servicios/${row.id}`}
				>
					<ArrowForwardOutlinedIcon />
				</IconButton>
			</TableCell>
		</>
	)
}
