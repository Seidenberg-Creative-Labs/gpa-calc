import Dropdown from 'react-dropdown';

const GpaDrop = ({country}:any) => {


  const ChinaScale = [
    "5 Point Scale", "4 Point Scale"
  ];

  const IndiaScale = [
    'Most Common Scale', 'Letter Grade Scale', '10 Point Scale'
  ];

  if (country === 'China'){
    return(
        <Dropdown options={ChinaScale} value={"Select China Scale"} />
    );
}

else if (country === 'India'){
    return(
      <Dropdown options={IndiaScale} value={"Select India Scale"} />
    );
}

else{
    return(
        <Dropdown options={[]} placeholder = "Select a Country" />
    );
}


}

export default GpaDrop;