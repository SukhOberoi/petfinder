import { Route, Routes } from "react-router-dom"
import Header from "../components/Header.jsx"
import Home from "./routes/Home.jsx"
import Login from "./routes/Login.jsx"
import AdopterLogin from "./routes/AdopterLogin.jsx"
import ShelterLogin from "./routes/ShelterLogin.jsx"



export default function App() {
  return (
    <>
    <Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/login/adopter" element={<AdopterLogin />} />
				<Route path="/login/shelter" element={<ShelterLogin />} />
			</Routes>
    </>
  )
}