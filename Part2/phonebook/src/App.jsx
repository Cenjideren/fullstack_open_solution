import { useState } from 'react'
import PersonForm from './Component/PersonForm.jsx'
import PersonList from './Component/PersonList.jsx'
import Filter from './Component/Filter.jsx'



const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  const addPerson =(event) => {
    event.preventDefault()
    if (persons.some(person => newName === person.name)) {
    alert (`${newName} is already added to the phonebook`)
    return}

    const phonebookItem ={
      name : newName,
      number : newNumber,
    }

    setPersons (persons.concat(phonebookItem))
    setNewName ('')
    setNewNumber ('')

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

  return (
    <div>
      <div>
        <h1>Phonebook</h1>
      </div>
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
      <PersonList persons={persons} filterName={filterName} />
    </div>
  )
}

export default App