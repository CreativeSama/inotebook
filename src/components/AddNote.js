import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

const AddNote = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;

  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    props.showAlert("Note added successfully", "success");
    setNote({ title: "", description: "", tag: "" });
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className="container my-3">
      <h2>Add a Note</h2>

      <form>
        <input
          className="form-control my-2"
          placeholder="Title"
          name="title"
          value={note.title}
          onChange={onChange}
          minLength={3}
          required
        />
        <input
          className="form-control my-2"
          placeholder="Description"
          name="description"
          value={note.description}
          onChange={onChange}
          minLength={5}
          required
        />
        <input
          className="form-control my-2"
          placeholder="Tag"
          name="tag"
          value={note.tag}
          onChange={onChange}
        />

        <button
          disabled={note.title.length < 3 || note.description.length < 5}
          className="btn btn-primary"
          onClick={handleClick}
        >
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;