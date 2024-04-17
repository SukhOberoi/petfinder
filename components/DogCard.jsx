import React, { useEffect, useState } from 'react'

export default function DogCard(props) {
  const [deets, setDeets] = useState(false)
  const [breedDetails, setBreedDetails] = useState(null)
  
  useEffect(()=>{
    fetch(`http://127.0.0.1:5000/breed_details?breed_name=${encodeURIComponent(props.dog.breed_name)}`, {
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
        setBreedDetails(data);
      })
      .catch((error) => {
        // Handle errors
        console.error(
          "There was a problem with the fetch operation:",
          error
        );
      });
  }, [deets])
  
  const handleClick = ()=>{setDeets(!deets)}
  const handleClose = ()=>{setDeets(false)}

  return (
    <div className='grid grid-cols-1 border-2 border-black rounded-sm text-center relative w-[300px] bg-slate-200 p-2'>
        <img className="m-auto" width="250px" src={props.dog.image} alt="" />
      <h2 className='text-2xl'>{props.dog.dog_name}</h2>
      <h3 className='text-xl'>{props.dog.breed_name}</h3>
      <h3>Age: {props.dog.age}</h3>
      <h3>{props.dog.vaccination_status=="1"?"Vaccinated": "Not Vaccinated"}</h3>
      <div>
        <button className='w-24 p-1 mx-1 border-2 border-slate-400' onClick={handleClick}>Details</button>
        <button className='w-24 p-1 mx-1 border-2 border-slate-400'>Adopt Me</button>
      </div>
      {deets && breedDetails && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 border border-black max-w-[90%] max-h-[90%] overflow-auto">
            <button className="absolute top-0 right-0 p-2" onClick={handleClose}>Close</button>
            <h3>{props.dog.breed_name} Details</h3>
            <p>Description: {breedDetails[2]}</p>
            <p>Temperament: {breedDetails[3]}</p>
            <p>Shedding Value: {breedDetails[4]}/1</p>
            <p>Shedding Frequency: {breedDetails[5]}</p>
            <p>Energy Level: {breedDetails[6]}/1</p>
            <p>Popularity Ranking: {breedDetails[7]}</p>
            <p>Min Height: {breedDetails[8]}cm</p>
            <p>Max Height: {breedDetails[9]}cm</p>
            <p>Min Weight: {breedDetails[10]}kg</p>
            <p>Max Weight: {breedDetails[11]}kg</p>
            <p>Min Expectancy: {breedDetails[12]}years</p>
            <p>Max Expectancy: {breedDetails[13]}years</p>
          </div>
        </div>
      )}
    </div>
  )
}