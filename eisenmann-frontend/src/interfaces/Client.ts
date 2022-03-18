
export interface ClientBase {
	document_type: number;
	name: string;
	identifier: string;
}
export interface Client extends ClientBase {
	id: number;
	created_at: Date;
	updated_at: Date;
	total_services: string;
	document_type_detail: DocumentTypeDetail;
}

export interface DocumentTypeDetail {
	id: number;
	created_at: Date;
	updated_at: Date;
	name: string;
	description: string;
}