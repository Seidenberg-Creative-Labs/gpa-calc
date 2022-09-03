import React, {useEffect, useReducer, useState} from "react";
import "./App.css";
import TableCourseInput from "./components/tables/TableCourseInput";
import "react-dropdown/style.css";
import Drop from "./components/dropdown/Drop";
import { getScale } from "./components/dropdown/GpaDrop";
import WebHeader from "./components/WebHeader";
import { Button, Stack } from "@mui/material";
import { getGradeOutput } from "./utils/Utils";
import TableGradesOutput from "./components/tables/TableGradesOutput";
import {placeHolder} from "./components/dropdown/GpaDrop";

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

  // Bool to determine if conversion output table is shown
  const [showOutput, setShowOutput] = useState(false);

  const [, forceUpdate] = useReducer(x => x + 1, 0);

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

    const temp = (showOutput) => {
        if (showOutput) {
            setShowOutput(false);
        } else {
            setShowOutput(true);
        }
    };

    return (
        <div className="App">
            <header className="header">
                <WebHeader />
            </header>
            <body className="body">
                {/*@ts-ignore*/}
                <div className="test">
                    <Drop />
                    <div className="table-button">
                        <TableCourseInput data={data} setData={setData} />
                        <Stack
                            spacing={2}
                            direction="row"
                            id="btnMenu"
                            style={{
                                marginTop: "4vh",
                                width:
                                    window.innerWidth <= 760 ? "100vw" : "50vw",
                            }}
                        >
                            <Button
                                variant="contained"
                                onClick={() => {
                                    // Add new empty row to data
                                    setData([...data, ["", "1", "0"]]);
                                }}
                            >
                                Add Course
                            </Button>
                            <Button
                                variant="contained"
                                onClick={() => {
                                    if (placeHolder) {
                                        if (showOutput) {
                                            forceUpdate()
                                        }
                                        setShowOutput(true);
                                    } else {
                                        alert("Please select a GPA scale");
                                    }
                                }}
                            >
                                Calculate GPA
                            </Button>
                            <Button
                                variant="contained"
                                onClick={() => {
                                    setShowOutput(false);
                                    setData([
                                        ["", "1", "0"],
                                        ["", "1", "0"],
                                        ["", "1", "0"],
                                    ]);
                                    // Timeout to allow state to update
                                    setTimeout(
                                        () =>
                                            window.scrollTo({
                                                top: 0,
                                                left: 0,
                                                behavior: "smooth",
                                            }),
                                        10
                                    );
                                }}
                            >
                                Reset Table
                            </Button>
                        </Stack>
                    </div>
                </div>
                {showOutput && (
                    <TableGradesOutput id="output" data={getGradeOutput(getScale, data)} />
                )}
            </body>
        </div>
    );

export default App;
