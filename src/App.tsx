// @ts-nocheck
import React, {useRef, useState} from "react";
import "./App.css";
import TableCourseInput from "./components/tables/TableCourseInput";
import "react-dropdown/style.css";
import {Drop, getScale} from "./components/dropdown/Drop";
import WebHeader from "./components/WebHeader";
import {
    Button,
    ButtonGroup,
    ClickAwayListener,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    MenuItem,
    MenuList,
    Paper,
    Popper,
    Stack,
    TextField,
} from "@mui/material";
import {calcGpa, displayToast, getGradeOutput} from "./utils/Utils";
import TableGradesOutput from "./components/tables/TableGradesOutput";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import {CSSTransition} from "react-transition-group";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Grow from "@mui/material/Grow";
import LoadingButton from "@mui/lab/LoadingButton";

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

    const addRowOptions = ["Add a course", "Add multiple courses"];
    const [selectedButtonIdx, setSelectedButtonIdx] = useState(0);
    const [buttonOpen, setButtonOpen] = useState(false);
    const anchorRef = useRef(null);

    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogValue, setDialogValue] = useState(1);
    const [loading, setLoading] = useState(false);

    return (
        // Page container
        <div>
            {/* Header with logo images */}
            <div className="header">
                <WebHeader />
            </div>
            {/* Main content container */}
            <Grid item direction="column" className="body">
                {/* Dropdown component */}
                <Drop/>
                <Grid container flexWrap="wrap" columnSpacing={2} justifyContent="center" alignItems="flex-start"
                      flexDirection={{xs: 'column', sm: 'column', md: 'row', lg: 'row'}}>
                    <Grid item xs={12} sm={12} lg={6} direction='column' className="table-button">
                        <TableCourseInput data={data} setData={setData}/>
                        <Stack
                            justifyContent='space-evenly'
                            direction="row"
                            id="btnMenu"
                            style={{
                                marginTop: "4vh",
                            }}
                        >
                            {/* Button group to add rows */}
                            <ButtonGroup
                                variant="contained"
                                ref={anchorRef}
                                aria-label="split button"
                            >
                                <Button
                                    onClick={() => {
                                        if (selectedButtonIdx === 0) {
                                            setData([
                                                ...data,
                                                ["", "1", "0"],
                                            ]);
                                        } else {
                                            setDialogOpen(true);
                                        }
                                    }}
                                >
                                    {addRowOptions[selectedButtonIdx]}
                                </Button>
                                <Button
                                    size="large"
                                    aria-controls={
                                        open
                                            ? "split-button-menu"
                                            : undefined
                                    }
                                    aria-expanded={
                                        open ? "true" : undefined
                                    }
                                    aria-label="Select row options"
                                    aria-haspopup="menu"
                                    onClick={() =>
                                        setButtonOpen(
                                            (prevOpen) => !prevOpen
                                        )
                                    }
                                >
                                    <ArrowDropDownIcon/>
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
                                                placement === "bottom"
                                                    ? "center top"
                                                    : "center bottom",
                                        }}
                                    >
                                        <Paper>
                                            <ClickAwayListener
                                                onClickAway={(
                                                    event
                                                ) => {
                                                    if (
                                                        anchorRef.current &&
                                                        anchorRef.current.contains(
                                                            event.target
                                                        )
                                                    ) {
                                                        return;
                                                    }
                                                }}
                                            >
                                                <MenuList
                                                    id="split-button-menu"
                                                    autoFocusItem
                                                >
                                                    {addRowOptions.map(
                                                        (option, index) => (
                                                            <MenuItem
                                                                key={option}
                                                                selected={index === selectedButtonIdx}
                                                                disabled={index === selectedButtonIdx}
                                                                onClick={(
                                                                    event
                                                                ) => {
                                                                    setSelectedButtonIdx(
                                                                        index
                                                                    );
                                                                    setButtonOpen(
                                                                        false
                                                                    );
                                                                }}
                                                            >
                                                                {option}
                                                            </MenuItem>
                                                        )
                                                    )}
                                                </MenuList>
                                            </ClickAwayListener>
                                        </Paper>
                                    </Grow>
                                )}
                            </Popper>
                            
                            {/* Button to select scale */}
                            <Button
                                size="large"
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
                            {/* Button to reset table and data */}
                            <Button
                                variant="contained"
                                size="large"
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
                    </Grid>
                    <Grid item id="ScreenShotsWIP" alignItems="center" xs={12} sm={12} lg={6}
                          marginTop={{xs: '1em', sm: '1em', md: '1em', lg: '0'}}>
                        <CSSTransition
                            in={showOutput}
                            timeout={300}
                            classNames="fade"
                            unmountOnExit
                        >
                            <div id="table-output">
                                {/* Table displaying individual calculated grades after conversion */}
                                <TableGradesOutput data={conversionData}/>
                                {/* Show calculated cumulative GPA */}
                                <h2
                                    style={{
                                        color: "#000000",
                                        textAlign: "center",
                                    }}
                                >
                                    Cumulative GPA:{" "}
                                    {calcGpa(getScale, data)[1]}
                                </h2>
                                <hr/>
                            </div>
                        </CSSTransition>
                        {/* Display relevant scale image based on getScale val */}
                        {showOutput && getScale === "5 Point Scale" && (
                            <img src="./5scale.png" width={"500px"}/>
                        )}
                        {showOutput && getScale === "4 Point Scale" && (
                            <img src="./4scale.png" width={"500px"}/>
                        )}
                        {showOutput && getScale === "Most Common Scale" && (
                            <img src="./mostCommon.png" width={"500px"}/>
                        )}
                        {showOutput && getScale === "Letter Grade Scale" && (
                            <img src="./letterGrade.png" width={"500px"}/>
                        )}
                        {showOutput && getScale === "10 Point Scale" && (
                            <img src="./10scale.png" width={"500px"}/>
                        )}
                        {showOutput && getScale === "Choice Based System" && (
                            <img src="./ChoiceBased.png" width={"500px"}/>
                        )}
                        {showOutput && getScale === "IIT Scale" && (
                            <img src="./IIT.png" width={"500px"}/>
                        )}
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
                <ToastContainer position="bottom-center"/>
            </Grid>
        </div>
    );
};

export default App;
