import { useState, useEffect } from "react";

const App = () => {

  const defaultCountiresString = 'Search for country information'
  const [query, setQuery] = useState('');
  const [countries,setCountries] = useState(defaultCountiresString)

  const handleQueryField = event => {
    console.log('Hakukenttä',event.target.value)

    setQuery(event.target.value) 
  }

  // const countriesToShow = 
  // const handleQuery = value => {}

  return (
    <div>
        find countries <input type="text" value={query} onChange={handleQueryField} />
        <div>
          {countries}
        </div>
    </div>
  );
}

export default App;
