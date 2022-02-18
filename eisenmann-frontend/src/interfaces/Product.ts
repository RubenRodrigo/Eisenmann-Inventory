import { Pagination } from "./Pagination";
import { ProductStock } from "./ProductStock";
import { ProductType } from "./ProductType";
import { ProductUnit } from "./ProductUnit";

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
	state: boolean;
	summary?: ProductSummary
}

interface ProductSummary {
	total_stock: number;
	total_price: number;
}

export interface ProductResponse extends Pagination {
	results: Product[]
}
export interface ProductDetail extends Product {
	product_stock: ProductStock[]
}