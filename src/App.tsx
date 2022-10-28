// @ts-nocheck
import React, { useEffect, useState } from "react";
import "./App.css";
import TableCourseInput from "./components/tables/TableCourseInput";
import "react-dropdown/style.css";
import Drop from "./components/dropdown/Drop";
import { getScale } from "./components/dropdown/GpaDrop";
import WebHeader from "./components/WebHeader";
import {Button, Grid, Stack} from "@mui/material";
import { calcGpa, displayToast, getGradeOutput } from "./utils/Utils";
import TableGradesOutput from "./components/tables/TableGradesOutput";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { CSSTransition } from "react-transition-group";
import { ShowGPAScale } from "./components/ShowGPAScale";
import {Container} from "react-bootstrap";

const App = () => {
    // TableCourseInput data state (2D array)
    const [data, setData] = useState([
        ["", "1", "0"],
        ["", "1", "0"],
        ["", "1", "0"],
    ]);

    // Bool to determine if conversion output table is shown
    const [showOutput, setShowOutput] = useState(false);

    const [conversionData, setConversionData] = useState([]);

    return (
        <Grid container>
            {/* Page header */}
            <header className="header">
                <WebHeader />
            </header>
            <body className="body">
                <Grid container direction='column'>
                    {/* Dropdown component */}
                    <Drop />
                    <Grid container direction={{xs: 'column', lg: 'row'}} id='rowFlex'>
                        <div className="table-button">
                            <TableCourseInput data={data} setData={setData} />
                            <Stack
                                spacing={10.25}
                                width='40%'
                                direction="row"
                                id="btnMenu"
                                style={{
                                    marginTop: '4vh',
                                }}
                            >
                                <Button
                                    variant="contained"
                                    style={{minWidth: '60%'}}
                                    onClick={() => {
                                        // Add new empty row to data
                                        setData([...data, ["", "1", "0"]]);
                                    }}
                                >
                                    Add Course
                                </Button>
                                <Button
                                    variant="contained"
                                    style={{minWidth: '60%'}}
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
                                    style={{minWidth: '60%'}}
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
                        <Grid item id="ScreenShotsWIP">
                            <CSSTransition
                                in={showOutput}
                                timeout={300}
                                classNames="fade"
                                unmountOnExit
                            >
                                <div id="table-output">
                                    <TableGradesOutput data={conversionData} />
                                    <h2 style={{color: "#000000", textAlign: 'center'}}>
                                        Cumulative GPA:{" "}
                                        {calcGpa(getScale, data)[1]}
                                    </h2>
                                    <hr/>
                                </div>
                            </CSSTransition>
                            {getScale === "5 Point Scale" ? (
                                <img src="./5scale.png" width={"500px"} />
                            ) : null}
                            {getScale === "4 Point Scale" ? (
                                <img src="./4scale.png" width={"500px"} />
                            ) : null}
                            {getScale === "Most Common Scale" ? (
                                <img src="./mostCommon.png" width={"500px"} />
                            ) : null}
                            {getScale === "Letter Grade Scale" ? (
                                <img src="./letterGrade.png" width={"500px"} />
                            ) : null}
                            {getScale === "10 Point Scale" ? (
                                <img src="./10scale.png" width={"500px"} />
                            ) : null}
                        </Grid>
                    </Grid>
                </Grid>
                <ToastContainer position="bottom-center" />
            </body>
        </Grid>
    );
};

export default App;
