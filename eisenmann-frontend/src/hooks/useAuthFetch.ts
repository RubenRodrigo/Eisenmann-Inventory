import { AxiosResponse } from "axios";
import { getSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";

interface GetDataFunctionProps {
	token: string;
	queryParams?: string
}
interface Props {
	getDataFunction: ({ token, queryParams }: GetDataFunctionProps) => Promise<AxiosResponse<any, any>>
}

export const useAuthFetch = <T,>({ getDataFunction }: Props) => {
	const [data, setData] = useState<T[]>([])
	const [isLoading, setIsLoading] = useState(false)

	// TODO: Create a Custom Hook which handles the state
	const getData = async () => {
		setIsLoading(true)
		try {
			const session = await getSession()
			if (session && session.error) {
				signOut()
			}
			if (session?.accessToken) {
				const res = await getDataFunction({ token: session.accessToken })
				const data: T[] = res.data
				setData(data)
			}

		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		getData()
	}, [])

	return {
		data,
		isLoading,
		setData
	}
}
