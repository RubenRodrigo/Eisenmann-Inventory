export interface ClientDetail {
	id: number;
	document_type: number;
	name: string;
	identifier: string;
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