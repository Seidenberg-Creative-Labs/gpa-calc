// @ts-nocheck
import React, {Fragment, useRef, useState} from "react";
import "./App.css";
import TableCourseInput from "./components/tables/TableCourseInput";
import "react-dropdown/style.css";
import Drop from "./components/dropdown/Drop";
import { getScale } from "./components/dropdown/GpaDrop";
import WebHeader from "./components/WebHeader";
import {
    Button,
    ButtonGroup,
    ClickAwayListener,
    Dialog, DialogActions, DialogContent, DialogTitle,
    Grid,
    MenuItem,
    MenuList,
    Paper,
    Popper,
    Stack,
    TextField
} from "@mui/material";
import { calcGpa, displayToast, getGradeOutput } from "./utils/Utils";
import TableGradesOutput from "./components/tables/TableGradesOutput";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { CSSTransition } from "react-transition-group";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Grow from '@mui/material/Grow';
import LoadingButton from '@mui/lab/LoadingButton';

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

    const addRowOptions = ['Add a course', 'Add multiple courses'];
    const [selectedButtonIdx, setSelectedButtonIdx] = useState(0);
    const [buttonOpen, setButtonOpen] = useState(false);
    const anchorRef = useRef(null);

    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogValue, setDialogValue] = useState(1);
    const [loading, setLoading] = useState(false);

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
                            <TableCourseInput id="table-input" data={data} setData={setData} />
                            <Stack
                                spacing={10.25}
                                width='40%'
                                direction="row"
                                id="btnMenu"
                                style={{
                                    marginTop: '4vh',
                                }}
                            >
                                {/* Button group to add rows */}
                                <Fragment>
                                    <ButtonGroup variant='contained' ref={anchorRef} aria-label="split button" >
                                        <Button onClick={() => {
                                            if (selectedButtonIdx === 0) {
                                                setData([...data, ["", "1", "0"]]);
                                            } else {
                                                setDialogOpen(true);
                                            }
                                        }}>
                                            {addRowOptions[selectedButtonIdx]}</Button>
                                        <Button
                                            size='small'
                                            aria-controls={open ? 'split-button-menu' : undefined}
                                            aria-expanded={open ? 'true' : undefined}
                                            aria-label='Select row options'
                                            aria-haspopup='menu'
                                            onClick={() => setButtonOpen(prevOpen => !prevOpen)}
                                        >
                                            <ArrowDropDownIcon />
                                        </Button>
                                    </ButtonGroup>
                                    <Popper
                                        sx={{zIndex: 1}}
                                        open={buttonOpen}
                                        anchorEl={anchorRef.current}
                                        role={undefined}
                                        transition
                                        disablePortal
                                    >
                                        {({TransitionProps, placement}) => (
                                            <Grow
                                                {...TransitionProps}
                                                style={{
                                                    transformOrigin:
                                                        placement === 'bottom' ? 'center top' : 'center bottom',
                                                }}
                                            >
                                                <Paper>
                                                    <ClickAwayListener
                                                        onClickAway={event => {
                                                            if (anchorRef.current && anchorRef.current.contains(event.target)) {
                                                                return;
                                                            }
                                                        }}>
                                                        <MenuList id='split-button-menu' autoFocusItem>
                                                            {addRowOptions.map((option, index) => (
                                                                <MenuItem
                                                                    key={option}
                                                                    selected={index === selectedButtonIdx}
                                                                    onClick={event => {
                                                                        setSelectedButtonIdx(index);
                                                                        setButtonOpen(false);
                                                                    }}
                                                                >
                                                                    {option}
                                                                </MenuItem>
                                                            ))}
                                                        </MenuList>
                                                    </ClickAwayListener>
                                                </Paper>
                                            </Grow>
                                        )}
                                    </Popper>
                                </Fragment>
                                {/* Button to select scale */}
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
                                {/* Button to reset table and data */}
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
                                    {/* Table displaying individual calculated grades after conversion */}
                                    <TableGradesOutput data={conversionData} />
                                    {/* Show calculated cumulative GPA */}
                                    <h2 style={{color: "#000000", textAlign: 'center'}}>
                                        Cumulative GPA:{" "}
                                        {calcGpa(getScale, data)[1]}
                                    </h2>
                                    <hr/>
                                </div>
                            </CSSTransition>
                            {/* Display relevant scale image based on getScale val */}
                            {showOutput && getScale === "5 Point Scale" && (
                                <img src="./5scale.png" width={"500px"} />
                            )}
                            {showOutput && getScale === "4 Point Scale" && (
                                <img src="./4scale.png" width={"500px"} />
                            )}
                            {showOutput && getScale === "Most Common Scale" && (
                                <img src="./mostCommon.png" width={"500px"} />
                            )}
                            {showOutput && getScale === "Letter Grade Scale" && (
                                <img src="./letterGrade.png" width={"500px"} />
                            )}
                            {showOutput && getScale === "10 Point Scale" && (
                                <img src="./10scale.png" width={"500px"} />
                            )}
                        </Grid>
                    </Grid>
                </Grid>
                {/* Dialog to select number of rows to add */}
                <Dialog
                    open={dialogOpen}
                    onClose={() => setDialogOpen(false)}
                    >
                    <DialogTitle id='alert-dialog-title'>
                        {`Enter the number of courses you'd like to add:`}
                    </DialogTitle>
                    <DialogContent>
                        <TextField
                            type='number'
                            value={dialogValue}
                            onChange={event => {
                                if (event.target.value >= 0) {
                                    setDialogValue(event.target.value);
                                }
                            }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => {
                            setDialogOpen(false);
                            setDialogValue(1);
                        }}>Cancel</Button>
                        <LoadingButton
                            onClick={() => {
                                setLoading(true);
                                for (let i = 0; i < dialogValue; i++) {
                                    data.push(["", "1", "0"]);
                                }
                                setLoading(false);
                                setDialogOpen(false);
                                setDialogValue(1);
                            }}
                            loading={loading}
                            loadingPosition='end'
                            variant='contained'
                            size='small'
                            autoFocus
                        >
                            Confirm
                        </LoadingButton>
                    </DialogActions>
                </Dialog>
                {/* Error message container */}
                            {/* showOutput && ScaleImage() */}
                <ToastContainer position="bottom-center" />
            </body>
        </Grid>
    );
};

export default App;
