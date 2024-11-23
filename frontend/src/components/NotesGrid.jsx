import React from "react";
import NoteCard from "./NoteCard";
import "./NotesGrid.css";

const NotesGrid = ({ notes, onEdit, onDelete }) => {
  return (
    <div className="notes-grid">
      {notes.map((note) => (
        <NoteCard
          key={note._id}
          note={note}
          onEdit={() => onEdit(note)}
          onDelete={() => onDelete(note._id)}
        />
      ))}
    </div>
  );
};

export default NotesGrid;
