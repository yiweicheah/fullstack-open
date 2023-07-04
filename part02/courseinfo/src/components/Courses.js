const Header = ({ name }) => {
  return <h1>{name}</h1>;
};

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};

const Content = ({ parts }) => {
  return parts.map((part, i) => <Part part={part} key={i} />);
};

const Total = ({ parts }) => {
  const total = parts.reduce((a, b) => a + b.exercises, 0);
  return (
    <p>
      <strong>total of {total} exercises</strong>
    </p>
  );
};

const Courses = ({ courses }) => {
  return (
    <div>
      {courses.map((course, i) => (
        <div key={i}>
          <Header name={course.name} />
          <Content parts={course.parts} />
          <Total parts={course.parts} />
        </div>
      ))}
    </div>
  );
};

export default Courses;
