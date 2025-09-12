const Header = ({ name }) => {
  console.log ({name})
  return <h2>{name}</h2>;
};

const Content =({part}) => {
  console.log ({part})
  return (
    <div>
    {part.map(
      (part) => (
        <div key={part.id}>
          {part.name} {part.exercises}
        </div>
      )
    )}
    </div>
  )
}

const Total = ({part}) => {
  console.log({part})
  return (
    <div>
      total of {
        part.reduce((s,part)=>s+part.exercises,0)
      } exercises
    </div>
  )
}

const Course = ({ course }) => {
  console.log ({course})

  return (
    <>
      {course.map((course) => (
        <div key={course.id}>
          <Header name={course.name}/>
          <Content part={course.parts}/>
          <Total part={course.parts}/>
        </div>
      ))}
    </>
  );
};

export default Course