import { axiosInstanceServerSide } from "@/helpers/axiosInstance"

interface Props {
	token: string;
}

interface GetDocumentTypeListProps extends Props {
	queryParams?: string;
}
export const getDocumentTypeList = async ({ token, queryParams }: GetDocumentTypeListProps) => {

	return await axiosInstanceServerSide(token).get(
		'/client/document_type/' + (queryParams !== undefined ? queryParams : '')
	)
}