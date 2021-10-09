import React, { useEffect, useState } from 'react';

import fetch from 'node-fetch'

function Login() {

  const [result, setResult] = useState<any[]>()
  const [error, setError] = useState()

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
    <div className="Login">
      <header className="Login-header">
        {/*result.map(item => <div>{item.symbol}: {item.name}</div>)*/}
        {result.map(item => <pre>{JSON.stringify(item, null, 2)}</pre>)}

      </header>
    </div>
  );
}

export default Login;