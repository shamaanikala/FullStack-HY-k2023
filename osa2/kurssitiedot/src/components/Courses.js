import Course from "./Course"

const Courses = ({courses}) => {
  return (
    <>
      {courses.map(c => <Course key={c.id} course={c} />)}
    </>
  )
}

export default Courses