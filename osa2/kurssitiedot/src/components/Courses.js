const Header = ({text}) => {
  console.log(text)
  return (
    <h1>{text}</h1>
  )
}

const CourseHeader = ({name}) => {
  console.log('Piirretään kurssin otsikko',name)
  return (
    <h3>{name}</h3>
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
      <CourseHeader name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  )
}

const Courses = ({courses}) => {
  return (
    <>
      <Header text="Web development curriculum" />
      {courses.map(c => <Course key={c.id} course={c} />)}
    </>
  )
}

export default Courses