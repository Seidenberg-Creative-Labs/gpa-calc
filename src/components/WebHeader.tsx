import React from "react";
import {Grid} from "@mui/material";

const WebHeader = () => {
    return (
        <Grid container alignItems='center' width='100vw' justifyContent='space-between'>
            <Grid item xs="auto">
                <img className="img-responsive" src="./Pace_SEIDENBERG.png" alt="Pace University Logo"></img>
            </Grid>
            <Grid item xs="auto" maxHeight='20%'>
                <h1 id="gpaHeader">GPA CALCULATOR</h1>
            </Grid>
            <Grid item xs="auto" maxHeight={{lg: '10%'}}>
                <img className="img-responsive" src="./Pace-OfficeofAdmission.png" alt="Pace Univeristy Pace_University_Mascot"></img>
            </Grid>
        </Grid>
    );
}

export default WebHeader;
