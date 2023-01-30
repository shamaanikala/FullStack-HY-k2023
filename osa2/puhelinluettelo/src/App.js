import { useState } from "react";

const Filter = ({value,onChangeHandler}) => {
  return (
    <div>
        <p>
          filter shown with <input value={value} onChange={onChangeHandler} />
        </p>
    </div>
  )
}

const PersonForm = ({onSubmit,nameValue,nameHandler,numberValue,numberHandler}) => {
  return (
    <form onSubmit={onSubmit}>
        <div>
          name: <input value={nameValue} onChange={nameHandler} />
        </div>
        <div>
          number: <input value={numberValue} onChange={numberHandler} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setFilterValue] = useState('')
  const [showAll, setShowAll] = useState(true)

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

  const personsToShow = showAll
    ? persons
    : persons.filter(p => p.name.includes(filterValue))

  const handleFilter = (value) => {
    console.log(value,value.length)
    if (value.length === 0) {
      setFilterValue('')
      setShowAll(true)
    }
    else {
      setFilterValue(value)
      setShowAll(false)
    }

  }

  const handleFilterField = (event) => {
    console.log('filter',event)
    handleFilter(event.target.value)
  }

  

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filterValue} onChangeHandler={handleFilterField} />
      <h2>add a new</h2>
      <div>debug: {newName}</div>
      <PersonForm 
        onSubmit={addPerson}
        nameValue={newName}
        nameHandler={handleNameField}
        numberValue={newNumber}
        numberHandler={handleNumberField}
      />
      
      <h2>Numbers</h2>
      <div>{personsToShow.map(p => <p key={p.name}>{p.name} {p.number}</p>)}</div>
    </div>
  );
}

//<div>{persons.map(p => <p key={p.name}>{p.name} {p.number}</p>)}</div>
    
{/* <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameField} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberField} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form> */}
export default App;
