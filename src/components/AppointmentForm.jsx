import React, { useState } from "react";
import { createAppointment } from "../services/api";
import "./appoitmentForm.css";

function AppointmentForm({ setAppointments }) {
  const [formData, setFormData] = useState({
    title: "",
    startDateTime: "",
    endDateTime: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createAppointment(formData).then((newAppointment) => {
      setAppointments((prev) => [...prev, newAppointment]);
      setFormData({ title: "", startDateTime: "", endDateTime: "" });
    });
  };

  return (
    <form onSubmit={handleSubmit} className="my-4">
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="border p-2"
          required
        />
        <input
          type="datetime-local"
          value={formData.startDateTime}
          onChange={(e) =>
            setFormData({ ...formData, startDateTime: e.target.value })
          }
          className="border p-2"
          required
        />
        <input
          type="datetime-local"
          value={formData.endDateTime}
          onChange={(e) =>
            setFormData({ ...formData, endDateTime: e.target.value })
          }
          className="border p-2"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          Add
        </button>
      </div>
    </form>
  );
}

export default AppointmentForm;
