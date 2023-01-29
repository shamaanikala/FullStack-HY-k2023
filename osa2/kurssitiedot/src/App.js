const Header = (props) => {
  console.log(props)
  return (
    <h1>{props.course}</h1>
  )
}

const Part = ({part}) => {
  console.log(part)
  return (
    <>
      <p>
        {part.name} {part.exercises} <i>{part.description}</i>
      </p>
    </>
  )
}

// Tämä renderöi kaiken yhdellä kertaa
const Content = ({parts}) => {
  console.log('Tulostetaan part id:t')
  console.log(parts.map(p => p.id))
  return (
    <div>
      {parts.map(p => <Part key={p.id} part={p} />)}
    </div>
  )
}

const Total = ({parts}) => {
  console.log(parts)
  const summa = parts.reduce((summa,osa) => {
    if (!Object.hasOwn(osa,'exercises')) {
      // jostain syystä undefined ei jää haaviin === null
      console.log('Osalle ei ole määritelty tehtävien määrää!')
      return summa
    }
    console.log('tehtävät löytyvät')
    summa += osa.exercises
    console.log('reducessa',summa,osa,osa.exercises)
    return summa
  },0)
  console.log('Tehtävien summa',summa)
  return (
    <p><b>total of exercises {summa}</b></p>
  )
}

const Course = ({course}) => {
  console.log('Toimiiko dekonstruktoitu course',course)
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  )
}

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
        name: 'Redux',
        exercises: 11,
        id: 4
      },
      {
        name: "Lamaannus",
        description: "Laskennan mallien mallinnus",
        exercises: 666,
        id: 1640
      },
      {
        name: "Free Credits",
        id: 300
      },
      {
        id:5
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
