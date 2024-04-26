"use client";
import React, { useEffect, useState } from "react";
import { openDB } from "idb";
import TravelForm from "./TravelForm";
import { Travel } from "@/interface/travel";

const DisplayTravels = () => {
	const [travels, setTravels] = useState<Travel[]>([]);
	const [editingTravel, setEditingTravel] = useState<Travel | null>(null);

	useEffect(() => {
		fetchTravels();
	}, []);

	const fetchTravels = async () => {
		const db = await openDB("myDB", 1);
		const allTravels: Travel[] = await db.getAll("travels");
		setTravels(allTravels);
	};

	const handleEdit = (travel: Travel) => {
		setEditingTravel(travel);
	};

	const handleDelete = async (destination: string) => {
		const db = await openDB("myDB", 1);
		await db.delete("travels", destination);
		fetchTravels();
	};

	const handleUpdate = async (updatedTravel: Travel) => {
		const db = await openDB("myDB", 1);
		await db.put("travels", updatedTravel, updatedTravel.destination);
		setEditingTravel(null);
		fetchTravels();
	};

	const handleFavorite = (travel: Travel) => {
		let favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
		if (!favorites.some((favorite: Travel) => favorite.destination === travel.destination)) {
			favorites.push(travel);
			localStorage.setItem("favorites", JSON.stringify(favorites));
		}
	};
	return (
		<div className='bg-gray-800 text-white p-4 rounded-lg max-w-3xl mx-auto'>
			{travels.map((travel, index) => (
				<div key={index} className='mb-4 last:mb-0 p-4 bg-gray-700 rounded-lg shadow-lg'>
					<h2 className='text-2xl font-bold mb-2 text-white'>{travel.destination}</h2>
					<p>
						<span className='font-semibold'>Start Point:</span> {travel.startPoint}
					</p>
					<p>
						<span className='font-semibold'>Start Date:</span> {travel.startDate}
					</p>
					<p>
						<span className='font-semibold'>End Date:</span> {travel.endDate}
					</p>
					<p className='font-semibold'>Activities:</p>
					<ul className='list-disc list-inside'>
						{travel.activities.map((activity, index) => (
							<li key={index}>{activity}</li>
						))}
					</ul>
					<div className='mt-4 flex gap-2'>
						<button
							className='py-1 px-3 bg-blue-500 text-white rounded hover:bg-blue-600'
							onClick={() => handleEdit(travel)}
						>
							Edit
						</button>
						<button
							className='py-1 px-3 bg-red-500 text-white rounded hover:bg-red-600'
							onClick={() => handleDelete(travel.destination)}
						>
							Delete
						</button>
						<button
							className='py-1 px-3 bg-green-500 text-white rounded hover:bg-green-600'
							onClick={() => handleFavorite(travel)}
						>
							Favorite
						</button>
					</div>
					{editingTravel === travel && (
						<TravelForm initialTravel={editingTravel} onSubmit={handleUpdate} />
					)}
				</div>
			))}
		</div>
	);
};

export default DisplayTravels;
