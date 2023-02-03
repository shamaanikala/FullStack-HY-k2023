import { useState, useEffect } from "react";

const App = ({dummyCountries}) => {

  const defaultHelpString = 'Search for country information'
  const tooManyString = 'Too many matches, specify another filter'
  const [query, setQuery] = useState('');
  const [searchHelp, setSearchHelp] = useState(null)
  const [countries,setCountries] = useState(null)

  const handleQueryField = event => {
    console.log('Hakukenttä',event.target.value)
    setQuery(event.target.value)
    handleSearchHelp(event.target.value)
  }

  const handleSearchHelp = queryValue => {
    const helper = queryValue.length === 0
      ? defaultHelpString
      : tooManyString
      setSearchHelp(helper)
  }

  // const countriesToShow = 
  // const handleQuery = value => {}

  return (
    <div>
        find countries <input type="text" value={query} onChange={handleQueryField} />
        <div>
          {searchHelp}
        </div>
        <div>
          {countries}
        </div>
    </div>
  );
}

export default App;
