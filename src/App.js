import React, {useState,useEffect} from 'react'
import './App.css'
import axios from 'axios'

const rootURL = "https://mongo-test-one-api.onrender.com/"

export default function App(){
    const [name,setName] = useState("")
    const [age,setAge] = useState("")
    const [username,setUsername] = useState("")
    const [users,setUsers] = useState([])

    useEffect(() => {
        GetUsers()
    },[])

    function AddUser(){
        const url = rootURL + "put"
        const userData = {
            name: name,
            age: age,
            username: username
        }
        axios.post(url,userData).then((response) => {
            setUsers([...users,userData])
        })
    }

    function GetUsers(){
        const url = rootURL + "get"
        axios.get(url).then((response) => {
            setUsers(response.data)
        })
    }

    return(
        <div className='App'>
            <h1>Mongo Test One</h1>
            <input type="text" onChange={(e) => setName(e.target.value)} placeholder='Name'/><br /><br />
            <input type="text" onChange={(e) => setAge(e.target.value)} placeholder='Age'/><br /><br />
            <input type="text" onChange={(e) => setUsername(e.target.value)} placeholder='Username'/><br /><br />
            <button onClick={AddUser}>Add User</button><br />
            <h3>Users List ({users.length})</h3>

            {users.map((user,key) => {
                return(
                    <div key={key}>
                        <h4>{user.name} | {user.age} | {user.username}</h4>
                    </div>
                )
            })}
        </div>
    )
}