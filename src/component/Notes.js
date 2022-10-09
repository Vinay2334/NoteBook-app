import React,{useContext,useEffect,useRef,useState} from 'react'
import { useNavigate } from 'react-router-dom';
import NoteContext from "../Context/notes/NoteContext";
import AddNote from './AddNote';
import Noteitem from './Noteitem';

const Notes = (props) => {
  const context=useContext(NoteContext);
  const{notes,getnotes,editnote}=context;
  const {showalert}=props
  let history=useNavigate();
  useEffect(() => {
    if(localStorage.getItem('token')){
    getnotes()
    console.log("Token"+localStorage.getItem('token'))
    }
    else{
      history("/login")
    }
    //eslint-disable-next-line
  },[])
  const ref = useRef(null)
  const refClose = useRef(null)
  const [note, setnote] = useState({id: "", etitle: "", edescription: "", etag: ""})
  
  const updatenote=(currentNote)=>{
    ref.current.click()
    setnote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag:currentNote.tag})
  }
  const handleClick = (e)=>{ 
    editnote(note.id, note.etitle, note.edescription, note.etag)
    props.showalert("Note has been updated","success")
    refClose.current.click();
}

const onChange = (e)=>{
    setnote({...note, [e.target.name]: e.target.value})
}
  return (
    <>
    <AddNote showalert={showalert}/>
    <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">Launch demo modal</button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} minLength={5} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                                </div>
 
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length<5 || note.edescription.length<5} onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
    <div className='container row my-3'>
      <h2>Your Notes</h2>
      <div className="container">
      {notes.length===0 && 'No notes to display'}
      </div>
      {notes.map((note)=>{
        return <Noteitem key={note.id} note={note} updatenote={updatenote}/>
      })}
    </div>
    </>
  )
}

export default Notes
