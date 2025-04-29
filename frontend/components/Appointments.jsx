import React, { useState, useEffect } from 'react';
import { getApiBaseUrl } from '@/utils/apiBaseUrl';
export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const shelterDetails = localStorage.getItem('shelterDetails');
        const shelterId = shelterDetails ? JSON.parse(shelterDetails).shelterid : null;

        if (!shelterId) {
          throw new Error('Shelter ID not found in local storage');
        }

        const response = await fetch(`${getApiBaseUrl()}/appointments/${shelterId}`);
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        setAppointments(data);
        console.log(appointments)
      } catch (error) {
        console.error('Error fetching appointments: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (loading) {
    return <div className="mt-4 text-center">Loading appointments...</div>;
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="mb-4 text-3xl font-semibold">Appointments</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {appointments.map((appointment) => (
          <div key={appointment.appointment_id} className="p-4 border border-gray-200 rounded-lg">
            <h2 className="text-xl font-semibold">User ID: {appointment.user_id}</h2>
            <p><span className="font-semibold">Name:</span> {appointment.name}</p>
            <p><span className="font-semibold">Phone:</span> {appointment.phone_no}</p>
            <p><span className="font-semibold">DOB:</span> {appointment.DOB.slice(0, appointment.DOB.search("00:00"))}</p>
            <p className="mt-2"><span className="font-semibold">Appointment Date:</span> {appointment.appointment_date.slice(0, appointment.appointment_date.search("00:00"))}</p>
            <p><span className="font-semibold">Appointment Time:</span> {appointment.appointment_time}</p>
            {/* Display other appointment details */}
          </div>
        ))}
      </div>
    </div>
  );
}
