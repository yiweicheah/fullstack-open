import { useState, useEffect } from "react";
import Notification from "./components/Notification";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({
    name: "",
    number: "",
    id: "",
  });
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState({
    message: "",
    type: "",
  });

  //get persons data
  useEffect(() => {
    personService.getAll().then((res) => setPersons(res));
  }, []);

  //update person's number
  const handleUpdate = async () => {
    const personToUpdateIndex = persons.findIndex(
      (person) => person.name.toLowerCase() === newPerson.name.toLowerCase()
    );
    const personToUpdate = persons[personToUpdateIndex];

    const updatedObject = {
      name: personToUpdate.name,
      number: newPerson.number,
      id: personToUpdate.id,
    };

    const res = await personService
      .update(personToUpdate.id, updatedObject)
      .catch((error) => {
        setNotification({
          message: error.response.data.error,
          type: "error",
        });
        setTimeout(() => {
          setNotification({ message: "", type: "" });
        }, 5000);
      });

    setNotification({
      message: `${newPerson.name}'s number has been updated`,
      type: "success",
    });
    setTimeout(() => {
      setNotification({ message: "", type: "" });
    }, 5000);

    persons[personToUpdateIndex] = res;
    setNewPerson({
      name: "",
      number: "",
      id: "",
    });
  };

  //add new person to phonebook
  const handleAdd = () => {
    const newObject = {
      name: newPerson.name,
      number: newPerson.number,
    };

    personService
      .create(newObject)
      .then((res) => {
        console.log(res);
        setNotification({
          message: `Added ${newPerson.name}`,
          type: "success",
        });
        setTimeout(() => {
          setNotification({ message: "", type: "" });
        }, 5000);
        setPersons([...persons, res]);
        setNewPerson({ name: "", number: "", id: "" });
      })
      .catch((error) => {
        setNotification({
          message: error.response.data.error,
          type: "error",
        });
        setTimeout(() => {
          setNotification({ message: "", type: "" });
        }, 5000);
      });
  };

  //handle add button when clicked
  const handleAddClick = (e) => {
    e.preventDefault();
    if (
      persons.some(
        (person) => person.name.toLowerCase() === newPerson.name.toLowerCase()
      )
    ) {
      if (
        window.confirm(
          `${newPerson.name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        handleUpdate();
      }
    } else {
      handleAdd();
    }
  };

  //handle delete button
  const handleDelete = (toDelete) => {
    if (window.confirm(`Are you sure you want to delete ${toDelete.name}`)) {
      personService
        .remove(toDelete.id)
        .then(setPersons(persons.filter((person) => person.id !== toDelete.id)))
        .catch((error) => {
          setNotification({
            message: `Information of ${toDelete.name} has already been removed from server`,
            type: "error",
          });
          setTimeout(() => {
            setNotification({ message: "", type: "" });
          }, 5000);
        });
    }
  };

  return (
    <div>
      {!notification.type ? (
        ""
      ) : (
        <Notification message={notification.message} type={notification.type} />
      )}
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <h2>add a new</h2>
      <PersonForm
        newPerson={newPerson}
        setNewPerson={setNewPerson}
        handleClick={handleAddClick}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
