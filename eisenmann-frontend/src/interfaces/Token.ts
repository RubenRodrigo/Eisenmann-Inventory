export interface TokenDec {
	token_type: string;
	exp: number;
	iat: number;
	jti: string;
	user_id: number;
}

export interface TokenAPI {
	access: string;
	refresh: string;
}