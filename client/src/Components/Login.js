import React, { useState } from "react";
import { Link,useNavigate } from 'react-router-dom';


const Login = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({})

  const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]:e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData)
    navigate("/")
  }

  return (
    <div className="container my-container">
      <h5>Login!!</h5>
      <div className="column s8 l6">
        <form className="col s10" onSubmit={handleSubmit}> 
          <div className="column s12 m4">
            
            <div className="input-field col s12 m4 l3">
              <i className="material-icons prefix">email</i>
              <input required id="email" type="email" className="validate" name="email" onChange={handleChange}/>
              <label htmlFor="email">Email</label>
            </div>

            <div className="input-field col s12 m4 l3">
              <i className="material-icons prefix">lock</i>
              <input required id="icon_telephone" type="password" className="validate" name="password" onChange={handleChange} />
              <label htmlFor="icon_telephone">Password</label>
            </div>
          </div>

           <h6>Don't have an account? <Link to="/signup">Signup</Link></h6> 
          <button className="btn #0d47a1 blue darken-4" type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
