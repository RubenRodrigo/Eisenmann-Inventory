import { createContext } from "react";
import { TableContextProps } from "@/interfaces/TableInterface";

export function createTableContext<T extends object>() {
	return createContext<TableContextProps<T>>({} as TableContextProps<T>)
}