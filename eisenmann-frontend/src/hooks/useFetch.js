import { useEffect, useRef, useState } from "react"

export const useFetch = (url) => {

	const isMounted = useRef(true)

	const [state, setState] = useState({ data: null, loading: true, error: null })

	useEffect(() => {
		return () => {
			console.log("Desmontando");
			isMounted.current = false
		}
	}, [])

	useEffect(() => {

		setState({
			loading: true,
			error: null,
			data: null
		})

		fetch(url)
			.then(resp => resp.json())
			.then(data => {
				if (isMounted.current) {
					setState({
						loading: false,
						error: null,
						data: data
					})
				} else {
					console.log("No se llamo el setState")
				}
			})

	}, [url])
	return state
}
