import React, { useState, useEffect } from 'react';
import { getApiBaseUrl } from '../utils/apiBaseUrl';
export default function DogForm() {
  const [dogData, setDogData] = useState({
    dog_name: '',
    dog_id: '',
    age: '',
    vaccination_status: '',
    breed_id: '',
    image: null
  });

  const [breeds, setBreeds] = useState([]);
  const [response, setResponse] = useState("");

  useEffect(() => {
    fetchBreeds();
  }, []);

  const fetchBreeds = () => {
    fetch(`${getApiBaseUrl()}/breeds`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setBreeds(data);
      })
      .catch(error => {
        console.error('Error fetching breeds:', error);
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDogData({ ...dogData, [name]: value });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setDogData({ ...dogData, image: reader.result });
    };
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Fetch shelter ID from local storage
    const shelterDetails = localStorage.getItem('shelterDetails');
    const shelterId = shelterDetails ? JSON.parse(shelterDetails).shelterid : null;
    
    // Include shelter ID in the dogData object
    const dataToSend = {
      ...dogData,
      shelter_id: shelterId // Add shelter_id to dogData
    };
  
    fetch(`${getApiBaseUrl()}/add_dog`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataToSend) // Send the modified data object
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // Handle successful dog addition
      console.log(data);
      setResponse(data.message);
    })
    .catch(error => {
      console.error('Error adding dog:', error);
      setResponse('Error adding dog');
    });
  };
  

  return (
    <div className='p-4 rounded-md bg-slate-200'>
      <h2 className='text-3xl text-center'>{localStorage.getItem('shelterDetails') ? JSON.parse(localStorage.getItem('shelterDetails')).sheltername : 'Error'}</h2>
      <h3 className='mb-2 text-2xl'>Add Dog</h3>
      <form onSubmit={handleSubmit}>
        <div className='mb-2'>
          <label htmlFor="dog_name" className='mr-2'>Dog Name:</label>
          <input type="text" id="dog_name" name="dog_name" value={dogData.dog_name} onChange={handleInputChange} className='border-2 border-black' />
        </div>  
        <div className='mb-2'>
          <label htmlFor="age" className='mr-2'>Age:</label>
          <input type="number" id="age" name="age" value={dogData.age} onChange={handleInputChange} className='border-2 border-black' />
        </div>
        <div className='mb-2'>
          <label htmlFor="vaccination_status" className='mr-2'>Vaccination Status:</label>
          <input type="text" id="vaccination_status" name="vaccination_status" value={dogData.vaccination_status} onChange={handleInputChange} className='border-2 border-black' />
        </div>
        <div className='mb-2'>
          <label htmlFor="breed_id" className='mr-2'>Breed:</label>
          <select id="breed_id" name="breed_id" value={dogData.breed_id} onChange={handleInputChange} className='border-2 border-black'>
            <option value="">Select Breed</option>
            {breeds.map(breed => (
              <option key={breed[0]} value={breed[0]}>{breed[1]}</option>
            ))}
          </select>
        </div>
        <div className='mb-2'>
          <label htmlFor="image" className='mr-2'>Image:</label>
          <input type="file" id="image" name="image" accept="image/*" onChange={handleImageChange} className='border-2 border-black' />
        </div>
        <button type="submit" className='p-1 m-1 border-2 border-slate-300'>Add Dog</button>
        <p>{response}</p>
      </form>
    </div>
  );
}
