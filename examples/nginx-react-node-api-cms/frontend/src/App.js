import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

const {
  REACT_APP_API_URL: API_URL,
} = process.env;

function App() {
  const [data, setData] = useState([]);

  const getData = () => fetch(`${API_URL}/data`)
    .then((res) => res.json())
    .then(setData);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Hello Universe!<br /><br />
          <code>API_URL: {API_URL}</code>
        </p>
        {!data.length && (
          <a
            className="App-link"
            href="#"
            onClick={getData}
          >
            Load data from the API
          </a>
        )}
        {data.length && (
          <pre>{JSON.stringify(data, null, 2)}</pre>
        ) || ''}
      </header>
    </div>
  );
}

export default App;
