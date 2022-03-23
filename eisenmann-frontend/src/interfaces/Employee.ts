export interface EmployeeBase {
	firts_name: string;
	last_name: string;
}


export interface Employee extends EmployeeBase {
	id: number;
	created_at: Date;
	updated_at: Date;
}

export interface EmployeeFormValues {
	firts_name: string;
	last_name: string;
}
