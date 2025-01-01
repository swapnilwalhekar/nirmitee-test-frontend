import axios from "axios";

const API_URL = "http://localhost:5000/api/appointments";

export const fetchAppointments = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createAppointment = async (appointment) => {
  const response = await axios.post(API_URL, appointment);
  return response.data;
};

export const updateAppointment = async (id, updatedData) => {
  const response = await axios.put(`${API_URL}/${id}`, updatedData);
  return response.data;
};

export const deleteAppointment = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
