import axios from "axios";
import { useState, useEffect } from "react";

const CountryName = ({selectedCountry}) => {
  return (
    <>
      <div key={selectedCountry.fifa}>{selectedCountry.name.common}</div>
    </>
  )
}

const CountryList = ({selectedCountries}) => {
  if (selectedCountries.length > 10) {
    return (
      <div>Too many matches, specify another filter</div>
    )
  }
  // https://stackoverflow.com/questions/39549424/how-to-create-unique-keys-for-react-elements
  return (
    <div>
      {selectedCountries.map(
        (c,ind) => <CountryName key={ind} selectedCountry={c} />
      )}
    </div>
  )
}

const App = () => {

  const defaultInfoString = 'Search for country information'
  const tooManyInfoString = 'Too many matches, specify another filter'
  const [query, setQuery] = useState('');
  const [infoMessage, setInfoMessage] = useState(defaultInfoString)
  const [countries,setCountries] = useState([])
  const [selectedCountries,setSelectedCountries] = useState([])

  // koska vain get, joten ei tehtä vielä erillistä serviceä
  useEffect(() => {
    console.log('useEffect')
    axios
      .get('http://localhost:3001/countryData')
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
          country => country.name.common.includes(queryValue)
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

  // const handleCountryFilter = (queryValue,countries,countriesToShow) => {
    
  // }

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

  const handleCountryListRender = selectedCountries => {

  }
  // const countriesToShow = 
  // const handleQuery = value => {}

  return (
    <div>
        find countries <input type="text" value={query} onChange={handleQueryField} />
        <div>
          {infoMessage}
        </div>
        <div>
          <CountryList selectedCountries={selectedCountries} />
        </div>
    </div>
  );
}

export default App;
