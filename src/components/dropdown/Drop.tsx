import { useState } from "react";
import GpaDrop from "./GpaDrop";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Box, FormControl, InputLabel, MenuItem } from "@mui/material";

const Drop = () => {
    const [country, setCountry] = useState("");

    const handleChange = (e: SelectChangeEvent) => {
        setCountry(e.target.value);
    };

    return (
            <Box id="gpa-dropdown">
                <FormControl size="small" sx={{ width: 130 }}>
                    <InputLabel id="dropdown-label">Country</InputLabel>
                    <Select
                        id="dropdown-selector"
                        value={country}
                        onChange={handleChange}
                        label={"Country"}
                    >
                        <MenuItem value={"China"}>China</MenuItem>
                        <MenuItem value={"India"}>India</MenuItem>
                    </Select>
                </FormControl>
            <GpaDrop country={country}/>
            </Box>
    );
};

export default Drop;
