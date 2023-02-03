import { useState, useEffect } from "react";

const App = () => {

  const [query, setQuery] = useState('');
  const [countries,setCountries] = useState('Search for country information')

  const handleQueryField = event => {
    console.log('Hakukenttä',event.target.value)
    setQuery(event.target.value)
  }

  return (
    <div>
        find countries <input type="text" value={query} onChange={handleQueryField} />
    </div>
  );
}

export default App;
