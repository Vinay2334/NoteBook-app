import NoteContext from './NoteContext';
import { useState } from 'react';

const NoteState = (props) => {
  const host="http://localhost:5000"
  const notesInitial=[]
    const [notes, setnotes] = useState(notesInitial);

    const getnotes=async()=>{
      const response=await fetch(`${host}/api/notes/fetchallnotes`,{
        method:'GET',
        headers:{
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        });
        const json=await response.json();
        console.log(json)
        setnotes(json)
    }
    const addnote=async(title,description,tags)=>{
      const response=await fetch(`${host}/api/notes/addnote`,{
        method:'POST',
        headers:{
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({title,description,tags})
        });
      const note=await response.json()
      console.log(note)
      setnotes(notes.concat(note))
    }
    const deletenote=async (id)=>{
      const response=await fetch(`${host}/api/notes/deletenote/${id}`,{
        method:'DELETE',
        headers:{
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        });
        const json= response.json();
        console.log(json)

      const newNotes=notes.filter((note)=>{return note._id!==id})
      setnotes(newNotes)
    }
    const editnote=async(id,title,description,tags)=>{
      const response=await fetch(`${host}/api/notes/updatenote/${id}`,{
        method:'PUT',
        headers:{
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({title,description,tags})
        });
        const json = await response.json(); 

         let newNotes = JSON.parse(JSON.stringify(notes))

      for (let index = 0; index < newNotes.length; index++) {
        const element = notes[index];
        if(element._id===id){
          newNotes[index].title = title;
          newNotes[index].description = description;
          newNotes[index].tags = tags; 
          break;
        }
      }
      setnotes(newNotes);
    }
  return (
  <NoteContext.Provider value={{notes,setnotes,addnote,deletenote,editnote,getnotes}}>
    {props.children}
  </NoteContext.Provider>
  )
  }

export default NoteState
