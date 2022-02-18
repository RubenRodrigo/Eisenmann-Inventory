// React
import { useEffect, useRef } from 'react';
// NextJS
import { useRouter } from 'next/router';
// Mui
import { Box, Checkbox, TableHead, TableRow, TableSortLabel } from "@mui/material";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { alpha } from '@mui/material/styles';
import { visuallyHidden } from '@mui/utils';
// Interfaces
import { HeadCell, Order } from '@/interfaces/TableInterface';

// type ItemsMap<T> = { [key: string]: T }
interface Props<T> {
	headCells: readonly HeadCell<T>[]
	numSelected: number;
	order: Order;
	orderBy: keyof T;
	rowCount: number;
	onRequestSort: (event: React.MouseEvent<unknown>, property: keyof T) => void;
	onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const OrderedTableHead = <T extends object>(props: Props<T>) => {

	const router = useRouter();
	const isMounted = useRef(false)
	const {
		headCells,
		numSelected,
		order, orderBy,
		rowCount,
		onRequestSort,
		onSelectAllClick,
	} = props;

	const createSortHandler = (property: keyof T | 'actions') => (event: React.MouseEvent<unknown>) => {
		if (property !== 'actions') {
			onRequestSort(event, property);
		}
	};

	useEffect(() => {
		if (!isMounted.current) return
		let paramsObj = { ordering: `${order === 'asc' ? orderBy : '-' + orderBy}` };
		let searchParams = new URLSearchParams(paramsObj);

		router.push({
			pathname: router.pathname,
			query: {
				...router.query,
				ordering: searchParams.get('ordering'),
			}
		})
	}, [order, orderBy])

	useEffect(() => {
		isMounted.current = true
	}, [])


	return (
		<TableHead>
			<TableRow
				sx={(theme) => ({
					[`& .${tableCellClasses.head}`]: {
						backgroundColor: alpha(theme.palette.secondary.main, 0.15),
					},
					[`& .${tableCellClasses.head}:first-of-type`]: {
						borderRadius: '10px 0px 0px 0px',
					},
					[`& .${tableCellClasses.head}:last-of-type`]: {
						borderRadius: '0px 10px 0px 0px',
					},
				})}
			>
				<TableCell padding="checkbox">
					<Checkbox
						color="primary"
						indeterminate={numSelected > 0 && numSelected < rowCount}
						checked={rowCount > 0 && numSelected === rowCount}
						onChange={onSelectAllClick}
						inputProps={{
							'aria-label': 'select all desserts',
						}}
					/>
				</TableCell>
				{headCells.map((headCell) => (
					<TableCell
						key={headCell.id}
						align={headCell.isAction ? 'center' : headCell.numeric ? 'right' : 'left'}
						padding={headCell.disablePadding ? 'none' : 'normal'}
						sortDirection={orderBy === headCell.id ? order : false}
						sx={{
							fontWeight: 'bold',
							color: `${orderBy === headCell.id ? 'secondary.dark' : 'secondary.contrastText'}`
						}}
					>
						{
							headCell.isAllowed
								?
								<TableSortLabel
									active={orderBy === headCell.id}
									direction={orderBy === headCell.id ? order : 'asc'}
									onClick={createSortHandler(headCell.id)}
								>
									{headCell.label}
									{orderBy === headCell.id ? (
										<Box component="span" sx={visuallyHidden}>
											{order === 'desc' ? 'sorted descending' : 'sorted ascending'}
										</Box>
									) : null}
								</TableSortLabel>
								:
								headCell.label
						}
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}