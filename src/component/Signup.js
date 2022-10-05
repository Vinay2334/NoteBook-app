import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = (props) => {
  const [Credentials, setCredentials] = useState({name:"",password:"",email:"",cpassword:""})
  let history=useNavigate()

  const handleSubmit=async(e)=>{
    e.preventDefault();
    const{name,email,password}=Credentials
    const response=await fetch(`http://localhost:5000/api/auth/createuser`,{
        method:'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body:JSON.stringify({name,email,password})
        });
        const json=await response.json()
        console.log(json)
        if(json.success){
          localStorage.setItem('token',json.authtoken)
          history('/')
          props.showalert("Account created successfully","success")
        }
        else{
          props.showalert("Invalid Credentials!","danger")
        }
}

const onChange = (e)=>{
    setCredentials({...Credentials, [e.target.name]: e.target.value})
}
  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
  <div className="form-group mb-3">
    <label htmlFor="name">Name</label>
    <input type="text" className="form-control" id="name" name="name" onChange={onChange} aria-describedby="emailHelp" placeholder="Enter email"/>
  </div>
  <div className="form-group mb-3">
    <label htmlFor="email">Email address</label>
    <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp" placeholder="Enter email"/>
  </div>
  <div className="form-group">
    <label htmlFor="password">Password</label>
    <input type="password" className="form-control" id="password" name="password" onChange={onChange} placeholder="Password" required minLength={5}/>
  </div>
  <div className="form-group">
    <label htmlFor="cpassword">Confirm Password</label>
    <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} placeholder="Password" required minLength={5}/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default Signup