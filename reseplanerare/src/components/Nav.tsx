import React from "react";
import Link from "next/link";

const Nav = () => {
	return (
		<nav className='bg-gray-800 text-white p-4 rounded-b-lg'>
			<ul className='flex space-x-4'>
				<li>
					<Link href='/'>Home</Link>
				</li>
				<li>
					<Link href='/travels'>Travels</Link>
				</li>
				<li>
					<Link href='/favourites'>Favourites</Link>
				</li>
			</ul>
		</nav>
	);
};

export default Nav;
