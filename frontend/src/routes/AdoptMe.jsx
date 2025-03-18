import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function AdoptMe() {
    const { id } = useParams();
    const [dogDetails, setDogDetails] = useState(null);
    const [confirmation, setConfirmation] = useState(false);

    useEffect(() => {
        fetch(`${window.location.origin}:5000/dogs/${id}`, {
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
                console.log(data.shelter);
                setDogDetails(data);
            })
            .catch((error) => {
                // Handle errors
                console.error("There was a problem with the fetch operation:", error);
            });
    }, [id]);

    const handleAdopt = () => {
        setConfirmation(true);
    };

    const handleConfirm = () => {
        // Call the remove_dog endpoint
        fetch(`${window.location.origin}:5000/remove_dog?dog_id=${id}`, {
            method: "DELETE",
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                console.log(data); // Log the response from the server
                setConfirmation(false);
                alert(
                    `${dogDetails.dog.dog_name} has been reserved. Pick up at ${dogDetails.shelter.address}`
                );
            })
            .catch((error) => {
                // Handle errors
                console.error("There was a problem with the fetch operation:", error);
            });
    };

    const handleCancel = () => {
        setConfirmation(false);
    };

    if (!dogDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div className="grid grid-cols-1 gap-8 m-4 md:grid-cols-3">
            {/* Dog details */}
            <div className="p-4 border border-gray-400 rounded-md">
                <img
                    className="m-auto w-full md:w-[250px] object-cover"
                    src={dogDetails.dog.image}
                    alt=""
                />
                <h1 className="mt-4 text-2xl font-bold text-center">
                    {dogDetails.dog.dog_name}
                </h1>
                <p className="text-center">
                    <span className="font-bold">Breed:</span> {dogDetails.breed.breed_name}
                </p>
                <p className="text-center">
                    <span className="font-bold">Age:</span> {dogDetails.dog.age}
                </p>
                <p className="text-center">
                    <span className="font-bold">Vaccination Status:</span>{" "}
                    {dogDetails.dog.vaccination_status === "1"
                        ? "Vaccinated"
                        : "Not Vaccinated"}
                </p>

                <button
                    className="block w-24 p-1 mx-auto my-3 border-2 border-slate-400"
                    onClick={handleAdopt}
                >
                    Adopt Me
                </button>
            </div>

            {/* Breed details */}
            <div className="p-4 border border-gray-400 rounded-md">
                <h3 className="text-lg font-bold">Breed Details</h3>
                <p>
                    <span className="font-bold">Description:</span> {dogDetails.breed.description}
                </p>
                <p>
                    <span className="font-bold">Temperament:</span> {dogDetails.breed.temperament}
                </p>
                <p>
                    <span className="font-bold">Shedding Value:</span> {dogDetails.breed.shedding_value}/1
                </p>
                <p>
                    <span className="font-bold">Shedding Frequency:</span> {dogDetails.breed.shedding_frequency}
                </p>
                <p>
                    <span className="font-bold">Energy Level:</span> {dogDetails.breed.energy_level}/1
                </p>
                <p>
                    <span className="font-bold">Popularity Ranking:</span> {dogDetails.breed.popularity_ranking}
                </p>
                <p>
                    <span className="font-bold">Min Height:</span> {dogDetails.breed.min_height}cm
                </p>
                <p>
                    <span className="font-bold">Max Height:</span> {dogDetails.breed.max_height}cm
                </p>
                <p>
                    <span className="font-bold">Min Weight:</span> {dogDetails.breed.min_weight}kg
                </p>
                <p>
                    <span className="font-bold">Max Weight:</span> {dogDetails.breed.max_weight}kg
                </p>
                <p>
                    <span className="font-bold">Min Expectancy:</span> {dogDetails.breed.min_expectancy}years
                </p>
                <p>
                    <span className="font-bold">Max Expectancy:</span> {dogDetails.breed.max_expectancy}years
                </p>
            </div>

            {/* Shelter details */}
            <div className="p-4 border border-gray-400 rounded-md">
                <h2 className="text-lg font-bold">Shelter Details</h2>
                <p>
                    <span className="font-bold">Shelter:</span> {dogDetails.shelter.shelter_name}
                </p>
                <p>
                    <span className="font-bold">Address:</span> {dogDetails.shelter.address}
                </p>
                <p>
                    <span className="font-bold">Phone 1:</span> {dogDetails.shelter.phone1}
                </p>
                <p>
                    <span className="font-bold">Phone 2:</span> {dogDetails.shelter.phone2}
                </p>
                <p>
                    <span className="font-bold">Capacity:</span> {dogDetails.shelter.capacity}
                </p>
                <p>
                    <span className="font-bold">Opening Time:</span> {dogDetails.shelter.opening_time}
                </p>
                <p>
                    <span className="font-bold">Closing Time:</span> {dogDetails.shelter.closing_time}
                </p>
                <Link to={`/visit/${dogDetails.shelter.shelter_id}`}>
                    <button className="block w-24 p-1 mx-auto my-3 border-2 border-slate-400">
                        Visit the Shelter
                    </button>
                </Link>
            </div>

            {/* Confirmation Modal */}
            {confirmation && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="p-4 bg-white border border-gray-400 rounded-md">
                        <p>
                            Are you sure you want to adopt {dogDetails.dog.dog_name}?
                        </p>
                        <div className="flex justify-center mt-4">
                            <button
                                className="px-4 py-1 mr-2 text-white bg-blue-500 rounded-md"
                                onClick={handleConfirm}
                            >
                                Yes
                            </button>
                            <button
                                className="px-4 py-1 ml-2 text-white bg-red-500 rounded-md"
                                onClick={handleCancel}
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}