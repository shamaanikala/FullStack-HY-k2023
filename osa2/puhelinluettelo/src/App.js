import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

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
        name: newName
      }
      setPersons(persons.concat(personObject))
      setNewName('')
    }
  }

  const handleNameField = (event) => {
    console.log('nimisyöte',event.target.value)
    setNewName(event.target.value)
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
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>{persons.map(p => <p key={p.name}>{p.name}</p>)}</div>
    </div>
  );
}

export default App;
