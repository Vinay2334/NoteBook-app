import React ,{useContext,useState}from 'react'
import NoteContext from "../Context/notes/NoteContext";

const AddNote = (props) => {
  const context=useContext(NoteContext);
  const{addnote}=context;
  const [note,setnote]=useState({title:"",description:"",tags:""})
  const handleClick=(e)=>{
    e.preventDefault()
    addnote(note.title,note.description,note.tags);
    setnote({title:"",description:"",tags:""})
    props.showalert("Note added successfully","success")
  }
  const onChange=(e)=>{
    setnote({...note,[e.target.name]:e.target.value})
  }
  return (
    <div>
        <div className="container my-3">
      <h2>Add a Note</h2>
      <form>
  <div className="mb-3">
    <label htmlFor="title" className="form-label">Title</label>
    <input type="text" className="form-control" id="title" value={note.title} name="title" onChange={onChange} minLength={5} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="description" className="form-label">Description</label>
    <input type="text" className="form-control" id="description" value={note.description} name="description" onChange={onChange} minLength={5} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="tag" className="form-label">Tags</label>
    <input type="text" className="form-control" id="tags" value={note.tags} name="tags" onChange={onChange}/>
  </div>
  <button disabled={note.title.length<5||note.description.length<5} type="submit" className="btn btn-primary"onClick={handleClick}>Submit</button>
</form>
</div>
    </div>
  )
}

export default AddNote