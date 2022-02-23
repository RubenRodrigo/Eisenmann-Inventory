import { Pagination } from "./Pagination";
import { Product } from "./Product";
import { ProductEntry } from "./ProductEntry";

export interface ProductStockBase {
	product: number;
	state: boolean;
	medium_stock: number;
	minium_stock: number;
}

export type ProductStockBaseEdit = Omit<ProductStockBase, 'product'>

export interface ProductStock extends ProductStockBase {
	id: number;
	init_stock: number;
	real_stock: number;
	created_at: Date;
	updated_at: Date | null;
	total_stock: number;
	total_price: number;
	difference_stock: number;
	current_price: number;
	product_detail: Product
}

export interface ProductStockResponse extends Pagination {
	results: ProductStock[]
}

export interface ProductStockDetail extends ProductStock {
	product_entry: ProductEntry[]
}