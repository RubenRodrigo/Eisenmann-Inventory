// Libraries
import axios from "axios";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import jwt from 'jsonwebtoken';
import { getAccessToken, getRefreshToken } from "src/services/auth";
import { TokenAPI, TokenDec } from "@/interfaces/Token";
import { JWT } from "next-auth/jwt";


async function refreshAccessToken(token: JWT): Promise<JWT> {
    try {
        const response = await getRefreshToken(
            {
                refreshToken: token.refreshToken
            }
        );

        const refreshedToken: TokenAPI = response.data
        if (response.status !== 200) { throw refreshedToken }


        const dec: any = jwt.decode(refreshedToken.access, { complete: true });
        const payload: TokenDec = dec.payload as TokenDec

        return {
            ...token,
            accessToken: refreshedToken.access,
            refreshToken: refreshedToken.refresh,
            accessTokenExpires: payload.exp,
            userId: payload.user_id,
            tokenType: payload.token_type
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const { response } = error
            console.log("REFRESH TOKEN FAILED", response?.data)
        }
        return {
            ...token, error: "RefreshAccessTokenError",
        }
    }
}


export const authOptions: NextAuthOptions = {
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials: any) {
                try {

                    const response = await getAccessToken(
                        {
                            credentials: {

                                email: credentials.email,
                                password: credentials.password,
                            }
                        }
                    )

                    const user = response.data
                    // console.log(user);
                    // console.log('CREDENTIALS ACCESS TOKEN ----> ' + JSON.stringify(user.access, null, 2));

                    if (user) {
                        return {
                            status: 'success',
                            data: user
                        }
                    }

                    return null

                } catch (error) {
                    if (axios.isAxiosError(error)) {
                        const { response } = error
                        const errorMessage = response?.data.detail

                        throw new Error(errorMessage + '&email=' + credentials.email)
                    } else {
                        throw new Error('Error inesperado')
                    }
                    // Redirecting to the login page with error messsage in the URL
                }
            }
        }),
    ],
    callbacks: {
        /*
        |--------------------------------------------------------------------------
        | Callback : JWT
        |--------------------------------------------------------------------------
        */
        async jwt({ token, account, user }) {
            // Persist the OAuth access_token to the token right after signin

            if (user && account) {
                const UserCredentials = user.data
                const dec = jwt.decode(UserCredentials.access, { complete: true });
                const payload: TokenDec = dec?.payload as TokenDec
                console.log(payload.exp);
                token = {
                    ...payload,
                    accessToken: UserCredentials.access,
                    refreshToken: UserCredentials.refresh,
                    accessTokenExpires: payload.exp
                }
                return token
            }
            const now = Math.ceil(Date.now() / 1000);
            // Return token with error if token has expired 
            if (now < token.accessTokenExpires) {
                console.log('VALID TOKEN');
                return token
            }

            console.log('REFRESHED TOKEN');
            return refreshAccessToken(token)
        },
        /*
        |--------------------------------------------------------------------------
        | Callback : Session
        |--------------------------------------------------------------------------
        */
        async session({ session, token }) {

            // Store Access Token to Session
            session.refreshToken = token.refreshToken
            session.accessToken = token.accessToken
            session.accessTokenExpires = token.accessTokenExpires

            session.user = {
                user_id: token.user_id,
                first_name: token.first_name,
                last_name: token.last_name,
                date_joined: token.date_joined,
                email: token.email,
                username: token.username,
                is_staff: token.is_staff,
                is_active: token.is_active,
                is_superuser: token.is_superuser,
            }

            // console.log("180 - Session", token);

            if (token.error) {
                session.error = token.error as string
            }
            console.log(session);

            return session
        },
    },
    pages: {
        signIn: '/auth/signin',
        error: '/auth/signin'
    },
    secret: process.env.SECRET,
}

export default NextAuth(authOptions)