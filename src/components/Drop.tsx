import Dropdown from 'react-dropdown';
import React, { useState } from 'react';
import GpaDrop from './GpaDrop';


const Drop = () => {
  const [country, setCountry] = useState("");
  

  const countries = [
    'China', 'India'
  ];

  const test = (e:string) =>{
    setCountry(e);
  }

    return(
      <div id="Dropdown-div">
        <Dropdown options={countries} onChange={(e) => test(e.value)} placeholder="Country" />
        <GpaDrop id="GpaDrop" country={country}/>
      </div>
    );

}

export default Drop;