import { ChangeEvent, MouseEvent } from "react";

export type Order = 'asc' | 'desc';

export interface HeadCell<T> {
	disablePadding: boolean;
	id: keyof T & string | 'actions';
	isAction?: boolean;
	isAllowed: boolean;
	label: string;
	numeric: boolean;
}

export interface TableContainerHandler<T> {
	emptyRows: number
	order: Order;
	orderBy: keyof T;
	handleRequestSort: (event: MouseEvent<unknown>, property: keyof T) => void; // Fields to sort
}