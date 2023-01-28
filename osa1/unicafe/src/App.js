import { useState } from 'react'


const Otsake = props => <h1>{props.teksti}</h1>

const Button = (props) => (
  <button>{props.text}</button>
)

const Statistic = (props) => (
  <>{props.variable} {props.amount}<br /></>
)

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Otsake teksti="give feedback" />
      <div>
        <Button text="good" />
        <Button text="neutral" />
        <Button text="bad" />
      </div>
      <Otsake teksti="statistics" />
      <div>
        <Statistic variable="good" amount="0" />
        <Statistic variable="neutral" amount="0" />
        <Statistic variable="bad" amount="0" />
      </div>
    </div>
  )
}

export default App;
