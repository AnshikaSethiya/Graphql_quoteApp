import { useMutation } from '@apollo/client'
import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { SIGNUP_USER } from '../graphqlOperations/Mutations'

const Signup = () => {
    const [formData,setFormData] = useState({})
    const [signupUser,{loading, error, data}] = useMutation(SIGNUP_USER)

    if(loading){
        return (
            <div className="preloader-wrapper big active">
              <div className="spinner-layer spinner-blue spinner">
                <div className="circle-clipper left">
                  <div className="circle"></div>
                </div>
                <div className="gap-patch">
                  <div className="circle"></div>
                </div>
                <div className="circle-clipper right">
                  <div className="circle"></div>
                </div>
              </div>
            </div>
          );
    }

    if(error){ console.log(error.message) }
    
    const handleChange = (e)=>{
        setFormData({
         ...formData,
         [e.target.name]:e.target.value
        })
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        signupUser({
            variables:{
                userNew:formData
            }
        })
        // console.log(formData)
    }

  return (
    <div className='container my-container'>

        {error && <div className='red card-panel'>{error.message}</div>}

        {data && data.user && <div className='green card-panel'>{data.user.firstName} signed up successfully!! <p>You can login now.</p></div>}

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
          <button className="btn #0d47a1 blue darken-4" type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  )
}

export default Signup