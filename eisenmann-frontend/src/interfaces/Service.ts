import { ClientDetail } from "./Client";
import { Pagination } from "./Pagination";

export interface ServiceBase {
	client: number;
	code: string;
	estimated_price: string;
	init_date: Date;
	end_date: Date;
	observations: string;
	name: string;
	state: boolean;
}

export interface Service extends ServiceBase {
	id: number;
	service_products: string;
	client_detail: ClientDetail;
	final_price: string;
}

export interface ServiceResponse extends Pagination {
	results: Service[]
}