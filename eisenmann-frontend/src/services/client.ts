import { axiosInstanceServerSide } from "@/helpers/axiosInstance"

interface Props {
	token: string;
}

interface GetClientListProps extends Props {
	queryParams?: string;
}
export const getClientList = async ({ token, queryParams }: GetClientListProps) => {

	return await axiosInstanceServerSide(token).get(
		'/client/client/' + (queryParams !== undefined ? queryParams : '')
	)
}