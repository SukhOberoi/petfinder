import React, { useState } from "react";
import DogForm from "../../components/DogForm.jsx";
import Appointments from "../../components/Appointments.jsx";

export default function ShelterLogin() {
	const [loginData, setLoginData] = useState({
		shelterid: "",
		password: "",
	});

	const [registerData, setRegisterData] = useState({
		shelterid: "",
		sheltername: "",
		address: "",
		phone1: "",
		phone2: "",
		capacity: "",
		opening: "",
		closing: "",
		password: "",
	});

	const [loggedIn, setLoggedIn] = useState(false);

	const handleLogin = () => {
		fetch("http://127.0.0.1:5000/shelter_login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(loginData),
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				return response.json();
			})
			.then((data) => {
				// Handle successful login response
				console.log(data);
				// Store shelter details in local storage
				localStorage.setItem(
					"shelterDetails",
					JSON.stringify(data.shelter_details)
				);
				setLoggedIn(true);
			})
			.catch((error) => {
				alert("Error");
				console.error("Login error:", error);
			});
	};

	const handleRegister = () => {
		fetch("http://127.0.0.1:5000/shelter_register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(registerData),
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				return response.json();
			})
			.then((data) => {
				// Handle successful registration response
				console.log(data);
			})
			.catch((error) => {
				// Handle error
				console.error("Registration error:", error);
			});
	};

	const handleLoginInputChange = (event) => {
		const { name, value } = event.target;
		setLoginData({ ...loginData, [name]: value });
	};

	const handleRegisterInputChange = (event) => {
		const { name, value } = event.target;
		setRegisterData({ ...registerData, [name]: value });
	};

	return (
		<>
			{!loggedIn && (
				<div className="grid grid-cols-2">
					<div className="p-4 m-2 rounded-md bg-slate-200">
						<h3 className="text-2xl">Login</h3>
						<input
							className="m-1 border-2 border-black"
							type="text"
							name="shelterid"
							value={loginData.shelterid}
							onChange={handleLoginInputChange}
							placeholder="shelterid"
						/>
						<br></br>
						<input
							className="m-1 border-2 border-black"
							type="password"
							name="password"
							value={loginData.password}
							onChange={handleLoginInputChange}
							placeholder="password"
						/>{" "}
						<br></br>
						<button
							className="p-1 m-1 border-2 border-slate-300"
							onClick={handleLogin}
						>
							Login
						</button>
					</div>
					<div className="p-4 m-2 rounded-md bg-slate-200">
						<h3 className="text-2xl">Register</h3>
						<input
							className="m-1 border-2 border-black"
							type="text"
							name="shelterid"
							value={registerData.shelterid}
							onChange={handleRegisterInputChange}
							placeholder="shelterid"
						/>
						<br></br>
						<input
							className="m-1 border-2 border-black"
							type="text"
							name="sheltername"
							value={registerData.sheltername}
							onChange={handleRegisterInputChange}
							placeholder="Shelter Name"
						/>
						<br></br>
						<textarea
							className="m-1 border-2 border-black"
							name="address"
							value={registerData.address}
							onChange={handleRegisterInputChange}
							cols="22"
							rows="3"
							placeholder="Address"
						></textarea>
						<br></br>
						<input
							className="m-1 border-2 border-black"
							type="number"
							name="phone1"
							value={registerData.phone1}
							onChange={handleRegisterInputChange}
							placeholder="Phone Number"
						/>
						<br></br>
						<input
							className="m-1 border-2 border-black"
							type="number"
							name="phone2"
							value={registerData.phone2}
							onChange={handleRegisterInputChange}
							placeholder="Phone Number"
						/>
						<br></br>
						<input
							className="m-1 border-2 border-black"
							type="number"
							name="capacity"
							value={registerData.capacity}
							onChange={handleRegisterInputChange}
							placeholder="Capacity"
						/>
						<br></br>
						<label htmlFor="opening">Opening Time</label>
						<input
							className="m-1 border-2 border-black"
							type="time"
							name="opening"
							value={registerData.opening}
							onChange={handleRegisterInputChange}
						/>
						<br></br>
						<label htmlFor="closing">Closing Time</label>
						<input
							className="m-1 border-2 border-black"
							type="time"
							name="closing"
							value={registerData.closing}
							onChange={handleRegisterInputChange}
						/>
						<br></br>
						<input
							className="m-1 border-2 border-black"
							type="password"
							name="password"
							value={registerData.password}
							onChange={handleRegisterInputChange}
							placeholder="password"
						/>{" "}
						<br></br>
						<button
							className="p-1 m-1 border-2 border-slate-300"
							onClick={handleRegister}
						>
							Register
						</button>
					</div>
				</div>
			)}
			{loggedIn && (<><DogForm />
			<Appointments />
			</>
		
		)}
		</>
	);
}
