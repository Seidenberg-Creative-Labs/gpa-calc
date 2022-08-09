import Dropdown from 'react-dropdown';
import React, { useState } from 'react';

const Drop = () => {
  const countries = [
    'China', 'India'
  ];

  const [country, setCountry] = useState("");

    return(
      <div>
      <Dropdown options={countries} onChange={e => setCountry(e.value)} placeholder="Country" />
      </div>
    );

}

export default Drop;