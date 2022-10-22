// @ts-nocheck
import React, { useEffect, useState } from "react";
import "./App.css";
import TableCourseInput from "./components/tables/TableCourseInput";
import "react-dropdown/style.css";
import Drop from "./components/dropdown/Drop";
import { getScale } from "./components/dropdown/GpaDrop";
import WebHeader from "./components/WebHeader";
import { Button, Stack } from "@mui/material";
import { calcGpa, displayToast, getGradeOutput } from "./utils/Utils";
import TableGradesOutput from "./components/tables/TableGradesOutput";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { CSSTransition } from "react-transition-group";
import ScaleImage from "./components/tables/ScaleImage";

const App = () => {
    // Browser window dimensions
    const [dimensions, setDimensions] = useState({
        height: window.innerHeight,
        width: window.innerWidth,
    });
    // TableCourseInput data state (2D array)
    const [data, setData] = useState([
        ["", "1", "0"],
        ["", "1", "0"],
        ["", "1", "0"],
    ]);

    // Bool to determine if conversion output table is shown
    const [showOutput, setShowOutput] = useState(false);

    const [conversionData, setConversionData] = useState([]);

    useEffect(() => {
        // Update window dimensions
        const handleResize = () => {
            setDimensions({
                height: window.innerHeight,
                width: window.innerWidth,
            });
        };
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
                <div>
                    <Drop />
                    <div id="gridContainer">
                        <div className="table-button">
                            <TableCourseInput id="table-input" data={data} setData={setData} />
                            <Stack
                                spacing={2}
                                direction="row"
                                id="btnMenu"
                                style={{
                                    marginTop: "4vh",
                                    width:
                                        window.innerWidth <= 760
                                            ? "100vw"
                                            : "50vw",
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
                                        if (getScale) {
                                            setConversionData(
                                                getGradeOutput(getScale, data)
                                            );
                                            setShowOutput(true);
                                        } else {
                                            displayToast(
                                                "Please select a GPA scale"
                                            );
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
                                    }}
                                >
                                    Reset Table
                                </Button>
                            </Stack>
                        </div>
                        <div id="ScreenShotsWIP">
                            <CSSTransition
                                in={showOutput}
                                timeout={300}
                                classNames="fade"
                                unmountOnExit
                            >
                                <div id="table-output">
                                    <TableGradesOutput data={conversionData} />
                                    <h2 style={{ color: "#000000" }}>
                                        Cumulative GPA:{" "}
                                        {calcGpa(getScale, data)[1]}
                                    </h2>
                                </div>
                            </CSSTransition>
                            {showOutput && ScaleImage()}
                        </div>
                    </div>
                </div>
                <ToastContainer position="bottom-center" />
            </body>
        </div>
    );
};

export default App;
