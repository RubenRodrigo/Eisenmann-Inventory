import { ClientContext } from "@/context/ClientContext"
import { useContext } from "react"

export const useClient = () => {
	const { clientState, setLoadedClients, addClient, updateClient, removeClient } = useContext(ClientContext)
	const { clients } = clientState
	return {
		clients,
		setLoadedClients,
		addClient,
		updateClient,
		removeClient
	}
}
