import React from 'react';
import MUIDataTable from "mui-datatables";
import createCache from "@emotion/cache";
import {CacheProvider} from "@emotion/react";
import {createTheme, ThemeProvider} from "@mui/material";

const TableGradesOutput = (props: any) => {
    const columns = ["Course", "Credits/Hours", "Grade", "US Grade", "Grade Point"];

    const options = {
        selection: false,
        selectableRows: false,
        filter: false,
    };

    const muiCache = createCache({
        "key": "mui",
        "prepend": true,
    });

    // Custom styling for MUI table
    const getMuiTheme = () => createTheme({
        components: {
            MUIDataTableBodyCell: {
                styleOverrides: {
                    root: {
                        textAlign: "center"
                    }
                }
            }
        }
    });

    return (
        <CacheProvider value={muiCache}>
            <ThemeProvider theme={getMuiTheme()}>
                <MUIDataTable title={"Calculated Grades"} data={props.data} columns={columns} options={options} />
            </ThemeProvider>
        </CacheProvider>
    );
};

export default TableGradesOutput;
