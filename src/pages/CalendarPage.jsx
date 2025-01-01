import React, { useState, useEffect } from "react";
import Calendar from "../components/Calendar";
import AppointmentForm from "../components/AppointmentForm";
import { fetchAppointments } from "../services/api";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CalendarPage() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments().then((data) => {
      const transformedData = data.map((appointment, index) => ({
        id: appointment._id,
        title: appointment.title,
        startDateTime: appointment.startDateTime,
        endDateTime: appointment.endDateTime,
      }));

      setAppointments(transformedData);
    });
  }, []);

  return (
    <div>
      <h1 className="text-center text-2xl font-bold">
        Weekly Appointment Calendar
      </h1>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <DndProvider backend={HTML5Backend}>
        <Calendar
          appointments={appointments}
          setAppointments={setAppointments}
        />
      </DndProvider>
      <AppointmentForm setAppointments={setAppointments} />
    </div>
  );
}

export default CalendarPage;
