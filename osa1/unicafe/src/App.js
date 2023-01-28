import { useState } from 'react'


const Otsake = props => <h1>{props.teksti}</h1>

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
)

const StatisticLine = (props) => (
  <><tr><td>{props.variable}</td><td>{props.amount}</td></tr></>
)

const Statistics = (props) => {
  const good = props.data[0]
  const neutral = props.data[1]
  const bad = props.data[2]

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
  
  if (calculateSum() === 0) {
    return (
      <div>No feedback given</div>
    )
  }
  // table:lla pitää olla thead, tbody ja tfoot, jotta toimii
  return (
      <table><thead></thead>
        <tbody>
          <StatisticLine variable="good" amount={good} />
          <StatisticLine variable="neutral" amount={neutral} />
          <StatisticLine variable="bad" amount={bad} />
          <StatisticLine variable="all" amount={calculateSum()} />
          <StatisticLine variable="average" amount={calculateAvg()} />
          <StatisticLine variable="positive" amount={calcPositivePercent()} />
        </tbody>
      <tfoot></tfoot></table>
  )
  }

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
      <Statistics data={[good,neutral,bad]} />
    </div>
  )
}

export default App;

