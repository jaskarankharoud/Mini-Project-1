import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect, Component } from 'react';
import axios from 'axios';
import { useStepTracker } from './useStepTracker'; // Import the custom hook

const FunctionalComponent = () => {
  return <div>This is a functional component.</div>;
};

class ClassComponent extends Component {
  render() {
    return <div>This is a class component.</div>;
  }
};

function App() {
  const [users, setUsers] = useState([]);
  const { steps, incrementSteps } = useStepTracker(0); // Use the custom hook

  useEffect(() => {
    axios.get('http://localhost:3000/api/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleRefresh = () => {
    axios.get('http://localhost:3000/api/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <div>
        <h1>User List</h1>
        <button onClick={handleRefresh}>Refresh</button>
        <ul>
          {users.map(user => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
        <FunctionalComponent />
        <ClassComponent />
        <div>
          <h1>Fitness Tracker</h1>
          <p>Steps Today: {steps}</p>
          <button onClick={incrementSteps}>Add Step</button>
          {steps >= 10 && <p>You've reached your step goal!</p>}
        </div>
      </div>
    </div>
  );
}

export default App;
