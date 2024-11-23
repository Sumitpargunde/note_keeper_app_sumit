import React, { useState, useEffect } from "react";
import "./AddNoteModal.css";

const AddNoteModal = ({ isOpen, onClose, onSave, selectedNote }) => {
  const [title, setTitle] = useState("");
  const [tagline, setTagline] = useState("");
  const [body, setBody] = useState("");

  // If selectedNote is provided, pre-fill the form with its data
  useEffect(() => {
    if (selectedNote) {
      setTitle(selectedNote.title);
      setTagline(selectedNote.tagline);
      setBody(selectedNote.body);
    }
  }, [selectedNote]);

  const handleSave = () => {
    if (selectedNote) {
      // If editing an existing note, pass its ID along with the updated data
      onSave(selectedNote._id, { title, tagline, body, isPinned: selectedNote.isPinned });
    } else {
      // If adding a new note
      onSave({ title, tagline, body, isPinned: false });
    }
    setTitle("");
    setTagline("");
    setBody("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{selectedNote ? "Edit Note" : "Add Note"}</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Tagline"
          value={tagline}
          onChange={(e) => setTagline(e.target.value)}
        />
        <textarea
          placeholder="Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <div className="modal-actions">
          <button onClick={handleSave}>{selectedNote ? "Update" : "Save"}</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AddNoteModal;
