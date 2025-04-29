import React, { useState } from "react";
import { getApiBaseUrl } from '@/utils/apiBaseUrl';
export default function AdopterLogin() {
	const [loginData, setLoginData] = useState({
		userid: "",
		password: "",
	});

	const [registerData, setRegisterData] = useState({
		userid: "",
		fullname: "",
		address: "",
		dob: "",
		income: "0",
		password: "",
	});

	const handleLogin = () => {
		fetch(`${getApiBaseUrl()}/adopter_login`, {
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
				// Check if login was successful
				if (data.message === "Login successful") {
					// Store adopter details in local storage
					localStorage.setItem(
						"adopterDetails",
						JSON.stringify(data.adopter_details)
					);
					console.log(data.adopter_details);
					// Redirect to home page
					window.location.href = "/";
				} else {
					// Show alert for wrong credentials
					alert("Wrong credentials");
				}
			})
			.catch((error) => {
				// Handle error
				console.error("Login error:", error);
			});
	};

	const handleRegister = () => {
		fetch(`${getApiBaseUrl()}/adopter_register`, {
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
				alert("Registration Successful");
				console.log(data);
			})
			.catch((error) => {
				alert("Registration Failed");
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
		<div className="grid grid-cols-1 md:grid-cols-2">
			<div className="p-4 m-2 rounded-md bg-slate-200">
				<h3 className="text-2xl">Login</h3>
				<input
					className="m-1 border-2 border-black"
					type="text"
					name="userid"
					value={loginData.userid}
					onChange={handleLoginInputChange}
					placeholder="userid"
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
					name="userid"
					value={registerData.userid}
					onChange={handleRegisterInputChange}
					placeholder="userid"
				/>
				<br></br>
				<input
					className="m-1 border-2 border-black"
					type="text"
					name="fullname"
					value={registerData.fullname}
					onChange={handleRegisterInputChange}
					placeholder="Full Name"
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
				<label htmlFor="dob">DOB:</label>
				<input
					className="m-1 border-2 border-black"
					type="date"
					name="dob"
					value={registerData.dob}
					onChange={handleRegisterInputChange}
				/>
				<br></br>
				<label htmlFor="income">Income Range:</label>
				<select
					name="income"
					id="income"
					value={registerData.income}
					onChange={handleRegisterInputChange}
				>
					<option value="0">0</option>
					<option value="1">1000-10000</option>
					<option value="2">10000-50000</option>
					<option value="3">50000+</option>
				</select>
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
	);
}
