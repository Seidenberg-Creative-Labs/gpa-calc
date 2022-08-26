import Select, { SelectChangeEvent } from "@mui/material/Select";
import { FormControl, InputLabel, MenuItem } from "@mui/material";
import { useState } from "react";

const GpaDrop = ({ country }: any) => {
    const [scale, setScale] = useState("");

    const handleChange = (e: SelectChangeEvent) => {
        setScale(e.target.value);
    };

    if (country === "China") {
        return (
            <FormControl size="small" sx={{ width: 160 }}>
                <InputLabel>China Scale</InputLabel>
                <Select
                    id="dropdown-selector"
                    value={scale}
                    onChange={handleChange}
                    label={"China Scale"}
                >
                    <MenuItem value={"5 Point Scale"}>5 Point Scale</MenuItem>
                    <MenuItem value={"4 Point Scale"}>4 Point Scale</MenuItem>
                </Select>
            </FormControl>
        );
    } else if (country === "India") {
        return (
            <FormControl size="small" sx={{ width: 160 }}>
                <InputLabel>India Scale</InputLabel>
                <Select
                    id="dropdown-selector"
                    value={scale}
                    onChange={handleChange}
                    label={"India Scale"}
                >
                    <MenuItem value="Most Common Scale">Most Common Scale</MenuItem>
                    <MenuItem value="4 Point Scale">Letter Grade Scale</MenuItem>
                    <MenuItem value="10 Point Scale">10 Point Scale</MenuItem>
                </Select>
            </FormControl>
        );
    } else {
        return (
            <FormControl size="small" sx={{ width: 160 }}>
                <InputLabel>Select a Country</InputLabel>
                <Select id="dropdown-selector"></Select>
            </FormControl>
        );
    }
};

export default GpaDrop;
