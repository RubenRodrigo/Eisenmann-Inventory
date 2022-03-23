import { axiosInstanceServerSide } from "@/helpers/axiosInstance"
import { ClientBase } from "@/interfaces/Client"

interface Props {
	token: string;
}

interface GetClientListProps extends Props {
	queryParams?: string;
}
export const getClientListService = async ({ token, queryParams }: GetClientListProps) => {
	return await axiosInstanceServerSide(token).get(
		'/client/client/' + (queryParams !== undefined ? queryParams : '')
	)
}

interface CreateClientProps extends Props {
	client: ClientBase;
}
export const createClientService = async ({ token, client }: CreateClientProps) => {
	return await axiosInstanceServerSide(token).post('/client/client/', {
		...client
	})
}

interface UpdateClientProps extends Props {
	id: number;
	client: ClientBase;
}
export const updateClientService = async ({ token, id, client }: UpdateClientProps) => {
	return await axiosInstanceServerSide(token).put(`/client/client/${id}/`, {
		...client
	})
}

interface DeleteClientProps extends Props {
	id: number;
}
export const deleteClientService = async ({ token, id }: DeleteClientProps) => {
	return await axiosInstanceServerSide(token).delete(`/client/client/${id}/`)
}