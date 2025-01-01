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

export const updateAppointment = async (id, data) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating appointment:", error);
    throw error;
  }
};

export const deleteAppointment = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
