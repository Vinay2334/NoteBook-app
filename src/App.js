import './App.css';
import React,{useState} from 'react';
import Navbar from './component/Navbar';
import About from './component/About'
import{
  BrowserRouter as Router,
  Routes, Route
} from "react-router-dom";
import { Home } from './component/Home';
import NoteState from './Context/notes/NoteState';
import Alert from './component/Alert';
import Login from './component/Login';
import Signup from './component/Signup';
function App() {
  const [alert, setalert] = useState(null)

  const showalert=(message,type)=>{
    setalert({
      msg:message,
      type:type
    })
    setTimeout(()=>{
      setalert(null)
    },1500)
  }
  return (
    <>
    <NoteState>
    <Router>
    <Navbar/>
    <Alert alert={alert}/>
    <div className="container">
      <Routes>
      <Route path="/" element={<Home showalert={showalert}/>} />
      <Route exact path="/about" element={<About/>}>
      </Route>
      <Route exact path="/login" element={<Login showalert={showalert}/>}></Route>
        <Route exact path="/signup" element={<Signup showalert={showalert}/>}></Route>
      </Routes>
      </div>
      </Router>
      </NoteState>
    </>
  );
}

export default App;
