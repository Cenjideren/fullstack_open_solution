import { useState, useEffect } from 'react'
import axios from 'axios'
import PersonForm from './Component/PersonForm.jsx'
import PersonList from './Component/PersonList.jsx'
import Filter from './Component/Filter.jsx'
import PersonsServices from './Services/Persons'
import Notification from './Component/Notification.jsx'




const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState('success')

  useEffect(()=>{
    console.log('fetching data')
    PersonsServices.
    getAll().then (previous => setPersons (previous))
  }, [])

  const addPerson =(event) => {
    event.preventDefault()

    const existingPerson = persons.find ( person => person.name ===newName)

    const phonebookItem ={
      name : newName,
      number : newNumber,
    }

  if (existingPerson) {
    const confirmUpdate = window.confirm(
      `${newName} is already in the phonebook. Replace the old number with the new one?`
    )

   if (confirmUpdate) {
      PersonsServices
        .update(existingPerson.id, phonebookItem)
        .then(updatedPerson => {
          setPersons(persons.map(p => p.id !== existingPerson.id ? p : updatedPerson))
          setMessage(`${newName}'s number was updated`)
          setMessageType ('success')
          setTimeout(() => setMessage(null), 5000)
        })
        .catch(error => {
          console.error('Update failed:', error)
          setMessage(`Failed to update ${newName}`)
          setMessageType ('error')
          setTimeout(() => setMessage(null), 5000)
        })
    }
  } else {
    PersonsServices
      .Add(phonebookItem)
      .then(newItem => {
        setPersons(persons.concat(newItem))
        setMessage(`${newItem.name} was added`)
        setMessageType ('success')
        setTimeout(() => setMessage(null), 5000)
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        console.error('Add failed:', error)
        setMessage('Failed to add person')
        setMessageType ('error')
        setTimeout(() => setMessage(null), 5000)
      })
  }
}



  const handleAddName = (event) => {
    console.log (event.target.value)
    setNewName (event.target.value)
  }

  const handleAddNumber = (event) => {
    console.log (event.target.value)
    setNewNumber (event.target.value)
  }

  const handleFilterName = (event) => {
    console.log (event.target.value)
    setFilterName (event.target.value)
  }

   const deletePerson = (id) => {
    const filteredPerson = persons.filter(person => person.id === id)
    const personName = filteredPerson[0].name
    const personId = filteredPerson[0].id
    if (window.confirm(`Delete ${personName} ?`)) {
      PersonsServices
        .remove(personId)
      console.log(`${personName} successfully deleted`)
      setMessage(
        `${personName} was successfully deleted`
      )
      setPersons(persons.filter(person => person.id !== personId))
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      <div>
        <h1>Phonebook</h1>
      </div>
      <Notification message={message} type={messageType} />
      <Filter filterName={filterName} setFilterName ={setFilterName} handleFilterName={handleFilterName}/>
      <PersonForm 
        newName ={newName}
        setNewName ={setNewName}
        newNumber ={newNumber}
        setNewNumber ={setNewNumber}
        addPerson = {addPerson}
        handleAddName = {handleAddName}
        handleAddNumber ={handleAddNumber}
        />
      <PersonList persons={persons} filterName={filterName} deletePerson= {deletePerson}/>
    </div>
    
  )
}

export default App