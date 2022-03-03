export interface ProductUnitBase {
	name: string;
	description: string;
	abr?: string;
}
export interface ProductUnit extends ProductUnitBase {
	id: number;
}