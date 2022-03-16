import { axiosInstanceServerSide } from "@/helpers/axiosInstance"

interface Props {
	token: string;
}

interface GetServiceListProps extends Props {
	queryParams?: string;
}
export const getServiceList = async ({ token, queryParams }: GetServiceListProps) => {

	return await axiosInstanceServerSide(token).get(
		'/service/service/' + (queryParams !== undefined ? queryParams : '')
	)
}