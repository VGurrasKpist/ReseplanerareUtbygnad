"use client";
import React, { FC, useState } from "react";
import { openDB } from "idb";

interface AddTravelFormProps {}

const AddTravelForm: FC<AddTravelFormProps> = ({}) => {
	const [activities, setActivities] = useState<string[]>([""]);
	const [destination, setDestination] = useState("");
	const [startPoint, setStartPoint] = useState("");
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");

	const addActivity = () => {
		setActivities([...activities, ""]);
	};

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		const db = await openDB("myDB", 1, {
			upgrade(db) {
				db.createObjectStore("travels");
			},
		});
		await db.put(
			"travels",
			{ destination, startPoint, startDate, endDate, activities },
			destination
		);
		setDestination("");
		setStartPoint("");
		setStartDate("");
		setEndDate("");
		setActivities([""]);
	};

	return (
		<form className='bg-gray-800 text-white py-6 px-10 rounded-lg' onSubmit={handleSubmit}>
			<h2 className='text-lg mb-2 text-center font-semibold text-white'>Add a new travel plan</h2>
			<div className='mb-4'>
				<label className='block text-gray-200 text-sm font-sm mb-2' htmlFor='destination'>
					Destination
				</label>
				<input
					className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
					id='destination'
					type='text'
					value={destination}
					onChange={(e) => setDestination(e.target.value)}
				/>
			</div>
			<div className='mb-4'>
				<label className='block text-gray-200 text-sm font-sm mb-2' htmlFor='start-point'>
					Start Point
				</label>
				<input
					className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
					id='start-point'
					type='text'
					value={startPoint}
					onChange={(e) => setStartPoint(e.target.value)}
				/>
			</div>
			<div className='mb-4'>
				<label className='block text-gray-200 text-sm font-sm mb-2' htmlFor='start-date'>
					Start Date
				</label>
				<input
					className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
					id='start-date'
					type='date'
					value={startDate}
					onChange={(e) => setStartDate(e.target.value)}
				/>
			</div>
			<div className='mb-4'>
				<label className='block text-gray-200 text-sm font-sm mb-2' htmlFor='end-date'>
					End Date
				</label>
				<input
					className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
					id='end-date'
					type='date'
					value={endDate}
					onChange={(e) => setEndDate(e.target.value)}
				/>
			</div>
			{activities.map((activity, index) => (
				<div key={index} className='mb-4'>
					<label className='block text-gray-200 text-sm font-sm mb-2' htmlFor={`activity-${index}`}>
						Activity {index + 1}
					</label>
					<input
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
						id={`activity-${index}`}
						type='text'
						value={activity}
						onChange={(e) => {
							const newActivities = [...activities];
							newActivities[index] = e.target.value;
							setActivities(newActivities);
						}}
					/>
				</div>
			))}
			<div className='flex items-center justify-between'>
				<button
					className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-blue-900 focus:shadow-outline'
					type='button'
					onClick={addActivity}
				>
					Add Activity
				</button>
				<button
					className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-blue-900 focus:shadow-outline'
					type='submit'
				>
					Submit
				</button>
			</div>
		</form>
	);
};

export default AddTravelForm;
