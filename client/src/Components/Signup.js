import React, {useState} from 'react'
import { Link } from 'react-router-dom'

const Signup = () => {
    const [formData,setFormData] = useState({})
    
    const handleChange = (e)=>{
        setFormData({
         ...formData,
         [e.target.name]:e.target.value
        })
    
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        console.log(formData)
    }

  return (
    <div className='container my-container'>

        <h5>Sign Up!!</h5>
        
        <div className="column s8 l6">
        <form className="col s10" onSubmit={handleSubmit}> 
          <div className="column s12 m4">

          <div className="input-field col s12 m4 l3">
              <i className="material-icons prefix">person</i>
              <input required id="firstName" type="text" className="validate" name="firstName" onChange={ handleChange}/>
              <label htmlFor="firstName">First Name</label>
            </div>

            <div className="input-field col s12 m4 l3">
              <i className="material-icons prefix">person</i>
              <input required id="lastName" type="text" className="validate" name="lastName" onChange={ handleChange}/>
              <label htmlFor="lastName">Last Name</label>
            </div>
            
            <div className="input-field col s12 m4 l3">
              <i className="material-icons prefix">email</i>
              <input required id="email" type="email" className="validate" name="email" onChange={ handleChange}/>
              <label htmlFor="email">Email</label>
            </div>

            <div className="input-field col s12 m4 l3">
              <i className="material-icons prefix">lock</i>
              <input required id="icon_telephone" type="password" className="validate" name="password" onChange={ handleChange} />
              <label htmlFor="icon_telephone">Password</label>
            </div>
          </div>

          <h6>Already have an account? <Link to="/login">Login</Link></h6>   
          <button className="btn #0d47a1 blue darken-4" type="submit">Login</button>
        </form>
      </div>
    </div>
  )
}

export default Signup