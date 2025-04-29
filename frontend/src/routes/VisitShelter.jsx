import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getApiBaseUrl } from '@/utils/apiBaseUrl';
export default function VisitShelter() {
	const { shelterId } = useParams();
	const [appointmentDate, setAppointmentDate] = useState("");
	const [appointmentTime, setAppointmentTime] = useState("");
	const [shelterDetails, setShelterDetails] = useState(null);
	const userDetails = JSON.parse(localStorage.getItem("adopterDetails"));

	useEffect(() => {
		const fetchShelterDetails = async () => {
			try {
				const response = await fetch(
					`${getApiBaseUrl()}/shelters/${shelterId}`,
					{
						method: "GET",
					}
				);

				if (!response.ok) {
					throw new Error("Network response was not ok");
				}

				const data = await response.json();
				setShelterDetails(data);
			} catch (error) {
				console.error("Error fetching shelter details:", error);
			}
		};

		if (shelterId) {
			fetchShelterDetails();
		}
	}, [shelterId]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!shelterDetails || !appointmentDate) {
			alert("Please wait while shelter details are being fetched.");
			return;
		}

		const { opening_time, closing_time } = shelterDetails;
		const appointmentDateTime = new Date(
			`${appointmentDate} ${appointmentTime}`
		);
		const appointmentHours = appointmentDateTime.getHours();
		const appointmentMinutes = appointmentDateTime.getMinutes();

		const openingTime = new Date(`${appointmentDate} ${opening_time}`);
		const closingTime = new Date(`${appointmentDate} ${closing_time}`);

		if (
			appointmentDateTime < openingTime ||
			appointmentDateTime > closingTime
		) {
			alert(
				"Appointment time must be between shelter opening and closing time."
			);
			return;
		}

		try {
			const response = await fetch(
				`${getApiBaseUrl()}/appointments`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						appointment_date: appointmentDate,
						appointment_time: appointmentTime,
						user_id: userDetails["userid"],
						shelter_id: shelterId,
					}),
				}
			);

			if (!response.ok) {
				throw new Error("Network response was not ok");
			}

			const data = await response.json();
			alert(
				`Appointment created successfully for ${appointmentDate} at ${appointmentTime}`
			);
		} catch (error) {
			console.error("Error creating appointment:", error);
			alert("An error occurred while creating the appointment");
		}
	};

	return (
		<div className="container px-4 py-8 mx-auto">
			<div className="flex flex-col gap-8 md:flex-row">
				{shelterDetails && (
					<div className="flex-1 p-6 bg-white rounded-md shadow-md">
						<h1 className="mb-2 text-3xl font-bold">
							Visit Shelter: {shelterDetails.shelter_name}
						</h1>
						<p className="mb-2">
							Address: {shelterDetails.location}
						</p>
						<p className="mb-2">
							Phone 1: {shelterDetails.phone_no1}
						</p>
						<p className="mb-2">
							Phone 2: {shelterDetails.phone_no2}
						</p>
						<p className="mb-2">
							Capacity: {shelterDetails.capacity}
						</p>
						<p>
							Opening Time: {shelterDetails.opening_time} |
							Closing Time: {shelterDetails.closing_time}
						</p>
					</div>
				)}
				<div className="flex-1 p-6 bg-white rounded-md shadow-md">
					<h1 className="mb-4 text-3xl font-bold">
						Book Appointment
					</h1>
					<form onSubmit={handleSubmit} className="space-y-4">
						<div>
							<label
								htmlFor="appointmentDate"
								className="block mb-1"
							>
								Date:
							</label>
							<input
								type="date"
								id="appointmentDate"
								value={appointmentDate}
								onChange={(e) =>
									setAppointmentDate(e.target.value)
								}
								className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-400"
							/>
						</div>
						<div>
							<label
								htmlFor="appointmentTime"
								className="block mb-1"
							>
								Time:
							</label>
							<input
								type="time"
								id="appointmentTime"
								value={appointmentTime}
								onChange={(e) =>
									setAppointmentTime(e.target.value)
								}
								className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-400"
							/>
						</div>
						<button
							type="submit"
							className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
						>
							Book Appointment
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}
