import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { getNotes, addNote, updateNote, deleteNote } from "./services/api";
import NotesGrid from "./components/NotesGrid";
import AddNoteModal from "./components/AddNoteModal";
import Pagination from "./components/Pagination";
import "react-toastify/dist/ReactToastify.css";
import "./styles.css";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  const notesPerPage = 6;

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const data = await getNotes();
      setNotes(data);
    } catch {
      toast.error("Failed to fetch notes");
    }
  };

  const handleAddNote = async (note) => {
    try {
      await addNote(note);
      fetchNotes();
      toast.success("Note added successfully!");
    } catch {
      toast.error("Failed to add note");
    }
  };

  const handleUpdateNote = async (id, updatedNote) => {
    try {
      await updateNote(id, updatedNote);
      fetchNotes();
      toast.success("Note updated successfully!");
    } catch {
      toast.error("Failed to update note");
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      await deleteNote(id);
      fetchNotes();
      toast.success("Note deleted successfully!");
    } catch {
      toast.error("Failed to delete note");
    }
  };

  const notesToDisplay = notes.slice(
    (currentPage - 1) * notesPerPage,
    currentPage * notesPerPage
  );

  return (
    <div className="app">
      <h1>Notekeeper</h1>
       <button
        onClick={() => {
          setSelectedNote(null);  // Clear selectedNote to indicate new note
          setIsModalOpen(true);   // Open the modal for adding a new note
        }}
      >
        Add Note
      </button>
      <NotesGrid
        notes={notesToDisplay}
         onEdit={(note) => {
          setSelectedNote(note);
          setIsModalOpen(true);  // Open the modal for editing
        }}
        onDelete={handleDeleteNote}
      />
      <Pagination
        totalItems={notes.length}
        itemsPerPage={notesPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
      <AddNoteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={selectedNote ? handleUpdateNote : handleAddNote}
        selectedNote={selectedNote}
      />
      <ToastContainer />
    </div>
  );
};

export default App;
