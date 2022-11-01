import React from 'react';
import MUIDataTable from "mui-datatables";
import createCache from "@emotion/cache";
import {CacheProvider} from "@emotion/react";
import {Box, createTheme, ThemeProvider} from "@mui/material";

const TableGradesOutput = (props: any) => {
    const columns = ["Course", "Credits / Hours", "Grade", "US Grade", "Grade Point"];

    const options = {
        selection: false,
        selectableRows: false,
        filter: false,
        responsive: true,
    };

    const muiCache = createCache({
        "key": "mui",
        "prepend": false,
    });

    // Custom styling for MUI table
    const getMuiTheme = () => createTheme({
        components: {
            MUIDataTableBodyCell: {
                styleOverrides: {
                    root: {
                        textAlign:'center',
                    }
                }
            },
        },
    });

    return (
        <CacheProvider value={muiCache}>
            {/* width="500px" */}
            <Box sx={{width:"600px"}}>
                <ThemeProvider theme={getMuiTheme()}>
                    <MUIDataTable title="Calculated Grades" data={props.data} columns={columns} options={options} />
                </ThemeProvider>
            </Box>
        </CacheProvider>
    );
};

export default TableGradesOutput;
