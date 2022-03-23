
export interface ClientBase {
	document_type: null | number;
	name: string;
	identifier: string;
}
export interface Client extends ClientBase {
	id: number;
	created_at: Date;
	updated_at: Date;
	total_services: string;
	document_type_detail: null | DocumentType;
}

export interface DocumentType {
	id: number;
	created_at: Date;
	updated_at: Date;
	name: string;
	description: string;
}

export interface ClientFormValues {
	document_type: null | DocumentType;
	name: string;
	identifier: string;
}

