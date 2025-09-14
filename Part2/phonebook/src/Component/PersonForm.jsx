
const PersonForm =({newName,setNewName,newNumber,setNewNumber,addPerson,handleAddName,handleAddNumber}) => 
    (
  <form onSubmit={addPerson}>
    <h2>Add a new</h2>
    <div>
      name: <input value={newName} onChange={handleAddName} />
    </div>
    <div>
      number: <input value={newNumber} onChange={handleAddNumber} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

export default PersonForm
