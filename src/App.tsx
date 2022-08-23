import React, {useEffect, useState} from "react";
import './App.css';
import TableCourseInput from "./components/tables/TableCourseInput";
import Button from "./components/Button";
import "react-dropdown/style.css";
import Drop from "./components/Drop";
import WebHeader from "./components/WebHeader";

const App = () => {
  const [dimensions, setDimensions] = useState({
      height: window.innerHeight,
      width: window.innerWidth,
  });

  const [data, setData] = useState([
      ["", "1", "0"],
      ["", "1", "0"],
      ["", "1", "0"],
  ]);

  useEffect(() => {
      const handleResize = () => {
          setDimensions({
              height: window.innerHeight,
              width: window.innerWidth,
          });
      }

      window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        }
  }, []);

  return (
    <div className="App">
      <header className="header">
        <WebHeader />
      </header>
      <body className="body">
      {/*@ts-ignore*/}
      <Drop />
        <TableCourseInput data={data} setData={setData} />
        <div id='btnMenu' style={{marginTop: '4vh', width: window.innerWidth <= 760 ? '100vw' : '50vw'}}>
            <Button radius={9} color='slategray' text='Add Course' width='150px' height='45px' onClick={() => {
                setData([...data, ["", "1", "0"]])
            }} />
            <Button radius={9} color='slategray' text='Calculate GPA' width='150px' height='45px' onClick={() => {
                alert("TODO: Implement this function\n\n" + JSON.stringify(data))
            }} />
            <Button radius={9} color='slategray' text='Clear Table' width='150px' height='45px' onClick={() => {
                setData([
                    ["", "1", "0"],
                    ["", "1", "0"],
                    ["", "1", "0"],
                ])
            }} />
        </div>
      </body>
    </div>
  );
};

export default App;
