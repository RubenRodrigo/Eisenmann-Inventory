import { Pagination } from "./Pagination";
import { ProductType } from "./ProductType";
import { ProductUnit } from "./ProductUnit";

export interface ProductData {
	calories: number;
	carbs: number;
	fat: number;
	name: string;
	protein: number;
}

export interface Product {
	id: number;
	type: number;
	unit: number;
	code: string;
	name: string;
	description: string;
	created_at: Date;
	updated_at: Date;
	type_detail: ProductType;
	unit_detail: ProductUnit;
	total_stock: number;
	total_price: number;
}

export interface ProductResponse extends Pagination {
	results: Product[]
}