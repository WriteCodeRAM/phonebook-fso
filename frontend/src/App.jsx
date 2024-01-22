import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import people from './service/people';
import Person from './components/Person';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newSearch, setNewSearch] = useState('');
  const [message, setMessage] = useState('');
  const [noti, setNoti] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    people.getAll().then((inititalPeople) => {
      setPersons(inititalPeople);
    });
  }, []);

  const handleNewName = (e) => {
    setNewName(e.target.value);
  };

  const handleNewNumber = (e) => {
    setNewNumber(e.target.value);
  };

  const handleNewSearch = (e) => {
    setNewSearch(e.target.value);
    const result = persons.filter((person) =>
      person.name.toLowerCase().includes(newSearch.toLowerCase())
    );
    setSearchResults(result);
  };

  const addNewName = (e) => {
    e.preventDefault();
    const found = persons.find((element) => element.name == newName);

    if (found) {
      let confirm = window.confirm(
        newName +
          ' already exists, would you like to replace the old number with a new one?'
      );
      if (confirm) {
        return updateNumber(found, newNumber);
      }
      setNewName('');
      setNewNumber('');
      return;
    }

    const person = {
      name: newName,
      number: newNumber,
    };

    people.createPeople(person).then((returnedPerson) => {
      console.log(returnedPerson);
      setPersons(persons.concat(returnedPerson));
      setMessage('User added successfully!');
      setNoti('success');
    });

    setTimeout(() => {
      setMessage('');
      setNoti('');
    }, 5000);

    setNewName('');
    setNewNumber('');
  };

  const deletePerson = (e) => {
    // delete person based on their ID

    let confirmation = window.confirm(
      `Do you really want to delete ${e.target.name}`
    );

    if (confirmation) {
      people.deletePeople(e.target.id);

      // use filter to find the persons who dont match the id and set persons to those people
      const remainingPeople = persons.filter((n) => n.id !== e.target.id);
      setPersons(remainingPeople);
      // use axios.delete() to remove the person from the server
    }
    return;
  };

  const updateNumber = (person, newNum) => {
    const updatedPerson = { ...person, number: newNum };

    people
      .updatePeople(updatedPerson)
      .then((res) => {
        console.log(res);
        setPersons(
          persons.map((person) =>
            person.id !== updatedPerson.id ? person : res
          )
        );
      })
      .catch((err) => {
        setMessage(`${person.name} has already been removed from the server`);
        setNoti('error');
        setTimeout(() => {
          setMessage('');
          setNoti('');
        }, 5000);
      });

    setNewName('');
    setNewNumber('');
  };

  return (
    <div>
      <h2>Phonebook</h2>
      {message !== '' ? <Notification noti={noti} message={message} /> : ''}
      <Filter handleNewSearch={handleNewSearch} newSearch={newSearch} />
      <h2>Add new entry</h2>
      <PersonForm
        addNewName={addNewName}
        newName={newName}
        handleNewName={handleNewName}
        newNumber={newNumber}
        handleNewNumber={handleNewNumber}
      />
      <h2>Numbers</h2>
      <Person
        searchResults={searchResults}
        persons={persons}
        deletePerson={deletePerson}
      />
    </div>
  );
};

export default App;
