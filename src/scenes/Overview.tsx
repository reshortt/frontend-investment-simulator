import React, { useEffect, useState } from 'react';


const getBalance =  () : number =>  {
    // todo: get balance from mongo db
    return 1074324.45
  }

function Overview() {

  return (
    <div className="Overview">
      <label> Balance:  </label>
      <label> $ + {getBalance} </label>
      <br/>
      
    
      <br/>
      <header className="Overview-header">
      </header>
    </div>
  );
}

export default Overview