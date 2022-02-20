import { axiosInstanceServerSide } from "@/helpers/axiosInstance";

interface GetUnitsListProps {
	token: string;
}

export const getUnitList = async ({ token }: GetUnitsListProps) => {
	return await axiosInstanceServerSide(token).get('/product/unit/')
}
