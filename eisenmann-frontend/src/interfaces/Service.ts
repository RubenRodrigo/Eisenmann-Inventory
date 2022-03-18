import { Client } from "./Client";
import { Pagination } from "./Pagination";
import { ServiceProduct } from "./ServiceProduct";

export interface ServiceBase {
	client: number;
	code: string;
	estimated_price: string;
	init_date: string;
	end_date: string;
	observations: string;
	name: string;
	state: boolean;
}

export interface Service extends ServiceBase {
	id: number;
	client_detail: Client;
	final_price: number;
}

export interface ServiceDetail extends Service {
	service_product: ServiceProduct[];
}

export interface ServiceResponse extends Pagination {
	results: Service[]
}

export interface ServiceFormValues {
	client: null | Client;
	code: string;
	estimated_price: string;
	init_date: Date;
	end_date: Date;
	observations: string;
	name: string;
	state: boolean;
}
