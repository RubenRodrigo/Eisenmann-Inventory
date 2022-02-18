export interface ProductStock {
	id: number;
	product: number;
	init_stock: number;
	real_stock: number;
	state: boolean;
	medium_stock: number;
	minium_stock: number;
	created_at: Date;
	updated_at: Date | null;
	total_stock: number;
	total_price: number;
	difference_stock: number;
	current_price: number;
}
