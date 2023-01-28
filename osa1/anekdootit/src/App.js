import { useState } from 'react'


// random JavaScript https://www.w3schools.com/js/js_random.asp
const getRandomInt = (n) => Math.floor(Math.random() * n);

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)

  const randomSelected = () => {
    console.log('selected',selected)
  }

  return (
    <div>
      {anecdotes[getRandomInt(anecdotes.length)]}
      <p>
        <Button handleClick={() => randomSelected()} text="next anecdote" />
      </p>
    </div>
  )
}

export default App