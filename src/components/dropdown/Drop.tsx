import React, { useEffect, useRef, useState } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { FormControl, InputLabel, MenuItem } from "@mui/material";
import InfoTooltip from "./InfoTooltip";
import { CSSTransition } from "react-transition-group";

let getScale: string;

const Drop = () => {
    //Setting Country
    const [country, setCountry] = useState("");

    const countryRef = useRef('');

    const handleCountryChange = (e: SelectChangeEvent) => {
        setCountry(e.target.value)
        setScale('')
        countryRef.current = e.target.value
    };

    const [scale, setScale] = useState('');

    // Updating export value
    const handleScaleChange = (e: SelectChangeEvent) => {
        setScale(e.target.value)
        getScale = e.target.value
    }

    //Hides India scale when Country isn't India
    const indiaHidden = () => {
        return country !== 'India'
    }

    //Hides China scale when Country isn't China
    const chinaHidden = () => {
        return country !== 'China'
    }
    
    return (
        <div id="gpa-dropdown">
            <div className="alignLabel">
                <label htmlFor="dropdown-label">Country :&emsp;</label>
                <FormControl size="small" sx={{ width: 'auto', minWidth: 109}}>
                    <InputLabel id="dropdown-label">Country</InputLabel>
                    <Select
                        id="dropdown-selector"
                        value={country}
                        onChange={handleCountryChange}
                        label={"Country"}
                    >
                        {/* Selections of Countries from Dropdowns */}
                        <MenuItem value={"China"}>China</MenuItem>
                        <MenuItem value={"India"}>India</MenuItem>
                    </Select>
                </FormControl>
            </div>
                <CSSTransition
                    in={countryRef.current != ""}
                    timeout={300}
                    classNames="fade"
                    unmountOnExit
                >
                    <div className="alignLabel" style={{width: '100vh', display: 'flex', flexDirection: 'row'}}>
                        <label htmlFor="scale-dropdown">Grading Scale :&emsp;</label>



                        <FormControl size="small" sx={{ width: 'auto', minWidth: 146}}>
                <InputLabel>Grading Scale</InputLabel>
                <Select
                    defaultValue={''}
                    id="dropdown-selector"
                    value={scale}
                    onChange={handleScaleChange}
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

                        <InfoTooltip country={countryRef.current}/>

                    </div>
                </CSSTransition>
        </div>
    );
};

export{Drop, getScale};
