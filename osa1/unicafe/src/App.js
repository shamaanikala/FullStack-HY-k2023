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

  const calculateSum = () => (good + neutral + bad)

  const calculateAvg = () => {
    //const sum = good + neutral + bad
    console.log('Palautteita yhteensä',calculateSum())
    const goodValue = good // good = 1
    const neutralValue = 0 // neutral = 0
    const badValue = -bad // bad = -1
    console.log('good,neutral,bad',goodValue,neutralValue,badValue)
    return (goodValue+badValue)/calculateSum()
  }

  const calcPositivePercent = () => ((good / calculateSum()) * 100.0).toString().concat(' %')



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
        <Statistic variable="all" amount={calculateSum()} />
        <Statistic variable="average" amount={calculateAvg()} />
        <Statistic variable="positive" amount={calcPositivePercent()} />
      </div>
    </div>
  )
}

export default App;
