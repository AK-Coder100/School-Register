import { useEffect, useState } from 'react'
import './App.css'
import DataTable from 'react-data-table-component'
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom'

function App() {
  const navigate = useNavigate()
  const [data, setData] = useState([])
  const user = JSON.parse(localStorage.getItem('user'))
  const remove = async (id) => {
    try {
      const j = await axios.delete('/remove', {id:id})
      setData(j.data[0])
    } catch (error) {
      console.warn(error)
    }
  }

  const columns= [
  {
    name: <p style={{fontWeight:'700', fontSize:'large'}}>Name</p>,
    sortable: true,
    selector: row => row.name
  },
  {
    name: <p style={{fontWeight:'700', fontSize:'large'}}>Position</p>,
    sortable: true,
    selector: row => row.position
  },
  {
    name: <p style={{fontWeight:'700', fontSize:'large'}}>Action</p>,
    selector: (row) => <button onClick={() => remove(row.id)} disabled={row.id === user.id ? true : false} >Remove</button>
  }
]

const columns2= [
  {
    name: <p style={{fontWeight:'700', fontSize:'large'}}>Name</p>,
    sortable: true,
    selector: row => row.name
  },
  {
    name: <p style={{fontWeight:'700', fontSize:'large'}}>Position</p>,
    sortable: true,
    selector: row => row.position
  }
]
useEffect(() => {
  const load = async() => {
  try {
    const j = await axios.get('/list')
    setData(j.data[0])
  } catch (error) {
    console.warn(error)
  }
}
load()
}, [])
  return (
    localStorage.getItem('user') ? <div className="App">
    {user.position === 'Director' ? <button onClick={() => navigate('/add')} style={{width:'200px', background:'green', margin:'3px'}}>+ ADD</button> : <></>}
      <DataTable
          // noHeader
          pagination
          data={data}
          columns={ user.position === 'Director'  ? columns : columns2 }
          className='react-dataTable'
        />
        <button onClick={() => {
          localStorage.removeItem('user')
          navigate('/login')
        }} style={{width:'200px', background:'red', margin:'3px'}}>Logout</button>
    </div> : <Navigate to={'/login'} />
  )
}

export default App
