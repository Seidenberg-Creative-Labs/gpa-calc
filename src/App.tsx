import React, {useState} from "react";
import reactLogo from './assets/images/logo.svg';
import './App.css';
import TableCourseInput from "./components/tables/TableCourseInput";
import Button from "./components/Button";
import "react-dropdown/style.css";
import WebHeader from "./components/WebHeader";
import Drop from "./components/Drop";

const App = () => {
  const [data, setData] = useState([
      {id: 1, courseTitle: null, credits: null, grade: null},
      {id: 2, courseTitle: null, credits: null, grade: null},
      {id: 3, courseTitle: null, credits: null, grade: null}
  ]);

  return (
    <div className="App">
      <header className="header">
        <img src={reactLogo} className="logo react" alt="logo" />
        <p>GPA Calculator</p>
      </header>
      <body className="body">
      {/*@ts-ignore*/}
      <Drop/>
        <TableCourseInput data={data} setData={setData} />
        <div id='btnMenu'>
            <Button radius={9} color='#fafafa' text='Add Course' width='150px' height='45px' onClick={() => {}} />
            <Button radius={9} color='#fafafa' text='Calculate GPA' width='150px' height='45px' onClick={() => {}} />
            <Button radius={9} color='#fafafa' text='Clear Table' width='150px' height='45px' onClick={() => {}} />
        </div>
      </body>
    </div>
  );
};

export default App;
