import { Pagination } from "./Pagination";
import { ProductStock } from "./ProductStock";
import { ProductType } from "./ProductType";
import { ProductUnit } from "./ProductUnit";

export interface ProductBase {
	type: number;
	unit: number;
	code: string;
	name: string;
	state: boolean;
	description: string;
}

export interface Product extends ProductBase {
	id: number;
	created_at: Date;
	updated_at: Date;
	type_detail?: ProductType;
	unit_detail?: ProductUnit;
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