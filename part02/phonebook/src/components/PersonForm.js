const PersonForm = ({ newPerson, setNewPerson, handleClick }) => {
  return (
    <form onSubmit={handleClick}>
      <div>
        name:{" "}
        <input
          value={newPerson.name}
          onChange={(e) => setNewPerson({ ...newPerson, name: e.target.value })}
        />
      </div>
      <div>
        number:{" "}
        <input
          value={newPerson.number}
          onChange={(e) =>
            setNewPerson({ ...newPerson, number: e.target.value })
          }
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
