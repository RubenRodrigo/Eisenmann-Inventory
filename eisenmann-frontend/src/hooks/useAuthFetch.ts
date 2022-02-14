import { AxiosResponse } from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface Props<T> {
	getData: (params: T) => Promise<AxiosResponse<any, any>>
	params: T
}

interface ResponseState<P> {
	data: P | null;
	loading: boolean;
	error: string | null;
}

export const useAuthFetch = <T, P>({ getData, params }: Props<T>) => {

	const [state, setState] = useState<ResponseState<P>>({ data: null, loading: true, error: null })
	const { data: session, status } = useSession()

	const router = useRouter()

	useEffect(() => {
		if (status === 'authenticated') {
			if (session) {
				setState({ data: null, loading: true, error: null });
				if (session.error) {
					console.log('Error');
				} else {
					getData(params)
						.then((res) => {
							const data: P = res.data
							setState({
								loading: false,
								error: null,
								data
							})
						})
						.catch(err => {
							console.log(err);
							setState({
								loading: false,
								error: 'no se pudo cargar',
								data: null
							})
							console.log(err);
						})
				}
			}
			if (session === null) {
				router.push('/');
			}
		}
	}, [status, session, router, getData, params])

	return state
}
