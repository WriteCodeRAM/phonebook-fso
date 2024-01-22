import axios from 'axios';
const baseURL = 'http://localhost:3001/api/persons';

const getAll = () => {
  const req = axios.get(baseURL);
  return req.then((res) => {
    return res.data;
  });
};

const createPeople = (person) => {
  const req = axios.post(baseURL, person);
  return req.then((res) => {
    return res.data;
  });
};

const deletePeople = (person) => {
  console.log(person);
  axios
    .delete(`${baseURL}/${person}`)
    .then((response) => {
      console.log(response.data);
      console.log('Resource deleted successfully:', response.data);
      return response.data;
    })
    .catch((error) => {
      console.error('Error deleting resource:', error);
    });
};

const updatePeople = (person) => {
  const req = axios.put(`${baseURL}/${person.id}`, person);
  return req.then((res) => {
    return res.data;
  });
};
export default { getAll, createPeople, deletePeople, updatePeople };
