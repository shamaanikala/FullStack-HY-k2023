import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  // TODO 29.1.2023 19.52
  // TODO: Koska nimiä käytetään id:nä, niin
  // lisää tarkistus, että nimet pysyvät yksikäsitteisinä
  // tai lisää id:t, joilla erottaa täyskaimat toisistaan.
  // Reactille on pakko olla yksikäsitteinen key
  const addPerson = (event) => {
    console.log('Lisätään henkilö',event)
    event.preventDefault()
    // olisiko filter tyylikkäämpi eli jos filter tuottaa epätyhjän taulukon
    console.log(persons.filter(p => p.name === newName).length)
    console.log('ehto',persons.findIndex((elem) => {console.log(elem.name)}))
    if (persons.findIndex((elem) => elem.name === newName) !== -1) {
      console.log('if-lauseessa')
      alert(`${newName} is already added to phonebook`)

      }
    else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameField = (event) => {
    console.log('nimisyöte',event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberField = (event) => {
    console.log('numerosyöte',event.target.value)
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>debug: {newName}</div>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameField} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberField} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>{persons.map(p => <p key={p.name}>{p.name} {p.number}</p>)}</div>
    </div>
  );
}

export default App;
