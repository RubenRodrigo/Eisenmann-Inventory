export interface ProductTypeBase {
	name: string;
	description: string;
}
export interface ProductType extends ProductTypeBase {
	id: number;
}