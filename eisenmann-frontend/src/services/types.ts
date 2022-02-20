import { axiosInstanceServerSide } from "@/helpers/axiosInstance";

interface GetTypesListProps {
	token: string;
}

export const getTypeList = async ({ token }: GetTypesListProps) => {
	return await axiosInstanceServerSide(token).get('/product/type/')
}
