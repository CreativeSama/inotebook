import React from "react";

const NoteItem = ({ note, updateNote, confirmDelete }) => {
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <h5 className="card-title">{note.title}</h5>

            <div>
              <i
                className="far fa-trash-alt mx-2 text-danger"
                onClick={() => confirmDelete(note._id)}
              ></i>
              <i
                className="far fa-edit mx-2 text-primary"
                onClick={() => updateNote(note)}
              ></i>
            </div>
          </div>

          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;