import dynamic from "next/dynamic";
import React from "react";

const DisplayTravels = dynamic(() => import("@/components/DisplayTravels"), { ssr: false });

const DisplayTravelsPage = () => {
	return (
		<main>
			<h1 className='text-2xl font-bold text-center py-6'>Travels</h1>
			<DisplayTravels />
		</main>
	);
};

export default DisplayTravelsPage;
