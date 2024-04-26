import React, { useState, useEffect } from "react";

interface Travel {
	destination: string;
	startPoint: string;
	startDate: string;
	endDate: string;
	activities: string[];
}

interface TravelFormProps {
	initialTravel: Travel;
	onSubmit: (travel: Travel) => void;
}

const TravelForm: React.FC<TravelFormProps> = ({ initialTravel, onSubmit }) => {
	const [destination, setDestination] = useState(initialTravel.destination);
	const [startPoint, setStartPoint] = useState(initialTravel.startPoint);
	const [startDate, setStartDate] = useState(initialTravel.startDate);
	const [endDate, setEndDate] = useState(initialTravel.endDate);
	const [activities, setActivities] = useState(initialTravel.activities);

	useEffect(() => {
		setDestination(initialTravel.destination);
		setStartPoint(initialTravel.startPoint);
		setStartDate(initialTravel.startDate);
		setEndDate(initialTravel.endDate);
		setActivities(initialTravel.activities);
	}, [initialTravel]);

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		onSubmit({ destination, startPoint, startDate, endDate, activities });
	};

	return (
		<form onSubmit={handleSubmit} className='bg-gray-700 p-4 rounded-lg shadow-lg'>
			<h2 className='text-lg mb-2 text-white'>Edit your travel plan</h2>
			<input
				value={destination}
				onChange={(e) => setDestination(e.target.value)}
				placeholder='Destination'
				className='block w-full p-2 mb-2 bg-gray-800 rounded text-white'
			/>
			<input
				value={startPoint}
				onChange={(e) => setStartPoint(e.target.value)}
				placeholder='Start Point'
				className='block w-full p-2 mb-2 bg-gray-800 rounded text-white'
			/>
			<input
				value={startDate}
				onChange={(e) => setStartDate(e.target.value)}
				placeholder='Start Date'
				className='block w-full p-2 mb-2 bg-gray-800 rounded text-white'
			/>
			<input
				value={endDate}
				onChange={(e) => setEndDate(e.target.value)}
				placeholder='End Date'
				className='block w-full p-2 mb-2 bg-gray-800 rounded text-white'
			/>
			<input
				value={activities.join(", ")}
				onChange={(e) => setActivities(e.target.value.split(", "))}
				placeholder='Activities'
				className='block w-full p-2 mb-2 bg-gray-800 rounded text-white'
			/>
			<button
				type='submit'
				className='block w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600'
			>
				Submit
			</button>
		</form>
	);
};

export default TravelForm;
