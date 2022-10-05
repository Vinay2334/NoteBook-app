import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'

const Login = (props) => {
    const [Credentials, setCredentials] = useState({password:"",email:""})
    let history=useNavigate()
    const handleSubmit=async(e)=>{ 
        e.preventDefault();
        const response=await fetch(`http://localhost:5000/api/auth/login`,{
            method:'POST',
            headers:{
              'Content-Type': 'application/json',
            },
            body:JSON.stringify({email:Credentials.email,password:Credentials.password})
            });
            const json=await response.json()
            console.log(json)
            if(json.success){
              //Save the auth token and redirect
              localStorage.setItem('token',json.authtoken)
              history('/')
              props.showalert("Logged in Successfully","success")
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
  <div className="form-group">
    <label htmlFor="exampleInputEmail1">Email address</label>
    <input type="email" className="form-control" id="email" value={Credentials.email} name="email" aria-describedby="emailHelp"onChange={onChange} placeholder="Enter email"/>
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputPassword1">Password</label>
    <input type="password" className="form-control" id="password" value={Credentials.password} name="password"onChange={onChange} placeholder="Password"/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default Login