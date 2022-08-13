import Dropdown from 'react-dropdown';
import React, { useState } from 'react';

const GpaDrop = ({country}:any) => {
  
  const ChinaScale = [
    'China1', 'China2', 'China3'
  ];

  const IndiaScale = [
    'India1', 'India2', 'India3'
  ];

  if (country === 'China'){

    return(
        <Dropdown options={ChinaScale} placeholder = "Select Scale" />
    );

}

else if (country === 'India'){

    return(
        <Dropdown options={IndiaScale} placeholder = "Select Scale" />
    );

}

else{
    return(
        <Dropdown options={[]} placeholder = "Pick a Country" />
    );
}
}
export default GpaDrop;