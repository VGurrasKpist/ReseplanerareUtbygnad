import dynamic from "next/dynamic";

const AddTravelForm = dynamic(() => import("../components/AddTravelForm"), { ssr: false });

export default function Home() {
	return (
		<main className='flex flex-col items-center justify-center min-h-screen'>
			<AddTravelForm />
		</main>
	);
}
