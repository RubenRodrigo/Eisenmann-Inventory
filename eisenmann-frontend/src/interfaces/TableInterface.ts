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
	selected: readonly number[];
	handleSelectAllClick: (target: ChangeEvent<HTMLInputElement>) => void; // Select all rows
	handleSelectOneClick: (event: MouseEvent<unknown>, id: number) => void; // Select only one row
	handleRequestSort: (event: MouseEvent<unknown>, property: keyof T) => void; // Fields to sort
	isSelected: (id: number) => boolean; // if row is selected 
}