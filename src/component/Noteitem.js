import React,{useContext} from "react";
import NoteContext from "../Context/notes/NoteContext";


const Noteitem = (props) => {
  const { note, updatenote } = props;
  const context=useContext(NoteContext);
  const{deletenote}=context;
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
            <div className="d-flex align-items-center">
          <h5 className="card-title">{note.title}</h5>
          <i className={`far fa-trash-alt mx-2`} onClick={()=>{deletenote(note._id)}}></i>
          <i className="far fa-edit mx-2" onClick={()=>{updatenote(note)}}></i>
          </div>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
