import { Order } from '@/interfaces/TableInterface';
import { MouseEvent, useState } from 'react';

export function useOrderTable<T>(orderByValue: keyof T) {
	const [order, setOrder] = useState<Order>('asc');
	const [orderBy, setOrderBy] = useState<keyof T>(orderByValue);

	// Order columns by given property
	const handleRequestSort = (
		event: MouseEvent<unknown>,
		property: keyof T,
	) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

	return {
		order,
		orderBy,
		handleRequestSort
	}

};
