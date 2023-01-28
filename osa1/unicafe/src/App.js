import { useState } from 'react'


const Otsake = () => <h1>give feedback</h1>

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Otsake />
      code here
    </div>
  )
}

export default App;
