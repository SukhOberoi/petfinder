import React from "react";
import { useState, useEffect } from "react";
import DogCard from "../../components/DogCard";

export default function Home() {
	const [dogs, setDogs] = useState([]);
	useEffect(() => {
		fetch(`${import.meta.env.VITE_URL}/dogs`, {
			method: "GET",
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				return response.json();
			})
			.then((data) => {
				// Handle the data received from the API
				console.log(data);
				setDogs(data);
			})
			.catch((error) => {
				// Handle errors
				console.error(
					"There was a problem with the fetch operation:",
					error
				);
			});
	}, []);
	return (
		<div className="grid grid-cols-1 gap-8 m-4 lg:grid-cols-4">
			{dogs.map((dog) => (
				<DogCard dog={dog} />
			))}
		</div>
	);
}
