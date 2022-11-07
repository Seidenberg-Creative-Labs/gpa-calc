import React, { useState } from "react";
import { GpaDrop } from "./GpaDrop";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { FormControl, InputLabel, MenuItem } from "@mui/material";
import InfoTooltip from "./InfoTooltip";
import { CSSTransition } from "react-transition-group";

const Drop = () => {
    //Setting Country
    const [country, setCountry] = useState("");

    const handleChange = (e: SelectChangeEvent) => {
        setCountry(e.target.value);
    };

    return (
        <div id="gpa-dropdown">
            <div className="alignLabel">
                <label htmlFor="dropdown-label">Country :&emsp;</label>
                <FormControl size="small" sx={{ width: 130 }}>
                    <InputLabel id="dropdown-label">Country</InputLabel>
                    <Select
                        id="dropdown-selector"
                        value={country}
                        onChange={handleChange}
                        label={"Country"}
                    >
                        {/* Selections of Countries from Dropdowns */}
                        <MenuItem value={"China"}>China</MenuItem>
                        <MenuItem value={"India"}>India</MenuItem>
                    </Select>
                </FormControl>
            </div>
                <CSSTransition
                    in={country != ""}
                    timeout={300}
                    classNames="fade"
                    unmountOnExit
                >
                    <div className="alignLabel" style={{width: '100vh', display: 'flex', flexDirection: 'row'}}>
                        <label htmlFor="scale-dropdown">Grading Scale :&emsp;</label>
                        <GpaDrop id="scale-dropdown" country={country}/>
                        <InfoTooltip country={country} />
                    </div>
                </CSSTransition>
        </div>
    );
};

export default Drop;
