import React, { useState, useEffect } from "react";
import Calendar from "../components/Calendar";
import AppointmentForm from "../components/AppointmentForm";
import { fetchAppointments } from "../services/api";

function CalendarPage() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments().then((data) => setAppointments(data));
  }, []);

  return (
    <div>
      <h1 className="text-center text-2xl font-bold">
        Weekly Appointment Calendar
      </h1>
      <Calendar appointments={appointments} setAppointments={setAppointments} />
      <AppointmentForm setAppointments={setAppointments} />
    </div>
  );
}

export default CalendarPage;
