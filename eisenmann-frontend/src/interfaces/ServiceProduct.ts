import { Employee } from "./Employee";
import { ProductStock } from "./ProductStock";

export interface ServiceProductBase {
	service: number;
	employee: number;
	description: string;
	quantity: number;
	product_stock: number;
}

export interface ServiceProduct extends ServiceProductBase {
	id: number;
	total_cost: number;
	current_price?: number;
	created_at: Date;
	updated_at: Date;
	product_stock_detail: ProductStock;
	employee_detail: Employee;
}

export interface ServiceProductFormValues {
	employee: null | Employee;
	product_stock: null | ProductStock;
	description: string;
	quantity: number;
}

