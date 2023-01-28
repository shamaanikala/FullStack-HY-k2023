import { useState } from 'react'


const Otsake = props => <h1>{props.teksti}</h1>

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
)

const Statistic = (props) => (
  <>{props.variable} {props.amount}<br /></>
)

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    console.log('good klikattu')
    const updatedGood = good + 1
    setGood(updatedGood)
  }

  const handleNeutralClick = () => {
    console.log('neutral klikattu')
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
  }

  const handleBadClick = () => {
    console.log('bad klikattu')
    const updatedBad = bad + 1
    setBad(updatedBad)
  }



  return (
    <div>
      <Otsake teksti="give feedback" />
      <div>
        <Button handleClick={handleGoodClick} text="good" />
        <Button handleClick={handleNeutralClick} text="neutral" />
        <Button handleClick={handleBadClick} text="bad" />
      </div>
      <Otsake teksti="statistics" />
      <div>
        <Statistic variable="good" amount={good} />
        <Statistic variable="neutral" amount={neutral} />
        <Statistic variable="bad" amount={bad} />
        <Statistic variable="all" amount="?" />
        <Statistic variable="average" amount="?" />
        <Statistic variable="positive" amount="?%" />
      </div>
    </div>
  )
}

export default App;
