import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';

function App() {
  useEffect(function () {
    fetch('http://localhost:8000/amk')
      .then(async res => await res.json())
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }, []);

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
          Learn React 123
        </a>
      </header>
    </div>
  );
}

export default App;
