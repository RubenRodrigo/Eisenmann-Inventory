import React from 'react'
import { Navbar } from './Navbar/Navbar'
import { Sidebar } from './Sidebar/Sidebar'

export const Layout = ({ children }) => {
	return (
		<div className="w-full h-screen">
			<Navbar />
			<div className="h-full">
				<Sidebar />
				<div className="bg-white pl-52">
					<div className="pt-20 h-full w-full">
						<div className="px-6 py-12 h-full">
							{children}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
