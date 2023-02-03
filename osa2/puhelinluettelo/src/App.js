import { useState, useEffect } from "react";
import personService from './services/persons'

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

const Person = ({person,removePerson}) => {
  console.log('renderöidään henkilö',person)
  // muista key <button>ille
  return (
    <p>
      {person.name} {person.number}
      <button key={person.id} onClick={removePerson}>delete</button>
    </p>
  )
}

const Persons = ({personsToShow, removePerson }) => {
  console.log('Henkilöiden piirto',personsToShow)

  return (
    <div>
      {personsToShow.map(p => <Person key={p.name} person={p} removePerson={() => removePerson(p.id)} />)}
    </div>
  )
}

const Notification = ({message, className }) => {
  if (message === null) {
    return null
  }
  console.log('Piirretään Notification',message,className)
  return (
    <div className={className}>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setFilterValue] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [notificationMessage, setNotificationMessage] = useState(null)//useState('something noteworthy happened...')
  // notificationType: error, numberUpdateSuccess, additionSuccess
  const [notificationType, setNotificationType] = useState('')

  useEffect(() => {
    console.log('useEffect')
    personService
      .getAll()
      .then(initialPersons => {
        console.log('promise fulfilled - tietokanta haettu')
        setPersons(initialPersons)
      })
  }, []) // tyhjä taulukko toisena eli suoritetaan vain kerran

  const addPerson = (event) => {
    console.log('Lisätään henkilö',event)
    event.preventDefault()
    // olisiko filter tyylikkäämpi eli jos filter tuottaa epätyhjän taulukon
    console.log(persons.filter(p => p.name === newName).length)
    //console.log('ehto',persons.findIndex((elem) => {console.log(elem.name)}))
    //if (persons.findIndex((elem) => elem.name === newName) !== -1) {
    const dublicateName = persons.filter(p => p.name === newName).length > 0
    const dublicateNumber = persons.filter(p => p.number === newNumber).length > 0
    if (dublicateName && dublicateNumber) {
      // console.log('if-lauseessa, samanniminen löydetty!')
      // if (!persons.filter(p => p.number === newNumber).length > 0) {
      //   if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
      //     console.log('Vaihdetaan puelinnumero')

      //   }
      //   else console.log('Ei vaihdeta')
      // }
      console.log('Myös numero sama -> alert ja pois')
      //alert(`${newName} is already added to phonebook`)
      setNotificationType('error')
      setNotificationMessage(
        `${newName} already exists in the phonebook!`
        )
        setTimeout(() => {
          setNotificationMessage(null)
          setNotificationType(null)
        },5000)
      }
    else if (dublicateName && !dublicateNumber) {
      console.log('sama nimi ja eri numero -> vaihtokysely')
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        console.log('Vaihdetaan puelinnumero')
        // id yksikäsitteisen nimen kautta updatea varten
        const person = persons.find(p => p.name === newName)
        const id = person.id
        const updatedPerson = {...person, number: newNumber }

        personService
          .update(id,updatedPerson).then(returnedPerson => {
            setPersons(persons.map(p => p.id !== id ? p : returnedPerson))
            setNotificationType('updateSuccess')
            setNotificationMessage(
              `Updated the phonenumber of ${newName}`
              )
              setTimeout(() => {
                setNotificationMessage(null)
                setNotificationType(null)
              },5000)
          })
          .catch(error => {
            setNotificationType('error')
            setNotificationMessage(
              `Something went wrong while updating the phone number of ${newName}: ${{...error}}`
            )
            setTimeout(() => {
              setNotificationMessage(null)
              setNotificationType(null)
            }, 5000)
            // alert(
            //   `Somethng went wrong when updating the phone number: ${{...error}}`
            // )
          })
      }
        else console.log('Ei vaihdeta')
    }
    else {
      console.log('Lisätään uusi henkilö')
      const personObject = {
        name: newName,
        number: newNumber
      }
      personService
        .create(personObject)
        .then(returnedPersons => {
          console.log(returnedPersons)
          setPersons(persons.concat(returnedPersons))
          setNotificationType('additionSuccess')
          setNotificationMessage(
            `Added ${newName}`
            )
            setTimeout(() => {
              setNotificationMessage(null)
              setNotificationType(null)
            },5000)
          })

          setNewName('')
          setNewNumber('')
              }
  }

  const removePerson = id => {
    const removed = persons.find(p => p.id == id)
    console.log(`Yritetään poistaa henkilö ${removed.name}`)
    if(window.confirm(`Delete ${removed.name} ?`)) {
      console.log(`TODO - poistetaan henkilö ${removed.name} tietokannasta.`)
      personService
        .remove(id).then(response => {
          console.log('setPersons')
          if (response.status === 200) {
            console.log('Henkilö poistettu onnistuneesti')
            setPersons(persons.filter(p => p.id !== id))
            setNotificationType('deleteSuccess')
            setNotificationMessage(
              `Deleted ${removed.name}`
            )
            setTimeout(() => {
              setNotificationMessage(null)
              setNotificationType(null)
            },5000)
          }
          //setPersons(returnedPersons)
          //setPersons(persons.map(p => p.id !== id ? p : returnedPersons))
          //console.log('ilman setPersons')
        })
        console.log('poistettu, tila: ',persons,id)
    }
    else console.log(`Ei poisteta henkilöä ${removed.name}.`)

    console.log('removePerson loppujutut')
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

  //<div>debug: {newName}</div>

  return (
    <div>
      <Notification message={notificationMessage} className={notificationType} />
      <h2>Phonebook</h2>
      <Filter value={filterValue} onChangeHandler={handleFilterField} />
      <h2>add a new</h2>
      
      <PersonForm 
        onSubmit={addPerson}
        nameValue={newName}
        nameHandler={handleNameField}
        numberValue={newNumber}
        numberHandler={handleNumberField}
      />
      
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} removePerson={removePerson} />
    </div>
  );
}

    
export default App;
