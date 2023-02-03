import { useState, useEffect } from "react";

const App = () => {

  const [query, setQuery] = useState(null);

  return (
    <div>
      <p>
        find countries
        <input type="text" value="lol" onChange={() => null} />
        </p>
    </div>
  );
}

export default App;
