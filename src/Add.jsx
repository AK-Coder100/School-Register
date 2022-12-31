import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Add() {
  const navigate = useNavigate()
 
  const handleSubmit = async(e) => {
    e.preventDefault();
        try {
            await axios.post('/add', {
                name:e.target[0].value,
                email:e.target[1].value,
                position:e.target[2].value,
                class:e.target[3].value,
                password:e.target[4].value
            })
            navigate('/dashboard')
        } catch (error) {
            console.warn(error)
        }
  }
useEffect(() => {
  if(localStorage.getItem('user') === null) {
    navigate('/login')
  }
}, [])
  return (
    <div > 
        <button  onClick={() => navigate('/dashboard')} style={{margin:'4px'}} > Go Back </button>
        <h2>Add Member</h2>
        <form className="loginForm" onSubmit={handleSubmit}>
                <label htmlFor="name" >Name:</label>
                <input 
                    type='name' 
                    id='name'
                    placeholder="🖋 Fullname" 
                    autoFocus
                    required />
                    <br/>

                <label htmlFor="username" >Email:</label>
                <input 
                    type='email' 
                    id='username'
                    placeholder="🖋 user name" 
                    required />
                    <br/>
                
                <label htmlFor="role-select" >Position:</label>
                <select name="role" id="role-select" required>
                    <option value="Director">Director</option>
                    <option value="Teacher">Teacher</option>
                    <option value="Student">Student</option>
                </select>
                <br/>
                
                <label htmlFor="class" >Class:</label>
                <select name="class" id="class">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">Pre-Matric</option>
                    <option value="10">Metric</option>
                    <option value="11">Eleventh</option>
                    <option value="12">Inter</option>
                </select>
                <br/>

                <label htmlFor="password" >Password:</label>
                <input 
                    type='password' 
                    id='password' 
                    placeholder="🖊 password" 
                    required />
                    <br/>
                <button>Add</button>

            </form>
    </div>
  )
}

export default Add
