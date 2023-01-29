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
// Onko tämä huono tapa antaa taulukolla tiedot?
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

// total lasketaan mallivastauksissa App-
// komponentissa annettujen exercisesX summana, joka 
// annetaan totallille propsina
const Total = (props) => {
  console.log(props)
  console.log('Tulostetaan forEach taulukosta:')
  props.parts.forEach(value => {
    console.log(value)
  })
  const summa = props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises
  return (
    <p>Number of exercises {summa}</p>
  )
}

const Course = ({course}) => {
  console.log('Toimiiko dekonstruktoitu course',course)
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
    </>
  )
}
//<Total parts={course.parts} />

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises:  7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: "Lamaannus",
        description: "Laskennan mallien mallinnus",
        exercises: 666,
        id: 4
      }
  ]
}

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App;
