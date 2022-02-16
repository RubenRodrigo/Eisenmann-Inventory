export function isArrayOfStrings(value: any): boolean {
	return Array.isArray(value) && value.every(item => typeof item === "string");
}
