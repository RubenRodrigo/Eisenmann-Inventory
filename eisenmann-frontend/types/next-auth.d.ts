import { JWT } from "next-auth/jwt"
import NextAuth from "next-auth"
import { TokenAPI, TokenDec } from "@/interfaces/Token"

declare module "next-auth" {
	/**
	 * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	 */
	interface Session {
		refreshToken: string;
		accessToken: string;
		accessTokenExpires: number;
		error?: string;
		user: {
			/** The user's postal address. */
			id: number
		}
	}
	interface User {

		id: string;
		name?: string | null;
		email?: string | null;
		image?: string | null;
		data: TokenAPI
	}
}

declare module "next-auth/jwt" {
	/** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
	interface JWT {
		/** OpenID ID Token */
		name?: string | null;
		email?: string | null;
		picture?: string | null;
		sub?: string;
		refreshToken: string;
		accessToken: string;
		accessTokenExpires: number;
		error?: string;
		tokenType?: string
	}
}