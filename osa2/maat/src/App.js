import axios from "axios";
import { useState, useEffect } from "react";

const ShowButton = ({id,selectedCountry, handleShowButton}) => {
  const countryName = selectedCountry.name.common
  console.log(countryName)
  return (
    <>
      <button key={id} onClick={() => handleShowButton(selectedCountry,countryName)}>show</button>
    </>
  )
}

const CountryName = ({selectedCountry,handleShowButton}) => {
  return (
    <>
      <div key={selectedCountry.fifa}>
        {selectedCountry.name.common}
        <ShowButton key={selectedCountry.fifa} selectedCountry={selectedCountry} handleShowButton={handleShowButton} />
      </div>
    </>
  )
}

const SingleCountryInformation = ({selectedCountry}) => {
  const country = selectedCountry
  // Object.values()
  //https://stackoverflow.com/questions/41486296/convert-object-to-array-in-javascript-react
  console.log(country.flags.png)
  return (
    <div>
      <h2>{country.name.common}</h2>
      <div>
        capital {country.capital[0]}<br />
        area {country.area}
      </div>
      <div>
        <h3>languages</h3>
        <div>
          <ul>
            {Object.values(country.languages).map(
              (lan,ind) => <li key={ind}>{lan}</li>
            )}
          </ul>
        </div>
      </div>
      <div>
        <img src={country.flags.png} alt={country.flags.alt} />
      </div>

    </div>
  )
}

const CountryList = ({selectedCountries,handleShowButton}) => {
  if (selectedCountries.length === 1) {
    return (
      <SingleCountryInformation selectedCountry={selectedCountries[0]} />
    )
  }
  if (selectedCountries.length > 10) {
    return (
      <div>Too many matches, specify another filter</div>
    )
  }
  // https://stackoverflow.com/questions/39549424/how-to-create-unique-keys-for-react-elements
  return (
    <div>
      {selectedCountries.map(
        (c,ind) => <CountryName key={ind} selectedCountry={c} handleShowButton={handleShowButton} />
      )}
    </div>
  )
}



const App = () => {

  const defaultInfoString = 'Search for country information'
  const [query, setQuery] = useState('');
  const [infoMessage, setInfoMessage] = useState(defaultInfoString)
  const [countries,setCountries] = useState([])
  const [selectedCountries,setSelectedCountries] = useState([])

  // koska vain get, joten ei tehtä vielä erillistä serviceä
  useEffect(() => {
    console.log('useEffect')
    axios
      .get('http://localhost:3001/countryData') // local
      //.get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log(response)
        console.log(response.data)
        setCountries(countries.concat(response.data))
      })
  },[])

  const selectCountries = (countries,queryValue) => {
    console.log(
      'valittu',countries.filter(
        country => country.name.common.includes(queryValue)
      )
    )
    if (queryValue.length === 0) {
      setSelectedCountries([])
    }
    else {
      const selected = countries.filter(
        country => country.name.common.includes(queryValue)
      )
      console.log('valittuja maita',selected.length)
      const selection = [].concat(
        countries.filter(
          //country => country.name.common.includes(queryValue)
          country => country.name.common.toLowerCase().includes(queryValue.toLowerCase())
        ))
      setSelectedCountries(selection)
      handleInfoMessage(queryValue,selection)
    }
    //console.log('valittuja maita ',selectedCountries.length)
  }

  const handleQueryField = event => {
    console.log('Hakukenttä',event.target.value)
    setQuery(event.target.value)
    selectCountries(countries,event.target.value)
    if (event.target.value.length === 0) {
      setInfoMessage(defaultInfoString)
    }
      
    //console.log('handleQueryField kutsuu handleInfoMsg',)
    //handleInfoMessage(event.target.value,selectedCountries)
  }


  const handleInfoMessage = (queryValue,countriesToShow) => {
    let helper = null
    console.log('aloitetaan handleInfoMsg',queryValue,countriesToShow.length)
    if (queryValue.length > 0 && countriesToShow.length !== 0) {
      helper = null
    }
    else if (queryValue.length > 0 && countriesToShow.length === 0) {
      console.log('mitään ei löydy')
      helper = `Search didn't find any matching country names.`
    }
    else helper = defaultInfoString
    console.log('helper',helper)
    setInfoMessage(helper)
  }

  const handleShowButton = (country,queryValue) => {
    setQuery(queryValue)
    selectCountries([country],queryValue)
  }

  return (
    <div>
        find countries <input type="text" value={query} onChange={handleQueryField} />
        <div>
          {infoMessage}
        </div>
        <div>
          <CountryList selectedCountries={selectedCountries} handleShowButton={handleShowButton} />
        </div>
    </div>
  );
}

export default App;
