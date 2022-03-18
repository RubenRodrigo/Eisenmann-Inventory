import { axiosInstanceServerSide } from "@/helpers/axiosInstance"

interface Props {
	token: string;
}

interface GetEmployeeListProps extends Props {
	queryParams?: string;
}
export const getEmployeeList = async ({ token, queryParams }: GetEmployeeListProps) => {
	return await axiosInstanceServerSide(token).get(
		'/employee/employee/' + (queryParams !== undefined ? queryParams : '')
	)
}