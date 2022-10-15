import { JWT } from "next-auth/jwt"
import NextAuth from "next-auth"
import { TokenAPI, TokenDec } from "@/interfaces/Token"
import { UserProfile } from "@/interfaces/User"

declare module "next-auth" {
	/**
	 * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	 */
	interface Session {
		refreshToken: string;
		accessToken: string;
		accessTokenExpires: number;
		error?: string;
		user: UserProfile
	}
	interface User {
		status: string;
		data: TokenAPI
	}
}

declare module "next-auth/jwt" {
	/** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
	interface JWT extends TokenDec {
		/** OpenID ID Token */
		name?: string | null;
		email: string;
		picture?: string | null;
		sub?: string;
		refreshToken: string;
		accessToken: string;
		accessTokenExpires: number;
		error?: string;
		tokenType?: string
	}
}