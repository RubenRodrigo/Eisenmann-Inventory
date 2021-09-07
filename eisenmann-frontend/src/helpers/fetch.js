const baseUrl = process.env.NEXT_PUBLIC_api_url;

const fetchSinToken = (endpoint, data, method = 'GET') => {
	const url = `${baseUrl}/${endpoint}`;

	if (method === 'GET') {
		return fetch(url, { body: JSON.stringify(data) });
	} else {
		return fetch(url, {
			method,
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
	}
}

const fetchConToken = (endpoint, data, method = 'GET') => {

	const url = `${baseUrl}/${endpoint}`;
	const token = localStorage.getItem('token') || '';

	if (method === 'GET') {
		return fetch(url, {
			method,
			headers: {
				'x-token': token
			}
		});
	} else {
		return fetch(url, {
			method,
			headers: {
				'Content-Type': 'application/json',
				'x-token': token
			},
			body: JSON.stringify(data)
		})
	}

}

export {
	fetchSinToken,
	fetchConToken
}