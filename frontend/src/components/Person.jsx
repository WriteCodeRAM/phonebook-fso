const Person = ({ searchResults, persons, deletePerson }) => {
  return (
    <div>
      {searchResults.length == 0
        ? persons.map((person) => (
            <div key={person.id}>
              <p key={person.id}>
                {person.name} {person.number}
                <button
                  onClick={deletePerson}
                  id={person.id}
                  name={person.name}
                >
                  delete
                </button>
              </p>
            </div>
          ))
        : searchResults.map((person) => (
            <p key={person.id}>
              {person.name} {person.number}
            </p>
          ))}
    </div>
  );
};

export default Person;
