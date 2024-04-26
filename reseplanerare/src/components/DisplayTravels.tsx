"use client";
import React, { useEffect, useState } from "react";
import { openDB } from "idb";
import TravelForm from "./TravelForm";
import { Travel } from "@/interface/travel";
import { FaStar, FaRegStar, FaEdit, FaTrashAlt } from "react-icons/fa"; // import star icons

const DisplayTravels = () => {
	const [travels, setTravels] = useState<Travel[]>([]);
	const [editingTravel, setEditingTravel] = useState<Travel | null>(null);
	const [isFavorited, setIsFavorited] = useState<boolean[]>(new Array(travels.length).fill(false));
	const [favorites, setFavorites] = useState<Travel[]>([]);

	useEffect(() => {
		fetchTravels();
		const storedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
		const newIsFavorited = travels.map((travel: Travel) =>
			storedFavorites.some((favorite: Travel) => favorite.destination === travel.destination)
		);
		setIsFavorited(newIsFavorited);
	}, [travels]);

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

		const index = favorites.findIndex((travel) => travel.destination === destination);
		if (index !== -1) {
			const newFavorites = [...favorites];
			newFavorites.splice(index, 1);
			setFavorites(newFavorites);
		}

		fetchTravels();
	};

	const handleUpdate = async (updatedTravel: Travel) => {
		const db = await openDB("myDB", 1);
		await db.put("travels", updatedTravel, updatedTravel.destination);
		setEditingTravel(null);
		fetchTravels();
	};

	// const handleFavorite = (travel: Travel, index: number) => {
	// 	const alreadyFavorited = favorites.some(
	// 		(favorite: Travel) => favorite.destination === travel.destination
	// 	);

	// 	if (alreadyFavorited) {
	// 		setFavorites(
	// 			favorites.filter((favorite: Travel) => favorite.destination !== travel.destination)
	// 		);
	// 	} else {
	// 		favorites.push(travel);
	// 	}

	// 	localStorage.setItem("favorites", JSON.stringify(favorites));

	// 	const newIsFavorited = [...isFavorited];
	// 	newIsFavorited[index] = !alreadyFavorited;
	// 	setIsFavorited(newIsFavorited);
	// };

	const handleFavorite = (travel: Travel, index: number) => {
		const alreadyFavorited = favorites.some(
			(favorite: Travel) => favorite.destination === travel.destination
		);

		if (alreadyFavorited) {
			setFavorites(
				favorites.filter((favorite: Travel) => favorite.destination !== travel.destination)
			);
		} else {
			setFavorites([...favorites, travel]);
		}

		localStorage.setItem("favorites", JSON.stringify(favorites));

		const newIsFavorited = [...isFavorited];
		newIsFavorited[index] = !alreadyFavorited;
		setIsFavorited(newIsFavorited);
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
					<div className='mt-4 flex gap-4 items-center'>
						<FaEdit
							className='cursor-pointer hover:text-green-500 transition-colors'
							onClick={() => handleEdit(travel)}
						/>
						<FaTrashAlt
							className='cursor-pointer hover:text-red-500 transition-colors'
							onClick={() => handleDelete(travel.destination)}
						/>
						{isFavorited[index] ? (
							<FaStar
								className='cursor-pointer text-yellow-300 hover:text-yellow-500 transition-colors'
								onClick={() => handleFavorite(travel, index)}
							/>
						) : (
							<FaRegStar
								className='cursor-pointer hover:text-yellow-500 transition-colors'
								onClick={() => handleFavorite(travel, index)}
							/>
						)}
					</div>
					{editingTravel?.destination === travel.destination && (
						<TravelForm initialTravel={editingTravel} onSubmit={handleUpdate} />
					)}
				</div>
			))}
		</div>
	);
};

export default DisplayTravels;
