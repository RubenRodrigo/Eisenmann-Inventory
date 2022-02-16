import { axiosInstanceServerSide } from "@/helpers/axiosInstance";

interface GetAccessTokenProps {
	credentials: {
		email: string;
		password: string;
	};
}

export const getAccessToken = async ({ credentials }: GetAccessTokenProps) => {
	return await axiosInstanceServerSide().post('/token/',
		{
			email: credentials.email,
			password: credentials.password,
		}
	)
}

interface GetRefreshTokenProps {
	refreshToken: string;
}

export const getRefreshToken = async ({ refreshToken }: GetRefreshTokenProps) => {
	return await axiosInstanceServerSide().post('/token/refresh/',
		{
			refresh: refreshToken,
		}
	)
}

