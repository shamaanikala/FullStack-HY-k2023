const Header = (props) => {
  console.log(props)
  return (
    <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  console.log(props)
  return (
    <>
      <p>
        {props.part.name} {props.part.exercises}
      </p>
    </>
  )
}

// Tämä renderöi kaiken yhdellä kertaa
const Content = (props) => {
  console.log(props)
  return (
    <div>
      <Part part={props.parts[0]}  />
      <Part part={props.parts[1]}  />
      <Part part={props.parts[2]}  />
    </div>
  )
}

const Total = (props) => {
  console.log(props)
  return (
    <p>Number of exercises {props.exercisesSum}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
   {
      name: 'Using props to pass data',
      exercises:  7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course} />
      
      <Content parts={parts} />

      <Total exercisesSum={parts[0].exercises + parts[1].exercises + parts[2].exercises} />
      
    </div>
  )
}

export default App;
