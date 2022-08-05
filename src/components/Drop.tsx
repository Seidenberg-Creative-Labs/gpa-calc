import Dropdown from 'react-dropdown';

const Drop = () => {
  const options1 = [
    'China', 'India'
  ];
  const options2 = [
    'China System', 'India System'
  ];
    return(
      <div>
      <Dropdown options={options1}  placeholder="Country" />
      <Dropdown options={options2}  placeholder="GPA System" />
      </div>
    );

}

export default Drop;