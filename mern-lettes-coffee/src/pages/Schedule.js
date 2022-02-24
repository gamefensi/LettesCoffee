import React, { useState } from 'react';
import Calendar from 'react-calendar';
;

export default function Schedule() {
  const [value, onChange] = useState(new Date());
  console.log(value)
  // handleFilterDates = 
  return (
    <div id='roastSchedule'>
      <h2 className='h1'>Roast Schedule</h2>
      <Calendar onChange={onChange} value={value} />
    </div>
  );
}