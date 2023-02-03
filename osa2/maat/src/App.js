import axios from "axios";
import { useState, useEffect } from "react";

const CountryName = ({selectedCountry}) => {
  return (
    <>
      <p key={selectedCountry.fifa}>{selectedCountry.name.common}</p>
    </>
  )
}

const CountryList = ({selectedCountries}) => {
  return (
    <div>
      {selectedCountries.map(
        c => <CountryName key={c.id} selectedCountry={c} />
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

  const selectCountries = (countries,query) => {
    console.log('selectCountries',countries[1])
    setSelectedCountries([].concat(
      countries[1]
    ))
  }

  const handleQueryField = event => {
    console.log('Hakukenttä',event.target.value)
    setQuery(event.target.value)
    selectCountries(countries,event.target.value)
    handleInfoMessage(event.target.value,selectedCountries)
  }


  const handleInfoMessage = (queryValue,countriesToShow) => {
    let helper = defaultInfoString
    if (queryValue.length > 0) {
      const helper = countriesToShow.length > 10
        ? tooManyInfoString
        : null
    }
    console.log('helper',helper)
    setInfoMessage(helper)
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
