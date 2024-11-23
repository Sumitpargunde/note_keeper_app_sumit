import React from "react";
import "./NoteCard.css";
import { motion } from "framer-motion";

const NoteCard = ({ note, onEdit, onDelete }) => {
  return (
    <motion.div
      className={`note-card ${note.isPinned ? "pinned" : ""}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <h3>{note.title}</h3>
      <h5>{note.tagline}</h5>
      <p>{note.body}</p>
      <div className="note-actions">
        <button  className="edit" onClick={onEdit}>Edit</button>
        <button  className="delete" onClick={onDelete}>Delete</button>
      </div>
    </motion.div>
  );
};

export default NoteCard;
