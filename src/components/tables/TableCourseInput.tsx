import React from 'react';
import {FormControlLabel, TextField} from "@mui/material";
import MUIDataTable from "mui-datatables";
import {deleteRowData} from "../../utils/Utils";

const TableCourseInput = (props: any) => {
    // Update data when cell value changed
    const updateStateFromCell = (value, tableMeta) => {
        const data = props.data;
        data[tableMeta.rowIndex][tableMeta.columnIndex] = value;
    }

    const columns = [
        {
            name: "Course Title",
            options: {
                customBodyRender: (value, tableMeta, updateValue) => (
                    <FormControlLabel
                        sx={{ width: 160 }}
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
            name: "Credits / Hours*",
            options: {
                customBodyRender: (value, tableMeta, updateValue) => (
                    <FormControlLabel
                        sx={{ width: 70 }}
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
            name: "Grade*",
            options: {
                customBodyRender: (value, tableMeta, updateValue) => (
                    <FormControlLabel
                        sx={{ width: 100 }} 
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
        selection: true,
        filter: false,
        onRowsDelete: e => {
            props.setData(deleteRowData(e.data, props.data));
        },
        pagination: false,
    };

    return (
        <MUIDataTable title={"Course List"} data={props.data} columns={columns} options={options} />
    );
};

export default TableCourseInput;
