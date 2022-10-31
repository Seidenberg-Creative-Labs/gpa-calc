import React, { useState } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { FormControl, InputLabel, MenuItem } from "@mui/material";

let getScale: string;

const GpaDrop = ({ country }: any) => {
    const [scale, setScale] = useState('');

    const handleChange = (e: SelectChangeEvent) => {
        setScale(e.target.value);
        getScale = e.target.value;
    };
    return(
    <FormControl size="small" sx={{ width: 160 }}>
                <InputLabel>Grading Scale</InputLabel>
                <Select
                    defaultValue={''}
                    id="dropdown-selector"
                    value={scale}
                    onChange={handleChange}
                    label={'Grading Scale'}
                >
                    {country === 'China' ? <MenuItem value={"5 Point Scale"}>5 Point Scale</MenuItem> : null}
                    {country === 'China' ? <MenuItem value={"4 Point Scale"}>4 Point Scale</MenuItem> : null}

                    {country === 'India' ? <MenuItem value={"Most Common Scale"}>Most Common Scale</MenuItem> : null}
                    {country === 'India' ? <MenuItem value={"Letter Grade Scale"}>Letter Grade Scale</MenuItem> : null}
                    {country === 'India' ? <MenuItem value={"Choice Based System"}>Choice Based Credit Scale</MenuItem> : null}
                    {country == 'India' ? <MenuItem value={"IIT Scale"}> IIT Scale</MenuItem>: null};
                </Select>
            </FormControl>
    );
};

export {GpaDrop, getScale};
