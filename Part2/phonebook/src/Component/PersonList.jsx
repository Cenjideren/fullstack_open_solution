import Person from './Person.jsx'

const PersonList = ({ persons, filterName }) => {
  const filtered = persons.filter(person =>
    person.name.toLowerCase().includes(filterName.toLowerCase())
  )

  return (
    <ul>
      {filtered.map(person => (
        <Person key={person.id} person={person} />
      ))}
    </ul>
  )
}

export default PersonList
