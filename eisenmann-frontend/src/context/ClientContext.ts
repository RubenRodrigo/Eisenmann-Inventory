import { createContext } from "react";

import { Client, ClientBase } from "@/interfaces/Client";
import { ClientState } from "@/reducer/ClientReducer/interfaces/interfaces";

type ClientContextProps = {
	clientState: ClientState
	setLoadedClients: (value: Client[]) => void
	addClient: (value: ClientBase) => Promise<void>
	updateClient: (value: ClientBase, id: number) => Promise<void>
	removeClient: (id: number) => Promise<void>
}

export const ClientContext = createContext<ClientContextProps>({} as ClientContextProps);