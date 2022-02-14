
export interface Pagination {
	count: number;
	countItemsOnPage: number;
	total_pages: number;
	current: number;
	next: null | string;
	previous: null | string;
}