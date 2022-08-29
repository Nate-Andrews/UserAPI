import React, { useState, useEffect} from "react";
import './App.css';
import Axios from 'axios'

function App() {

  const [listOfUsers, setListOfUsers] = useState([])

  const [name, setUserName] = useState('')
  const [dateOfBirth, setUserDateOfBirth] = useState('')
  const [phone, setUserPhone] = useState('')
  const [ssn, setUserSSN] = useState('')

  const [newName, setNewUserName] = useState('')
  const [newDateOfBirth, setNewUserDateOfBirth] = useState('')
  const [newPhone, setNewUserPhone] = useState('')
  const [newSSN, setNewUserSSN] = useState('')

  const submitUser = () =>{
    Axios.post('http://localhost:8080/users/', {
      name, 
      dateOfBirth, 
      phone, 
      ssn,
    }).then((response) =>{
      alert('User created')
    })
  };

  const getUsers = () =>{
    Axios.get('http://localhost:8080/users/').then((response) =>{
      setListOfUsers(response.data)
    })
  }

  const deleteUser = (id) =>{
    Axios.delete(`http://localhost:8080/users/${id}`).then((response) =>{
      alert('User deleted')
    })
  }

  const updateUser = (id) =>{
    Axios.patch(`http://localhost:8080/users/${id}`, {
      id: id, 
      name: newName,
      dateOfBirth: newDateOfBirth,
      phone: newPhone,
      ssn: newSSN,
    }).then((response) =>{
      alert('User updated')
    })
  }

  return (
    <div className="App">
      <h1>
        User Application
      </h1>

      <div className="entry">
      <label> Name:</label>
      <input type ="text" name="name" onChange={(e)=> {setUserName(e.target.value)}}/>
      </div>

      <div className="entry">
      <label> Date of Birth:</label>
      <input type ="text" name="dateOfBirth" onChange={(e)=> {setUserDateOfBirth(e.target.value)}}/>
      </div>

      <div className="entry">
      <label> Phone:</label>
      <input type ="text" name="phone" onChange={(e)=> {setUserPhone(e.target.value)}}/>
      </div>

      <div className="entry">
      <label> SSN:</label>
      <input type ="text" name="ssn" onChange={(e)=> {setUserSSN(e.target.value)}}/>
      </div>

      <button onClick={getUsers}>Get</button>
      <button onClick={submitUser}>Submit</button>

      <div>
        {listOfUsers.map((user) =>{
          return(
            <div>
              <div className="entry">
              <label> Name:</label>
              <input type ="text" name="name" placeholder= {user.name}onChange={(e)=> {setNewUserName(e.target.value)}}/>
              </div>
              <div className="entry">
              <label> Date of Birth:</label>
              <input type ="text" name="dateOfBirth" placeholder= {user.dateOfBirth}onChange={(e)=> {setNewUserDateOfBirth(e.target.value)
              }}/>
              </div>
              <div className="entry">
              <label> Phone:</label>
              <input type ="text" name="phone" placeholder= {user.phone} onChange={(e)=> {setNewUserPhone(e.target.value)}}/>
              </div>
              <div className="entry">
              <label> SSN:</label>
              <input type ="text" name="ssn" placeholder= {user.ssn} onChange={(e)=> {setNewUserSSN(e.target.value)}}/>
              </div>
              <button onClick={() =>{updateUser(user._id)}}>Update</button>
              <button onClick={() =>{deleteUser(user._id)}}>Delete</button>
              <h1>--------------------</h1>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default App;
