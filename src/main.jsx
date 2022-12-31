import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import {BrowserRouter,Navigate,Route,Routes} from 'react-router-dom'
import './@fack-db'
import Login from './Login'
import Add from './Add'

ReactDOM.createRoot(document.getElementById('root')).render(
    // <App />
    <BrowserRouter>
        <Routes>
          <Route path='/' element={localStorage.getItem('user')? <Navigate to={'/dashboard'}/> : <Navigate to={'/login'}/>} ></Route>
          <Route path='/login' element={<Login/>} ></Route>
          <Route path='/dashboard' element={<App/>} ></Route>
          <Route path='/add' element={<Add/>} ></Route>
        </Routes>
    </BrowserRouter>
) 
