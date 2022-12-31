import axios from "axios";
import { useRef,useState,useEffect,createContext } from "react";
import {useNavigate} from 'react-router-dom' 
// import users from './users.json'


const Login=()=>{
    

    const navigate=useNavigate()
    const [user,setUser]=useState('')
    const [pwd,setPwd]=useState('')
    const [errMsg,setErrMsg]=useState('')

    const handleSubmit=async (e)=>{
        e.preventDefault();
        try {
            const j = await axios.post('/login', {
                email:user,
                password:pwd
            })
            localStorage.setItem('user', JSON.stringify(j.data))
            navigate('/dashboard')
        } catch (error) {
            console.warn(error)
            setErrMsg('Incorrect credentials')
        }
    }

    return(<>
        <section className="loginFormContainer" >
            <h1>Sign in</h1>
            <form className="loginForm" onSubmit={handleSubmit}>
                <label htmlFor="username" >Email:</label>
                <input 
                    type='email' 
                    id='username'
                    placeholder="🖋 email name" 
                    value={user} 
                    onChange={(e)=>setUser(e.target.value)} 
                    autoFocus
                    required />
                <label htmlFor="password" >Password:</label>
                <input 
                    type='password' 
                    id='password' 
                    placeholder="🖊 password" 
                    value={pwd} 
                    onChange={(e)=>setPwd(e.target.value)} 
                    required />
                <span className={errMsg? "errMsg" : "offscreen" } aria-live='assertive'>{errMsg}</span>
                <button>Login</button>

            </form>
        </section>
        </>
    )
}

export default Login;