"use client";
import { Travel } from "@/interface/travel";
import { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";

const Favorites = () => {
	const [favorites, setFavorites] = useState<Travel[]>([]);

	useEffect(() => {
		const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
		setFavorites(favorites);
	}, []);
	const handleRemove = (index: number) => {
		const newFavorites = [...favorites];
		newFavorites.splice(index, 1);
		localStorage.setItem("favorites", JSON.stringify(newFavorites));
		setFavorites(newFavorites);
	};

	return (
		<div className='bg-gray-800 text-white p-4 rounded-lg max-w-3xl mx-auto'>
			{favorites.length === 0 ? (
				<h1 className='text-center'>No favourites added</h1>
			) : (
				favorites.map((favorite, index) => (
					<article key={index} className='mb-4 last:mb-0 p-4 bg-gray-700 rounded-lg shadow-lg'>
						<h2 className='text-2xl font-bold mb-2 text-white'>{favorite.destination}</h2>
						<p>
							<span className='font-semibold'>Start Point:</span> {favorite.startPoint}
						</p>
						<p>
							<span className='font-semibold'>Start Date:</span> {favorite.startDate}
						</p>
						<p>
							<span className='font-semibold'>End Date:</span> {favorite.endDate}
						</p>
						<p className='font-semibold'>Activities:</p>
						<ul className='list-disc list-inside'>
							{favorite.activities.map((activity, index) => (
								<li key={index}>{activity}</li>
							))}
						</ul>

						<button onClick={() => handleRemove(index)} aria-label='Remove from favorites'>
							<FaTrashAlt className='cursor-pointer hover:text-red-500 transition-colors mt-4' />
						</button>
					</article>
				))
			)}
		</div>
	);
};

const page = ({}) => {
	return (
		<main>
			<h1 className='text-2xl font-bold text-center py-6'>My Favorites</h1>
			<Favorites />
		</main>
	);
};

export default page;
