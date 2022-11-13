import React, { useEffect, useRef, useState } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { FormControl, InputLabel, MenuItem } from "@mui/material";

let getScale: string;
// Country Drop Down
const GpaDrop = (props: any) => {
    // Setting the Scale
    const [scale, setScale] = useState('');

    // Updating export value
    const handleChange = (e: SelectChangeEvent) => {
        setScale(e.target.value)
        getScale = e.target.value
    }

    //Hides India scale when Country isn't India
    const indiaHidden = () => {
        if(props.country === 'China')
            return true
        return false
    }

    //Hides China scale when Country isn't China
    const chinaHidden = () => {
        if(props.country === 'India')
            return true
        return false
    }
    
    
    return(
    <FormControl size="small" sx={{ width: 'auto', minWidth: 146}}>
                <InputLabel>Grading Scale</InputLabel>
                <Select
                    defaultValue={''}
                    id="dropdown-selector"
                    value={scale}
                    onChange={handleChange}
                    label={'Grading Scale'}
                    autoWidth={true}
                >
                    {/* India Scales */}
                    <MenuItem hidden={indiaHidden()} value={"Most Common Scale"}>Most Common Scale</MenuItem>  
                    <MenuItem hidden={indiaHidden()} value={"Letter Grade Scale"}>Letter Grade Scale</MenuItem>  
                    <MenuItem hidden={indiaHidden()} value={"Choice Based System"}>Choice Based Credit Scale</MenuItem>  
                    <MenuItem hidden={indiaHidden()} value={"IIT Scale"}> IIT Scale</MenuItem> 
                    {/* China Scales */}
                    <MenuItem hidden={chinaHidden()} value={"5 Point Scale"}>5 Point Scale</MenuItem>  
                    <MenuItem hidden={chinaHidden()} value={"4 Point Scale"}>4 Point Scale</MenuItem>  

                </Select>
            </FormControl>
    );
};

export {GpaDrop, getScale};
