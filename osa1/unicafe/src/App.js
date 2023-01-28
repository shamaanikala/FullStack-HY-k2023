import { useState } from 'react'


const Otsake = () => <h1>give feedback</h1>

const Button = (props) => (
  <button>{props.text}</button>
)

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Otsake />
      <div>
        <Button text="good" />
        <Button text="neutral" />
        <Button text="bad" />
      </div>
    </div>
  )
}

export default App;
