import React, { useState, useEffect } from "react";
import { fetchAppointments } from "../services/api";

function SummaryPage() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments().then((data) => {
      setAppointments(data);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-center text-3xl font-extrabold text-gray-800 mb-6">
          Upcoming Appointments
        </h1>
        {appointments.length > 0 ? (
          <ul className="list-none space-y-4">
            {appointments.map((appointment) => (
              <li
                key={appointment.id}
                className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <strong className="text-lg text-gray-700">
                  {appointment.title}
                </strong>
                <p className="text-sm text-gray-500">
                  {new Date(appointment.startDateTime).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-600 text-lg">
            No upcoming appointments found.
          </p>
        )}
      </div>
    </div>
  );
}

export default SummaryPage;
