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
                    <MenuItem value="china-5-point">5 Point Scale</MenuItem>
                    <MenuItem value="china-4-point">4 Point Scale</MenuItem>
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
                    <MenuItem value="india-common-scale">Most Common Scale</MenuItem>
                    <MenuItem value="india-4-point">Letter Grade Scale</MenuItem>
                    <MenuItem value="india-10-point">10 Point Scale</MenuItem>
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
