export interface ProductEntryBase {
	product_stock: number;
	stock: number;
	description: string;
	unit_price: number;
}

export interface ProductEntry extends ProductEntryBase {
	id: number;
	init_stock: number;
	created_at: Date;
	updated_at: Date;
	total_cost: string;
}
