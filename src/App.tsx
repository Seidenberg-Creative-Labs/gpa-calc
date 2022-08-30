import React, { useEffect, useState } from "react";
import "./App.css";
import TableCourseInput from "./components/tables/TableCourseInput";
import "react-dropdown/style.css";
import Drop from "./components/dropdown/Drop";
import WebHeader from "./components/WebHeader";
import { Button, Stack } from "@mui/material";
import { placeHolder } from "./components/dropdown/GpaDrop";
import { calcGpa } from "./utils/Utils";

const App = () => {

  // Browser window dimensions
  const [dimensions, setDimensions] = useState({
      height: window.innerHeight,
      width: window.innerWidth,
  });
  // TableCourseInput data state (2D array)
  const [data, setData] = useState([
      ["", 1, 0],
      ["", 1, 0],
      ["", 1, 0],
  ]);

  useEffect(() => {
      // Update window dimensions
      const handleResize = () => {
          setDimensions({
              height: window.innerHeight,
              width: window.innerWidth,
          });
      }
      // Window resize event listener
      window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
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
        <Stack spacing={2} direction="row" id='btnMenu' style={{marginTop: '4vh', width: window.innerWidth <= 760 ? '100vw' : '50vw'}}>
            <Button variant="contained" onClick={() => {
                // Add new empty row to data
                setData([...data, ["", "1", "0"]]);
            }}>Add Course</Button>
            <Button variant="contained" onClick={() => {
                alert("TODO: Implement this function\n\n" + JSON.stringify(data));
            }}>Calculate GPA</Button>
            <Button variant="contained" onClick={() => {
                setData([
                    ["", "1", "0"],
                    ["", "1", "0"],
                    ["", "1", "0"],
                ]);
                // Timeout to allow state to update
                setTimeout(() => window.scrollTo({top: 0, left: 0, behavior: 'smooth'}), 10);
            }}>Reset Table</Button>
        </Stack>
      </body>
    </div>
  );
};

export default App;
