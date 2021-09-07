import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import logoImage from '../../../../public/images/Eisenmann-logo.png'

export const Navbar = () => {
	return (
		<nav
			style={{ backgroundColor: '#242424' }}
			className="w-full bg-black p-3 shadow-xl fixed top-0 z-10"
		>
			<div className="flex">
				<div className="flex-initial">
					<div className="w-60">
						<Image src={logoImage} alt="Eisenmann" objectFit="cover" />
					</div>
				</div>
				<div className="flex-1 flex justify-end">
					<div className="text-white flex justify-center text-lg">
						<div className="self-center mx-4">
							<Link href="/products">
								<a>Productos</a>
							</Link>
						</div>
						<div className="self-center mx-4">
							<Link href="/">
								<a>Index</a>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</nav>
	)
}
