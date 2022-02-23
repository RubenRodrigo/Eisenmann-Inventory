import { ParsedUrlQuery } from "querystring";

export function isArrayOfStrings(value: any): boolean {
	return Array.isArray(value) && value.every(item => typeof item === "string");
}
export const getQueryParams = (query: ParsedUrlQuery) => {
	let queryParams = '';

	if (query.page) queryParams = `page=${query.page}&`
	if (query.page_size) queryParams = `${queryParams}page_size=${query.page_size}&`
	if (query.ordering) queryParams = `${queryParams}ordering=${query.ordering}&`

	return queryParams;
}

export const dateToString = (date: Date) => {
	const newDate = new Date(date)
	const dateString = `${newDate.getFullYear()}/${newDate.getMonth() + 1}/${newDate.getDate()}`
	return dateString
}