import React from 'react';
import {FormControlLabel, TextField} from "@mui/material";
import MUIDataTable from "mui-datatables";

const TableCourseInput = props => {
    const updateStateFromCell = (value, tableMeta) => {
        const data = props.data;
        data[tableMeta.rowIndex][tableMeta.columnIndex] = value;
    }

    const columns = [
        {
            name: "Course Title",
            options: {
                filter: false,
                customBodyRender: (value, tableMeta, updateValue) => (
                    <FormControlLabel
                        control={<TextField value={value} />}
                        label=""
                        value={value}
                        onChange={event => {
                            updateValue(event.target.value);
                            updateStateFromCell(event.target.value, tableMeta);
                        }}
                    />
                )
            }
        },
        {
            name: "Credits/Hours *",
            options: {
                filter: false,
                customBodyRender: (value, tableMeta, updateValue) => (
                    <FormControlLabel
                        control={<TextField value={value || ''} type='number' />}
                        label=""
                        onChange={event => {
                            if (event.target.value > 0) {
                                updateValue(event.target.value)
                                updateStateFromCell(event.target.value, tableMeta);
                            }
                        }}
                    />
                )
            }
        },
        {
            name: "Grade *",
            options: {
                filter: false,
                customBodyRender: (value, tableMeta, updateValue) => (
                    <FormControlLabel
                        control={<TextField value={value || ''} type='number' />}
                        label=""
                        onChange={event => {
                            if (event.target.value >= 0 && event.target.value <= 100) {
                                updateValue(event.target.value);
                                updateStateFromCell(event.target.value, tableMeta);
                            }
                        }}
                    />
                )
            }
        },
    ];

    const options = {
        filterType: 'checkbox',
    };

    return (
        <MUIDataTable title={"Course List"} data={props.data} columns={columns} />
    );
};

export default TableCourseInput;
