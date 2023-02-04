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

const SingleCountryInformation = ({selectedCountry,capitalWeather,getCapitalWeather}) => {
  console.log('Aloitetaan SingleCountryInformation piirto')
  const country = selectedCountry
  // Object.values()
  //https://stackoverflow.com/questions/41486296/convert-object-to-array-in-javascript-react
  console.log(country.flags.png)
  if (capitalWeather === null || capitalWeather.countryName !== country.name.common) {
    getCapitalWeather(country)
  }
  if (capitalWeather === null) {
    return (
      <div>
        <h1>{country.name.common}</h1>
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
        <div>
          <h2>Weather in {country.capital[0]}</h2>
          <div><i>Data missing</i></div>
        </div>
      </div>
    )
  }
  else {
  return (
    <div>
      <h1>{country.name.common}</h1>
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
      <div>
        <h2>Weather in {country.capital[0]}</h2>
        <div>temperature {capitalWeather.temp >= 0 ? `+${capitalWeather.temp}` : `${capitalWeather.temp}`} Celsius (feels like {capitalWeather.feels_like} Celsius)</div>
        <div>SÄÄKUVA</div>
        <div>TUULI</div>
      </div>
    </div>
  )
  }
}
     
const CountryList = ({selectedCountries,handleShowButton,capitalWeather,getCapitalWeather}) => {
  if (selectedCountries.length === 1) {
    return (
      <SingleCountryInformation selectedCountry={selectedCountries[0]} capitalWeather={capitalWeather} getCapitalWeather={getCapitalWeather} />
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
  const [capitalWeather, setCapitalWeather] = useState(null)

  const api_key = process.env.REACT_APP_API_KEY

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


  // 4.2.2023 12.06
  // Kuinka hakea pääkaupunkien säätietoja https://openweathermap.org
  // 1. Muuta pääkaupungin nimi koordinaateiksi (https://openweathermap.org/api/geocoding-api )
  // http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
  //
  // 2. Hae säätiedot (https://openweathermap.org/current )
  // https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
  
  // ei voi return!
  // Ei jaksa säätää tilojen kanssa, joten tehdään kaikki alempana yhdessä funktiossa
  // const getCapitalCoordinates = country => {
  //   const capitalName = country.capital[0]
  //   console.log(`Haetaan pääkaupungin ${capitalName} koordinaatit`)
  //   axios
  //     .get(`http://api.openweathermap.org/geo/1.0/direct?q=${capitalName}&limit=1&appid=${api_key}`)
  //     .then(response => {
  //       console.log('Koordinaatit haettu')
  //       console.log(response)
  //       console.log(response.data) // geodata on taulukossa
  //       console.log('Lat',response.data[0].lat)
  //       console.log('Lon',response.data[0].lon)
  //       return response.data[0]
  //     })

  // }

  // 4.2.2023 13.20 looppaa, eli tila, joka kertoo onko tiedot jo haettu
  // tarkistetaan myös säätietojen dt kentästä, että onko tieto yli 5 min vanha
  // JSONnin aikaleimasta puuttuu 1000, joten se on sekunteina
  const getCapitalWeather = country => {
    const countryName = country.name.common
    const capitalName = country.capital[0]

    console.log('Tarkistetaan, onko jo pääkaupungin tietoja, jos on niin ei haeta turhaan')
    if (capitalWeather !== null
      && capitalWeather.countryName === countryName 
      && capitalWeather.capitalName === capitalName
      && (Date.now() - capitalWeather.timestamp*1000)/(1000*60) < 10) {
      console.log('Tiedot on jo haettu')
      // console.log('timestamp',capitalWeather.timestamp)
      // console.log('Date.now()',Date.now())
      // console.log('Tietojen ikä (ms):',Date.now() - capitalWeather.timestamp*1000)
      // console.log('Tietojen ikä (s):',((Date.now() - capitalWeather.timestamp*1000)/1000))
      console.log('Tietojen ikä (min):',((Date.now() - capitalWeather.timestamp*1000)/(1000*60)))
    }
    else {
    console.log(`Haetaan säätiedot ${country.name.common} pääkaupungille ${capitalName}`)
    //let geo_coords = {"lat" : 0.0, "lon": 0.0} //default
    let geo_coords = null //aluksi näin
    axios
      .get(`http://api.openweathermap.org/geo/1.0/direct?q=${capitalName}&limit=1&appid=${api_key}`)
      .then(response => {
        if (response.status === 200) {
          console.log('Koordinaatit haettu')
          console.log(response)
          console.log(response.data) // geodata on taulukossa
          console.log('Lat',response.data[0].lat)
          console.log('Lon',response.data[0].lon)
          geo_coords = {...response.data[0]}
          console.log(geo_coords)
          console.log(`Haetaan säätä koordinaateista (lat,lon) = (${geo_coords.lat},${geo_coords.lon})`)
          console.log('Simuloidaan GET osoite:',`https://api.openweathermap.org/data/2.5/weather?lat=${geo_coords.lat}&lon=${geo_coords.lon}&units=metric&appid={API key}`)
          // ei anneta url:ssä mode param, joten saadaan default JSON
          // laitetaan units=metric, jotta saadaan varmasti Celsius, default on Kelvin!
          axios
            .get(`https://api.openweathermap.org/data/2.5/weather?lat=${geo_coords.lat}&lon=${geo_coords.lon}&units=metric&appid=${api_key}`)
            .then(response=> {
              if (response.status === 200) {
                const data = response.data
                console.log('Säätiedot haettu',`${capitalName}`)
                console.log('response',response)
                console.log('response.data',response.data)
                console.log('Sääobjekt, (taulukko)',response.data.weather)
                console.log(`Sää ${response.data.weather[0].main},${response.data.weather[0].description},${response.data.weather[0].icon}`)
                console.log(`Lämpötila: ${data.main.temp} (tuntuu ${data.main.feels_like})`)
                console.log(`Tuuli: ${data.wind.speed}`)
                const capitalWeatherObject = {
                  countryName: countryName,
                  capitalName: capitalName,
                  temp: data.main.temp,
                  feels_like: data.main.feels_like,
                  icon: data.weather[0].icon,
                  alt: data.weather[0].main,
                  description: data.weather[0].description,
                  wind: data.wind.speed,
                  timestamp: data.dt
                }
                console.log('säätietoobj',capitalWeatherObject)
                setCapitalWeather(capitalWeatherObject)
                return capitalWeatherObject
              }
            })
          }
      })
      
    }
    //return capitalWeather
  }

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
          <CountryList 
            selectedCountries={selectedCountries}
            handleShowButton={handleShowButton}
            capitalWeather={capitalWeather}
            getCapitalWeather={getCapitalWeather} />
        </div>
    </div>
  );
}

export default App;
