import Dropdown from 'react-dropdown';
import React, { useState } from 'react';
import GpaDrop from './GpaDrop';

const Drop = () => {
  const [country, setCountry] = useState("");
  const countries = [
    'China', 'India'
  ];
  
    return(
      <div>
      <Dropdown options={countries}  onChange = {e => setCountry(e.value)} placeholder="Country" />
      <GpaDrop country = {country} />
      </div>
    );

}

export default Drop;