export interface UserProfile {
	user_id: number;
	first_name: string;
	last_name: string;
	date_joined: Date;
	email: string;
	username: string;
	is_staff: boolean;
	is_active: boolean;
	is_superuser: boolean;
}