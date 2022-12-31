
import mock from '../mock'

const data = {
    events: [
      {
        id:1,
        position:'Director',
        name:'Abhishek Gupta',
        email:'abhishek@email.com',
        password:'12345',
        class:1
      },
      {
        id:2,
        position:'Teacher',
        name:'Aman',
        email:'aman@email.com',
        password:'12345',
        class:1
      },
      {
        id:3,
        position:'Student',
        name:'Ganesh',
        email:'ganesh@email.com',
        password:'12345',
        class:1
      },
      {
        id:4,
        position:'Student',
        name:'Jhon',
        email:'jhon@email.com',
        password:'12345',
        class:1
      },
      {
        id:5,
        position:'Teacher',
        name:'Shyam',
        email:'shyam@email.com',
        password:'12345',
        class:2
      },
      {
        id:6,
        position:'Student',
        name:'Grijesh',
        email:'grijesh@email.com',
        password:'12345',
        class:2
      },
      {
        id:7,
        position:'Student',
        name:'Gri',
        email:'gri@email.com',
        password:'12345',
        class:2
      }
    ]
}
mock.onGet('/list').reply(() =>  {
    const user = JSON.parse(localStorage.getItem('user'))
    return user.position === 'Director' ? [200, [data.events]] : user.position === 'Teacher' ? [200, [data.events.filter(e => user.class === e.class && e.position === 'Student')]] : [200, [data.events.filter(e => user.class === e.class && e.position === 'Teacher')]]  
})

mock.onPost('/login').reply((e) => {
    const res = JSON.parse(e.data)
    const matcheddata = data.events.find((e) => e.email === res.email)
    if (matcheddata === undefined){
        return [400,{}]
    }
    if (matcheddata.password === res.password){
        return [200,matcheddata]
    }
    return [400,{}]
})
//   // ------------------------------------------------
//   // POST: Add member
//   // ------------------------------------------------

mock.onPost('/add').reply((e) => {
    const res = JSON.parse(e.data)
    data.events.push({...res, id:data.events[data.events.length - 1].id + 1})
    return [200,{}]
})
//   // ------------------------------------------------
//   // DELETE: Remove member
//   // ------------------------------------------------

mock.onDelete('/remove').reply((e) => {
    let { id } = e
    const res = id
    const matcheddata = data.events.find((e) => e.id === res)
    if (matcheddata === undefined){
        return [400,{}]
    } else { 
        data.events = data.events.filter((e) => e !== matcheddata)
        return [200, [data.events]]
        // return [200, [data.events.filter((e) => e !== matcheddata)]]
    }
})
