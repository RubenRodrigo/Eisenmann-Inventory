import { ChangeEvent, MouseEvent } from "react";
import { ProductResponse } from "./Products";

export type Order = 'asc' | 'desc';

export interface HeadCell<T> {
	disablePadding: boolean;
	id: keyof T & string | 'actions';
	label: string;
	numeric: boolean;
	isAllowed: boolean;
}

export interface ProductContextProps {
	products: ProductResponse;
	setProducts: (data: ProductResponse) => void;
	isLoading: boolean
}


export interface TableContextProps<T> {
	order: string;
	orderBy: string;
	handleRequestSort: (event: MouseEvent<unknown>, property: keyof T) => void;
	selected: readonly number[];
	handleSelectAllClick: (target: ChangeEvent<HTMLInputElement>) => void;
	handleSelectOneClick: (event: MouseEvent<unknown>, id: number) => void;
	isSelected: (id: number) => boolean;
	emptyRows: number
}

export interface TableContainerHandler<T> {
	handleRequestSort: (event: MouseEvent<unknown>, property: keyof T) => void;
	selected: readonly number[];
	handleSelectAllClick: (target: ChangeEvent<HTMLInputElement>) => void;
	handleSelectOneClick: (event: MouseEvent<unknown>, id: number) => void;
	isSelected: (id: number) => boolean;
	emptyRows: number
}