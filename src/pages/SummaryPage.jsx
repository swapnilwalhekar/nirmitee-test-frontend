import React, { useState, useEffect } from "react";
import { fetchAppointments } from "../services/api";

function SummaryPage() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments().then((data) => setAppointments(data));
  }, []);

  return (
    <div>
      <h1 className="text-center text-2xl font-bold">Upcoming Appointments</h1>
      <ul className="list-disc px-8">
        {appointments.map((appointment) => (
          <li key={appointment.id} className="my-2">
            <strong>{appointment.title}</strong> -{" "}
            {new Date(appointment.startDateTime).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SummaryPage;
