
import React, { useEffect, useState } from 'react';

import fetch from 'node-fetch'

function Assets() {

  const [result, setResult] = useState<any[]>()
  const [error, setError] = useState()

  useEffect(()=> {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3005/investors/fetch_all", {})
      const data = await response.json()
      console.log ('setting result to  + data')
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

  if (!result) {
    return <div> No Result</div>
  }
  

  return (
    <div className="Assets">
      <header className="Assets-header">
        {/*result.map(item => <div>{item.symbol}: {item.name}</div>)*/}
        {result.map(item => <pre>{JSON.stringify(item, null, 2)}</pre>)}

      </header>
    </div>
  );
}

export default Assets;