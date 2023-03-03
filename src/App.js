// assignment,
// create a graph that accepts item_date value based on which it aggregates the scheduling
// date and time for the item_date.
// For instance, I can select 21st November, and the graph may display:
// 20th November: 5 Scheduled
// 19th November: 2 Scheduled
// 18th November: 2 Scheduled
// You're free to use any libraries to accomplish this task. Feel free to be creative with the data
// organisation and the design. We use react (typescript), redux and SCSS for the front-end.


import React, { useState, useEffect } from 'react';
import './App.css';

export default function App() {
  let arr = Array.from({length: 30}, (_, i) => i + 1);

  const [ele0 , setele0] = useState(0) ; 
  const [ele1 , setele1] = useState(0) ; 
  const [ele2 , setele2] = useState(0) ; 
  const showPrevData = (num) => {
    setele0(num-1) ;
    setele1(num-2) ;
    setele2(num-3) ;
  }
  // useEffect(() => {
  //   for()
  // })
  return (<>
    {arr.map(ele =>
      <button className='btnClass' onClick={() => showPrevData(ele)}>{ele}</button>
    )}
    <div>
      <h2>{ele0}</h2>
      <h2>{ele1}</h2>
      <h2>{ele2}</h2>
    </div>
  </>
  )
}
