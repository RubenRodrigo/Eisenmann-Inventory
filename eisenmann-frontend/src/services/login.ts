import { axiosInstanceServerSide } from "@/helpers/axiosInstance";

interface Props {
	token?: any;
	credentials: {
		email: string;
		password: string;
	};
}

export const getAccessToken = async ({ token, credentials }: Props) => {
	return await axiosInstanceServerSide(token).post('/token/',
		{
			email: credentials.email,
			password: credentials.password,
		}
	)
}

