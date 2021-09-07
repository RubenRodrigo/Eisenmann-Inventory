import React, { useState } from 'react'
import Link from 'next/link'

import { CalendarIcon, ChevronDownIcon, HomeIcon, ShoppingCartIcon, TruckIcon, UserGroupIcon } from '@heroicons/react/outline'

export const Sidebar = () => {

	const [open, setOpen] = useState(false)

	return (
		<>
			<aside
				style={{ backgroundColor: '#242424' }}
				className="h-full pt-20 text-white w-52 fixed z-0"
			>
				<div className="py-2  h-full overflow-y-auto">
					<div className="link-container transition duration-200">
						<Link href="/">
							<a>
								<div className="flex p-3">
									<HomeIcon className="h-7 w-7" />
									<h3 className="pl-3">
										Home
									</h3>
								</div>
							</a>
						</Link>
					</div>
					<div className="link-container transition duration-200">
						<Link href="/services">
							<a>
								<div className="flex p-3">
									<CalendarIcon className="h-7 w-7" />
									<h3 className="pl-3">
										Servicios
									</h3>
								</div>
							</a>
						</Link>
					</div>
					<div className="link-container transition duration-200">
						<div
							className="flex p-3"
							onClick={() => setOpen(!open)}
						>
							<ShoppingCartIcon className="h-7 w-7" />
							<h3 className="pl-3">
								Productos
							</h3>
							<div className="flex-1 flex justify-end">
								<ChevronDownIcon className="w-5" />
							</div>
						</div>
					</div>
					{open &&
						<>
							<div className="link-container transition duration-200">
								<Link href="/product-stock">
									<a>
										<div className="flex pl-10 p-3">
											<h3 className="pl-3">
												Stock de Productos
											</h3>
										</div>
									</a>
								</Link>
							</div>
							<div className="link-container transition duration-200">
								<Link href="/products">
									<a>
										<div className="flex pl-10 p-3">
											<h3 className="pl-3">
												Productos
											</h3>
										</div>
									</a>
								</Link>
							</div>
							<div className="link-container transition duration-200">
								<Link href="/shop">
									<a>
										<div className="flex pl-10 p-3">
											<h3 className="pl-3">
												Compras
											</h3>
										</div>
									</a>
								</Link>
							</div>
						</>
					}
					<div className="link-container transition duration-200">
						<Link href="/clients">
							<a>
								<div className="flex p-3">
									<TruckIcon className="h-7 w-7" />
									<h3 className="pl-3">
										Clientes
									</h3>
								</div>
							</a>
						</Link>
					</div>
					<div className="link-container transition duration-200">
						<Link href="/empleados">
							<a>
								<div className="flex p-3">
									<UserGroupIcon className="h-7 w-7" />
									<h3 className="pl-3">
										Empleados
									</h3>
								</div>
							</a>
						</Link>
					</div>
					<div className="link-container transition duration-200">
						<Link href="/type">
							<a>
								<div className="flex p-3">
									<UserGroupIcon className="h-7 w-7" />
									<h3 className="pl-3">
										Tipos
									</h3>
								</div>
							</a>
						</Link>
					</div>
					<div className="link-container transition duration-200">
						<Link href="/unit">
							<a>
								<div className="flex p-3">
									<UserGroupIcon className="h-7 w-7" />
									<h3 className="pl-3">
										Unidades
									</h3>
								</div>
							</a>
						</Link>
					</div>
				</div>
			</aside>
			<style jsx>
				{
					`
					.link-container:hover {
						background-color: #919191;
					}
					.link-container-selected{
						background-color: #424242;
					}
					`
				}
			</style>
		</>
	)
}
