import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newPerson, setNewPerson] = useState({
    name: "",
    number: "",
  });
  const [filter, setFilter] = useState("");

  const handleClick = (e) => {
    e.preventDefault();
    if (persons.some((person) => person.name === newPerson.name)) {
      alert(`${newPerson.name} is already added to the phonebook`);
    } else {
      setPersons([
        ...persons,
        { name: newPerson.name, number: newPerson.number },
      ]);
      setNewPerson({ name: "", number: "" });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <h2>add a new</h2>
      <PersonForm
        newPerson={newPerson}
        setNewPerson={setNewPerson}
        handleClick={handleClick}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} />
    </div>
  );
};

export default App;
