// Libraries
import axios from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { axiosInstanceServerSide } from "../../../helpers/axiosInstance";
import jwt from 'jsonwebtoken';


async function refreshAccessToken(token: any) {
  // console.log("10 - REFRESH", token);
  try {

    const now = Math.ceil(Date.now() / 1000);
    const response = await axiosInstanceServerSide().post('/token/',
      {
        refresh_token: token.refreshToken
      }
    );

    const refreshedTokens = response.data
    if (response.status !== 200) { throw refreshedTokens }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      token_expire: refreshedTokens.expires_in + now,
      token_type: refreshedTokens.token_type,
      scope: refreshedTokens.scope,
      refreshToken: refreshedTokens.refresh_token
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

export default NextAuth({
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
          const response = await axiosInstanceServerSide().post('/token/',
            {
              email: credentials.email,
              password: credentials.password,
            }
          )
          const user = response.data
          console.log(user);

          console.log('CREDENTIALS ACCESS TOKEN ----> ' + JSON.stringify(user.access, null, 2));

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
            console.log(response);
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
      // console.log('token', token);
      // console.log('account', account);
      // console.log('user', user);

      if (user && account) {
        const UserCredentials: any = user.data
        const dec: any = jwt.decode(UserCredentials.access, { complete: true });
        token.accessToken = UserCredentials.access
        token.refreshToken = UserCredentials.refresh
        token.accessTokenExpires = dec.payload.exp
        token.userId = dec.payload.user_id

        return token
      }

      return token
    },
    /*
    |--------------------------------------------------------------------------
    | Callback : Session
    |--------------------------------------------------------------------------
    */
    async session({ session, token }) {
      const dec: any = jwt.decode(token.accessToken as string, { complete: true });

      // Store Access Token to Session
      session.refreshToken = token.refreshToken
      session.accessToken = token.accessToken
      session.accessTokenExpires = token.accessTokenExpires

      session.user = {
        ...session.user,
        'id': token.userId as number
      }

      // console.log("180 - Session", token);

      if (token.error) {
        session.error = token.error
      }
      console.log(session);
      return session
    },
  },
  pages: {
    signIn: '/login'
  },
  secret: process.env.SECRET,
})
