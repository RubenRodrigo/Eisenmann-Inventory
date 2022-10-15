import { UserProfile } from "./User";

export interface TokenDec extends UserProfile {
	token_type: string;
	exp: number;
	iat: number;
	jti: string;
}

export interface TokenAPI {
	access: string;
	refresh: string;
}