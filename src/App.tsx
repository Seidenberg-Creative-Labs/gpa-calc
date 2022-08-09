import React, {useState} from "react";
import './App.css';
import TableCourseInput from "./components/tables/TableCourseInput";
import Button from "./components/Button";
import "react-dropdown/style.css";
import WebHeader from "./components/WebHeader";
import Drop from "./components/Drop";

const App = () => {
  const [courseTableData, setCourseTableData] = useState([
      {id: 1, courseTitle: null, credits: null, grade: null},
      {id: 2, courseTitle: null, credits: null, grade: null},
      {id: 3, courseTitle: null, credits: null, grade: null}
  ]);

  return (
    <div className="App">
      <header className="header">
        <WebHeader />
      </header>
      <body className="body">
        <Drop/>
        <TableCourseInput data={courseTableData} />
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