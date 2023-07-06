const Persons = ({ persons, filter, handleDelete }) => {
  return persons
    .filter((person) =>
      person.name.toLowerCase().includes(filter.toLowerCase())
    )
    .map((person) => (
      <li key={person.id}>
        {person.name} {person.number} {""}{" "}
        <button onClick={() => handleDelete(person)}>delete</button>
      </li>
    ));
};

export default Persons;
