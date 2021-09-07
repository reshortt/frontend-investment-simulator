import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import fetch from 'node-fetch'

function App() {

  const [result, setResult] = useState()
  const [error, setError] = useState()

  useEffect(()=> {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3005/investors/fetch_all")
      const data = await response.json()
      console.log(data)
      setResult(data)
    }
    if (!result && !error) {
      fetchData()
    }

  }, [result, error])


  if (!result && !error) {
    return <div>Loading</div>
  }

  if (error) {
    return <div> Error : {error} </div>
  }

  return (
    <div className="App">
      <header className="App-header">
        {result.map(item => <div>{item.symbol}: {item.name}</div>)}
      </header>
    </div>
  );
}

export default App;
