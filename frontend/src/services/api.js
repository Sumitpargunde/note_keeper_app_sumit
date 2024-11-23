import axios from "axios";

const API_URL = "https://note-keeper-app-sumit-p.onrender.com";

export const getNotes = async () => {
  const response = await axios.get(`${API_URL}/notes`);
  return response.data;
};

export const addNote = async (note) => {
  const response = await axios.post(`${API_URL}/notes`, note);
  return response.data;
};

export const updateNote = async (id, note) => {
  const response = await axios.put(`${API_URL}/notes/${id}`, note);
  return response.data;
};

export const deleteNote = async (id) => {
  const response = await axios.delete(`${API_URL}/notes/${id}`);
  return response.data;
};
