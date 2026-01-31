import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import noteContext from "../context/notes/noteContext";
import AddNote from "./AddNote";
import NoteItem from "./NoteItem";
import { useNavigate } from "react-router-dom";

const Notes = (props) => {
  const context = useContext(noteContext);
  const { notes, getNotes, editNote, deleteNote } = context;
  const navigate = useNavigate();

  const ref = useRef(null);
  const refClose = useRef(null);

  const deleteRef = useRef(null);
  const deleteCloseRef = useRef(null);

  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });

  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotes();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  // EDIT
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  const handleEditClick = (e) => {
    e.preventDefault();
    editNote(note.id, note.etitle, note.edescription, note.etag);
    props.showAlert("Note updated successfully", "success");
    refClose.current.click();
  };

  // DELETE
  const confirmDelete = (id) => {
    setDeleteId(id);
    deleteRef.current.click();
  };

  const handleDelete = () => {
    deleteNote(deleteId);
    props.showAlert("Note deleted successfully", "success");
    deleteCloseRef.current.click();
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      {/* Hidden Buttons */}
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#editModal"
      ></button>

      <button
        ref={deleteRef}
        type="button"
        className="btn btn-danger d-none"
        data-bs-toggle="modal"
        data-bs-target="#deleteModal"
      ></button>

      {/* EDIT MODAL */}
      <div className="modal fade" id="editModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5>Edit Note</h5>
            </div>
            <div className="modal-body">
              <input
                className="form-control mb-2"
                name="etitle"
                value={note.etitle}
                onChange={onChange}
              />
              <input
                className="form-control mb-2"
                name="edescription"
                value={note.edescription}
                onChange={onChange}
              />
              <input
                className="form-control mb-2"
                name="etag"
                value={note.etag}
                onChange={onChange}
              />
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button className="btn btn-primary" onClick={handleEditClick}>
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* DELETE MODAL */}
      <div className="modal fade" id="deleteModal" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="text-danger">Delete Note</h5>
            </div>
            <div className="modal-body">
              Are you sure you want to delete this note?
            </div>
            <div className="modal-footer">
              <button
                ref={deleteCloseRef}
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button className="btn btn-danger" onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      <AddNote showAlert={props.showAlert} />

      <h2>Your Notes</h2>
      <div className="row">
        {notes.length === 0 && "No notes to display"}
        {notes.map((note) => (
          <NoteItem
            key={note._id}
            note={note}
            updateNote={updateNote}
            confirmDelete={confirmDelete}
          />
        ))}
      </div>
    </>
  );
};

export default Notes;