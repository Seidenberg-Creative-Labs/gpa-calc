import Dropdown from 'react-dropdown';
import React, { useState } from 'react';

let title:string = "";

const GpaDrop = ({country}:any) => {
  
  title = country;

  const ChinaScale = [
    "5 Point Scale", "4 Point Scale"
  ];

  const IndiaScale = [
    'Most Common Scale', 'Letter Grade Scale', '10 Point Scale'
  ];

  if (country === 'China'){

    return(
        <Dropdown options={ChinaScale} value = {title} />
    );

}

else if (country === 'India'){

    return(
        <Dropdown options={IndiaScale} value = {title} />
    );

}

else{
    return(
        <Dropdown options={[]} placeholder = "Pick a Country" />
    );
}


}

const changeTitle = () => {
  title = "Select Scale"
}


export {GpaDrop, changeTitle, title};